import { useState } from "react";
import api from "../services/api";

import { compressVideo } from "../utils/videoCompressor";

export default function Admin() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const [mediaForm, setMediaForm] = useState({
    timelineId: "",
    type: "image",
  });

  const [loading, setLoading] = useState(false);
    const [timelineForm, setTimelineForm] = useState({
    title: "",
    description: "",
    month: "",
    year: "",
  });

  const handleTimelineChange = (e) => {
  setTimelineForm({
    ...timelineForm,
    [e.target.name]: e.target.value,
  });
};


const handleMediaSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append(
      "TimelineId",
      mediaForm.timelineId
    );

    formData.append(
      "Type",
      mediaForm.type
    );

    let uploadFile = selectedFile;


      if(
          mediaForm.type === "video" &&
          selectedFile.size > 50 * 1024 * 1024
      ){

          uploadFile = await compressVideo(selectedFile);

          console.log(
              "Before:",
              selectedFile.size / 1024 / 1024,
              "MB"
          );

          console.log(
              "After:",
              uploadFile.size / 1024 / 1024,
              "MB"
          );
      }


      formData.append(
      "File",
      uploadFile
      );

    await api.post(
      "/api/TimelineMedia/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Upload สำเร็จ");

    setSelectedFile(null);

    setMediaForm({
      timelineId: "",
      type: "image",
    });

  } catch (err) {
    console.error(err);
    alert("Upload ไม่สำเร็จ");
  }
};

const handleMediaChange = (e) => {
  setMediaForm({
    ...mediaForm,
    [e.target.name]: e.target.value,
  });
};


const handleTimelineSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/api/Timeline", {
      Title: timelineForm.title,
      Description: timelineForm.description,
      Month: Number(timelineForm.month),
      Year: Number(timelineForm.year),
    });

    alert("สร้าง Timeline สำเร็จ");

    setTimelineForm({
      title: "",
      description: "",
      month: "",
      year: "",
    });

  } catch (err) {
    console.error(err);
    alert("สร้าง Timeline ไม่สำเร็จ");
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await api.post("/api/letters", {
            Title: form.title,
            Content: form.content,
            Category: form.category
      });

      alert("บันทึกสำเร็จ");

      setForm({
        title: "",
        content: "",
        category: "",
      });

    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>

    <h2>Admin - Create Timeline</h2>

    <form
        onSubmit={handleTimelineSubmit}
        style={{
          display:"flex",
          flexDirection:"column",
          gap:10,
          maxWidth:500
        }}
      >

      <input
        name="title"
        placeholder="Timeline Title"
        value={timelineForm.title}
        onChange={handleTimelineChange}
      />


      <textarea
        name="description"
        placeholder="Description"
        value={timelineForm.description}
        onChange={handleTimelineChange}
        rows={5}
      />


      <input
        name="month"
        type="number"
        placeholder="Month"
        value={timelineForm.month}
        onChange={handleTimelineChange}
      />


      <input
        name="year"
        type="number"
        placeholder="Year"
        value={timelineForm.year}
        onChange={handleTimelineChange}
      />


      <button type="submit">
        Create Timeline
      </button>

    </form>

    <hr />

    <h2>Timeline Media</h2>

    <form
      onSubmit={handleMediaSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 500,
      }}
    >

      <input
        name="timelineId"
        placeholder="Timeline Id"
        value={mediaForm.timelineId}
        onChange={handleMediaChange}
      />

      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
    />


      <select
        name="type"
        value={mediaForm.type}
        onChange={handleMediaChange}
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <button>Save Media</button>

    </form>

    <hr />

      <h2>Admin - Create Letter</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 500 }}
      >

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{ padding: 10 }}
        />

        {/* Category */}
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          style={{ padding: 10 }}
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Content (กด Enter ได้)"
          value={form.content}
          onChange={handleChange}
          rows={10}
          style={{
            padding: 10,
            whiteSpace: "pre-wrap",
          }}
        />

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "กำลังบันทึก..." : "Save"}
        </button>
      </form>
    </div>
  );
}