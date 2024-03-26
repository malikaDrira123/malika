import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema(
    {
        lastName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        company: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        message: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 255,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true
        },
        subject:{
          type: String,
          required: true,
          minLength: 10,
          maxLength: 255,
          trim: true
      }


    },
    {
        timestamps: true
    }
);


const Contact = mongoose.model('Contact', userSchema);

export default Contact;
