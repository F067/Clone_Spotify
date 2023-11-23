import mongoose from "mongoose";

const likedSchema = mongoose.Schema({
    likedId: Array,
})

const likedModel = mongoose.model('LikedSong', likedSchema)

export default likedModel