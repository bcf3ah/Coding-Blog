export default (state=[], action) => {
	switch(action.type){
		case 'GET_POSTS':
			return action.payload;
		case 'FILTER_POSTS':
			let data = state.filter(post => {
				return post.category === action.payload;
			})

			return data;
		default:
			return state;
	}
}
