export default `
#The user type
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  posts: [Post]
  imageURL: String
}

#The Post includes an array of comments and meta data on the Post itself
type Post {
  id: ID!
  author: User!
  title: String!
  body: String!
  imageURL: String!
  #createdAt will be a string date formed by Momentjs which takes Strings
  createdAt: String!
	category: String!
	comments: [Comment]
}

#Comment type
type Comment {
	id: ID!
	author: User!
	body: String!
	postId: ID!
	createdAt: String!
}

#Entry point for all queries
type RootQuery {
  findUser(id: ID!): User
  findAllUsers: [User]
	findPost(id: ID!): Post
  findAllPosts: [Post]
	findPostsByCategory(category: String!): [Post]
}

type Mutation {
  addPost(title: String!, body: String!, createdAt: String!, imageURL: String!, category: String!): Post
	addComment(body: String!, createdAt: String!, postId: ID!): Comment
}

schema {
  query: RootQuery
  mutation: Mutation
}
`;
