import {Strategy, StrategyOptions, ExtractJwt} from 'passport-jwt'

import config from '../config/config'

import User from '../models/User'

const opts:StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const isUser = await User.findById(payload.id)
        if(isUser){
            return done(null, isUser);
        }

        return done(null, false);
    } catch (error) {
        console.log(error); 
    }
})