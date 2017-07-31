import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import reduxThunk from 'redux-thunk';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

//Local Files
import App from './components/App';
import Landing from './components/landing';
import './styles/index.css';
import rootReducer from './reducers/index';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Home from './components/home';
import AddPost from './components/addPost';
import RequireAuth from './components/requireAuth';
import PostDetail from './components/postDetail';

//ApolloClient setup
const networkInterface = createNetworkInterface({
	uri: 'https://caveman-coder.herokuapp.com/graphql' //tell GraphQL the endpoint of our GQL API
});

//Tell GQL to attach the user's JWT in the header of any query for authorization and to get current user
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // get the authentication token from local storage if it exists, and send that sucka along with all GQL queries
    const token = localStorage.getItem('token');
    req.options.headers.authorization = token ? token : null;
    next();
  }
}]);

const client = new ApolloClient({
	networkInterface
});

//Redux and Apollo Store setup
const apollClientReducer = {apollo: client.reducer()}
const reducers = Object.assign(rootReducer, apollClientReducer);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //for setting up redux dev tools

const store = createStoreWithMiddleware(
	combineReducers(reducers),
    composeEnhancers(
        applyMiddleware(client.middleware())
  )
);

//if token exists, consider user to be signed in. Using AuthToken since we use token below with Apollo
const AuthToken = localStorage.getItem('token');
const currentUserFirstName = localStorage.getItem('currentUserFirstName');
const currentUserLastName = localStorage.getItem('currentUserLastName');
const currentUserID = localStorage.getItem('currentUserID');
const currentUserRole = localStorage.getItem('currentUserRole');

if(AuthToken && currentUserFirstName && currentUserLastName){
  //create an instance of the redux store where the user is authenticated and the currentUserName is set to the authed user's name
  store.dispatch({type: 'AUTH_USER'});
	store.dispatch({
		type: 'SET_CURRENT_USER_FIRSTNAME',
		payload: currentUserFirstName
	});
	store.dispatch({
		type: 'SET_CURRENT_USER_LASTNAME',
		payload: currentUserLastName
	});
	store.dispatch({
		type: 'SET_CURRENT_USER_ID',
		payload: currentUserID
	});

	if(currentUserRole === 'admin'){
		store.dispatch({
			type: 'SET_CURRENT_USER_ROLE',
			payload: currentUserRole
		});
	}
}

ReactDOM.render(
	<ApolloProvider store={store} client={client}>
    <Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Landing} />
				<Route path='/home' component={Home} />
				<Route path='/addPost' component={RequireAuth(AddPost)} />
				<Route path='/posts/:id' component={PostDetail} />
				<Route path='/signin' component={Signin} />
				<Route path='/signup' component={Signup} />
				<Route path='/signout' component={Signout} />
			</Route>
		</Router>
	</ApolloProvider>,
  document.getElementById('root')
);
