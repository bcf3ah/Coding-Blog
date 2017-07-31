import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import passport from 'passport';
import User from '../models/user';

//setup options for passport's JWT Strategy. Need to tell our strategy where to look on the request for the token payload
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),//saying whenever a request comes in and we want passport to handle it, it needs to look at the header of the request, specifically the part called authorization
  secretOrKey: process.env.SECRET //the token is encrypted remember! So we need the secret key we made to decrypt it :)

};


//create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){ //payload is the decoded JWT token! It's the {sub: userId, iat:timestamp} thing from authentication controller!! 'done' is a callback function we need to call depending on whether we can authenticate the user or not

//The done callback is supplied by Passport. When we return a done(user), Passport assigns the user model to req.user

    //see if the user.id in the payload exists in our db. If yes, call 'done' with that user. If not, call 'done' WITHOUT the user object
    User.findById(payload.sub, function(err, user){
      if(err){return done(err, false);} //no user, so second argument is false, meaning nope, we did not find a user

      if(user){
        done(null, user) //if we found the user, call done WITHOUT an error object (hence the null), plus that user
      } else {
        done(null, false)//if we did not find a user, call done without an error (everything was fine, just no user) and false (because, again, no user)
      }
    })
});

//Tell Passport to use this JWT Strategy that we so kindly made for it for accessing protected routes
passport.use(jwtLogin);

//Local Strategy from passport-local-mongoose for signing up and in
passport.use(User.createStrategy());
