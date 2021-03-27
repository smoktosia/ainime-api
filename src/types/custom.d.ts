import { Request, Response, NextFunction } from 'express'
import { mongooseTypes } from 'mongoose'

declare namespace Express {
    interface Request {
        user?: any;
    }
}

declare interface Middleware {
    (req: Request, res: Response, next?: NextFunction): void
}

declare interface TUser extends mongooseTypes.Document {
    // _id: mongooseTypes.ObjectId
    username: string
    avatar?: { url: string, date: Date }
    email: string
    email_ver?: boolean
    role?: number
    last_date?: Date
}

// declare namespace PassportJWT {
//     interface VerifiedCallback {
//         (error: any, user?: any, info? any): void;
//     }
// }