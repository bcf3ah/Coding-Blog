import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

//Local Files
import Post from './post';
import Comment from './comment';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    firstName: String,
    lastName: String,
    password: String,
    imageURL: String,
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    }],
		comments: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}]
});

//Associate posts with user
userSchema.statics.addPost = function(user, title, body, createdAt, imageURL, category) {
    const that = this;
    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
		let date = new Date();
    return Post.create({title, body, createdAt, imageURL, category, date}, function(err, post){
      if(err){
        throw new Error('Post could not be created');
      } else {
        //Push it into the author's post array
        that.findById(user.id, function(err, user){
            if(err){
                throw new Error('Post could not be saved to user');
            } else {
                user.posts.push(post);
                user.save();
            }
        });

        return post.save();
      }
    });
}

//Associate comments to user
userSchema.statics.addComment = function(user, body, createdAt, postId){
	const that = this;
	const id = user.id;
	const firstName = user.firstName;
	const lastName = user.lastName;
	let date = new Date();
	return Comment.create({body, createdAt, postId, date}, function(err, comment){
		if(err){
			throw new Error('Comment could not be created', err);
		} else {
			comment.author.id = id;
			comment.author.firstName = firstName;
			comment.author.lastName = lastName;

			//push into parent Post's comments array
			Post.findById(postId, function(err, post){
				if(err){
					throw new Error('Comment could not be added to post', err);
				} else {
					post.comments.push(comment);
					post.save();
				}
			})

			//Push into author's comments array
			that.findById(id, function(err, user){
					if(err){
							throw new Error('Comment could not be saved to user');
					} else {
							user.comments.push(comment);
							user.save();
					}
			});

			return comment.save();
		}
	});
}

//Plugin for passport-local-mongoose to handle authentication
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

export default mongoose.model("User", userSchema);
