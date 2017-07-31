import Post from '../models/post';
import User from '../models/user';

export default {
  RootQuery: {
    findUser(root, {id}) {
      return User.findById(id);
    },
    findAllUsers(root, args) {
      return User.find({});
    },
		findPost(root, {id}){
			return Post.findById(id).populate('comments');
		},
		findAllPosts(root, args) {
			return Post.find({}).sort({date: -1});
		},
		findPostsByCategory(root, {category}) {
			console.log(category);
			return Post.find({category});
		}
  },
  Mutation: {
      addPost(root, {title, body, createdAt, imageURL, category}, context){
        return User.addPost(context.user, title, body, createdAt, imageURL, category);
      },
			addComment(root, {body, createdAt, postId}, context){
				return User.addComment(context.user, body, createdAt, postId);
			}
  }
};
