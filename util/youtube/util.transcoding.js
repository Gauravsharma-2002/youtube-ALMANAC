import ffmpeg from "fluent-ffmpeg";

// Transcode video to MP4 (H.264)
const transcodeVideo = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .format("mp4")
      .on("end", () => {
        console.log("Transcoding finished");
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error("Error during transcoding:", err);
        reject(err);
      })
      .save(outputPath);
  });
};

export default transcodeVideo;
