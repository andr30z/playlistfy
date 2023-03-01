const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema(
  {
    spotifyUserId: {
      type: String,
      required: "Name is Required!",
    },
    playlistUrl: {
      type: String,
      required: "playlist is Required!",
    },
    baseArtistOrSong: {
      type: String,
      required: "baseArtistOrSong is Required!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audit", AuditSchema);
