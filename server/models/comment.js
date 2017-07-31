import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        firstName: String,
        lastName: String
    },
    body: String,
    postId: String,
    createdAt: String,
		date: Date
});

export default mongoose.model('Comment', commentSchema);
