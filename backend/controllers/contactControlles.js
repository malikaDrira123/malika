import mongoose from "mongoose";

import Contact from "../models/contact";


export const contact = async (req, res) => {
    try {

        const { lastName, firstName, company, email, subject, message } = req.body;
        if (!lastName || !firstName || !company || !email || !subject || !message) {

            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const existingContact = await Users.findOne({ email });
        if (existingContact) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        const newContact = new Contact({
            lastName,
            firstName,
            company,
            email,
            subject,
            message
        });

        await newContact.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error during registration" });
    }
};

