import mongoose from 'mongoose'

const blogsSchema = mongoose.Schema({
    _id : String,
    title: String,
    body: String,
    author: String
})

export default mongoose.model('blogs', blogsSchema);