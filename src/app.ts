import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import passport, { Passport } from 'passport'
import passportMiddleware from './middlewares/passport'

//import routes
import authRoutes from './routes/auth.routes' 
import specialRoutes from './routes/special.routes' 
import { config } from 'dotenv';

//Initalizations
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);



//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
passport.use(passportMiddleware)


//Routes

app.use(authRoutes)
app.use(specialRoutes);

export default app;