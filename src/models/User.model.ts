import mongoose, { Schema, Document } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import { PassportLocalSchema } from 'mongoose';

export interface IUser extends Document {
    username: string
    avatar?: {url: string, date: Date}
    email: string
    email_ver?: boolean
    role?: number
    last_date?: Date
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    avatar: {
        url: String,
        date: Date
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email_ver: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    last_date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true, collection: 'usersNew' })

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
    usernameLowerCase: true
})

export default mongoose.model('User', UserSchema as PassportLocalSchema)