import auth from './authReducers';
import {currentUserFirstName, currentUserLastName, currentUserID, currentUserRole} from './currentUser';
import category from './categoryReducer';
import posts from './postsReducer';

const rootReducer = {
  auth,
  currentUserFirstName,
  currentUserLastName,
  currentUserID,
	currentUserRole,
	category,
	posts
};

export default rootReducer;
