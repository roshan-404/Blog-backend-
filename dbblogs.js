import mongoose from 'mongoose'

const blogsSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String
})

export default mongoose.model('blogs', blogsSchema);