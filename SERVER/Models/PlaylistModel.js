import mongoose from 'mongoose';

const playlistSchema = mongoose.Schema({
  title: String,
  numberOfSongs: Number,
  description: String,
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;
