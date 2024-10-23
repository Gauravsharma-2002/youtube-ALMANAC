import path from "path";
import transcodeVideo from "./../util/youtube/util.transcoding.js";

// Transcode video to MP4 (H.264)

// Controller for handling video upload and transcoding
const transcodeAndReturn = async (req, res) => {
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).send("No video file uploaded");
  }

  try {
    const outputFilePath = path.join(
      __dirname,
      `../../uploads/${Date.now()}.mp4`
    );

    // Transcode the uploaded video
    await transcodeVideo(videoFile.path, outputFilePath);

    res.status(200).send(`Video transcoded successfully: ${outputFilePath}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during transcoding");
  }
};





export  { transcodeAndReturn };
