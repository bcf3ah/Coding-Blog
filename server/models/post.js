import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const postSchema = new mongoose.Schema({
		title: String,
		body: String,
		createdAt: String,
		imageURL: String,
		category: String,
		date: Date,
		comments: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}]
});

export default mongoose.model("Post", postSchema);
