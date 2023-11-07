import mongoose from 'mongoose';

const trackSchema = mongoose.Schema({
  name: String,
  duration: Number,
  artist: String,
  album: String
});

const Track = mongoose.model('Track', trackSchema);

export default Track;
