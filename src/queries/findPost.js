import {gql} from 'react-apollo';

export default gql`
query FindPost($id:ID!){
  findPost(id: $id){
    id
    title
    body
    createdAt
    imageURL
		category
		comments {
			id
			body
			createdAt
			author{
				firstName
				lastName
			}
		}
  }
}
`;
