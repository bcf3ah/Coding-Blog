import {gql} from 'react-apollo';

export default gql`
	mutation AddComment($body: String!, $createdAt: String!, $postId: ID!){
	  addComment(body:$body, createdAt: $createdAt, postId:$postId){
	    id
	  }
	}
`;
