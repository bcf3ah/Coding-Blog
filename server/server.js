import express from 'express';
import graphql from 'graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import passport from 'passport';
import jwt from 'jwt-simple';
import path from 'path';

//Local files
import schema from './schema/schema';
import router from './router';
import User from './models/user';

//===========================
//Express App setup
//===========================
const app = express();
app.use(cors()); //allow for cross-origin requests
app.use (bodyParser.json()); //let me use response data as json



//==============================
//MongoDB and MongoLab setup
//==============================

//Connect to MongoLab
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connection
    .once('open', () => console.log('MongoLab is connected Lord Commander.')) //Jon Snow FTW
    .on('error', error => console.log('Error connecting to MongoLab:', error));

//==================================
//GraphQL setup
//==================================
require('./auth/passport.services'); //importing it just so the code is actually executed. With Node, need to import a file somewhere for it to be executed, and we want it to execute because it sets up our passport strategies!! Don't need to actually assign it to a variable

const setReqUser = function(req, res, next){
  if(req.headers.authorization !== 'null'){
    const token = jwt.decode(req.headers.authorization, process.env.SECRET);
    User.findById(token.sub).then(user => {
      req.user = user
      next();
    });
  } else {
		next();
	}
}

//Set up graphql endpoint. Later, set up context options via http://dev.apollodata.com/tools/graphql-server/setup.html
app.use('/graphql', setReqUser, graphqlExpress(request => ({
  schema,
  context: {user: request.user}
})));


//Set up GraphiQL UI
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql', //graphql because this specifies where GraphiQL sends its requests to. AKA our GraphQL endpoint.
}));

// Serve static assets and routes
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
router(app);//set up routes for authentication

//===============================
//Set up Express listening port
//===============================
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
	console.log('Blog is running on port '+PORT+' Lord Commander.');
})
