import mongoose, { model, Schema, Types } from "mongoose";

const cardSchema = new Schema({
    title: String,
    subtitle: String,
    description: String,

    phone: String,
    email: String,
    web: String,

    image: {
        url: String,
        alt: String,
    },

    address: {
        state: String,
        country: String,
        city: String,
        street: String,
        houseNumber: Number,
        zip: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

export const Card = mongoose.model('cards', cardSchema);
