export default (state='', action) => {
	switch(action.type){
		case 'SELECT_CATEGORY':
			return action.payload;
		default:
			return state;
	}
}
