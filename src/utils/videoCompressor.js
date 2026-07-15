import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();
ffmpeg.on("log", ({ message }) => {
    console.log(message);
});

export async function compressVideo(file) {

    console.log("1. start compress");


    if (!ffmpeg.loaded) {

        console.log("2. loading ffmpeg");


        await ffmpeg.load({
            coreURL:
                "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js",

            wasmURL:
                "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.wasm",
        });


        console.log("3. ffmpeg loaded");
    }


    const inputName = "input.mov";
    const outputName = "output.mp4";


    console.log("4. writing file");


    await ffmpeg.writeFile(
        inputName,
        await fetchFile(file)
    );


    console.log("5. start ffmpeg");


    await ffmpeg.exec([
        "-i",
        inputName,

        "-vcodec",
        "libx264",

        "-crf",
        "28",

        "-preset",
        "ultrafast",

        "-acodec",
        "aac",

        outputName
    ]);


    console.log("6. ffmpeg finished");


    const data = await ffmpeg.readFile(outputName);


    console.log("7. create file");


    return new File(
        [data.buffer],
        "compressed.mp4",
        {
            type: "video/mp4"
        }
    );
}