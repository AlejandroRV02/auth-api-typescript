import {Request, Response} from 'express'
import User, {IUser} from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config/config'

function createToken(user: IUser){
    return jwt.sign({
        id:user.id,
        email: user.email
    }, config.SECRET)
}

export const signUp = async (req:Request, res:Response) => {
    if (!req.body.email || !req.body.password){
         return res.status(400).json({
            msg: 'Email and password required'
        })
    }
    
    const isUser = await User.findOne({email: req.body.email})
    if (isUser){
        return res.status(400).json({
            msg: 'Email already used'
        })
    }

    try {
        const newUser = new User(req.body)
        await newUser.save();
        return res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }

}


export const signIn = async (req:Request, res:Response) => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json({
           msg: 'Email and password required'
       })
   }

   const isUser = await User.findOne({email: req.body.email})
    if(!isUser){
        return res.status(400).json({
            msg: 'User not found'
        })
    }

    const isMatched = await isUser.comparePassword(req.body.password);
    if (isMatched){
       return res.status(200).json({
        token: createToken(isUser)
       })
    }
    
    return res.status(400).json({
        msg: 'Email or password incorrect'
    })
}

