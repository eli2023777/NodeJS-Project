import mongoose, { model, Schema } from "mongoose";


// סכמת Address
const addressSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Auto generate ObjectId
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: String,
    zip: String
});

// סכמת Image
const imageSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Auto generate ObjectId
    url: String,
    alt: String
});

const nameSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Auto generate ObjectId
    first: String,
    middle: String,
    last: String
});

// סכמת User
const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Auto generate ObjectId
    name: nameSchema,
    isBusiness: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: String,
    email: String,
    password: String,
    address: addressSchema,
    image: imageSchema
});

export const User = mongoose.model('User', userSchema);


