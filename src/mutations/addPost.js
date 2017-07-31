import {gql} from 'react-apollo';

export default gql`
	mutation AddPost($title: String!, $body:String!, $createdAt:String!, $imageURL: String!, $category: String!){
		addPost(title: $title, body: $body, createdAt:$createdAt, imageURL: $imageURL, category: $category){
			id
		}
	}
`;
