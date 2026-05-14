import { useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

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
        await api.post("/letters", {
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