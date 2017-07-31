import {gql} from 'react-apollo';

export default gql`
{
	findAllPosts {
		id
		title
		createdAt
		imageURL
		category
	}
}
`;
