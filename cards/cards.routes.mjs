import jwt from "jsonwebtoken";
import { Router } from 'express';
import { guard, isBusinessUser } from "../guard.mjs";
import { Card } from "./cards.model.mjs";

export const router = Router();

// Get all
router.get('/', async (req, res) => {
    res.send(await Card.find());
});


// My cards (get cards by user, only for authenticated users)
router.get('/my-cards', guard, async (req, res) => {
    const user = jwt.decode(req.headers.authorization);

    const cards = await Card.find({ user_id: user._id });

    res.send(cards);
});


// Get one
router.get('/:id', async (req, res) => {
    const card = await Card.findById(req.params.id);

    if (!card)
        return res.status(404).send('Card not found');

    res.send(card);
});


// Add new card (only for business users)
router.post('/', guard, isBusinessUser, async (req, res) => {
    const { title, subtitle, description, phone, email, web, url, alt,
        state, country, city, street, houseNumber, zip } = req.body;

    const user = jwt.decode(req.headers.authorization);

    const card = new Card({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,

        phone: req.body.phone,
        email: req.body.email,
        web: req.body.web,

        image: {
            url: req.body.url,
            alt: req.body.alt
        },

        address: {
            state: req.body.state,
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            zip: req.body.zip,
        },
        user_id: user._id
    });

    const newCard = await card.save();

    res.send(newCard);
});


// Edit card
router.put('/:id', guard, async (req, res) => {
    const user = jwt.decode(req.headers.authorization);

    const { title, subtitle, description, phone, email, web, url, alt,
        state, country, city, street, houseNumber, zip } = req.body;

    const card = await Card.findById(req.params.id);

    // Check if the card is exist 
    if (!card)
        return res.status(404).send('Card not found');

    // Check if the card update by the user who create the card
    if (card.user_id.toString() !== user._id.toString()) {
        return res.status(403).send('Access denied');
    }

    card.title = title || card.title;
    card.subtitle = subtitle || card.subtitle;
    card.description = description || card.description;

    card.phone = phone || card.phone;
    card.email = email || card.email;
    card.web = web || card.web;

    card.url = url || card.url;
    card.alt = alt || card.alt;

    card.state = state || card.state;
    card.country = country || card.country;
    card.city = city || card.city;
    card.street = street || card.street;
    card.houseNumber = houseNumber || card.houseNumber;
    card.zip = zip || card.zip;

    await card.save();

    res.send(card);
});


// Patch card (Like/Unlike)
router.patch('/:id', guard, async (req, res) => {

    const user = jwt.decode(req.headers.authorization);
    const card = await Card.findById(req.params.id);

    if (!card)
        return res.status(404).send('Card not found');

    // Check if user did like the card before, (if so - unlike the card).
    if (card.likes.includes(user._id)) {
        card.likes = card.likes.filter(like => like.toString() !== user._id.toString()); // Unlike

    } else {
        card.likes.push(user._id); // Like
    }

    await card.save();
    res.send(card);
});


// Delete card
router.delete('/:id', guard, async (req, res) => {

    const user = jwt.decode(req.headers.authorization);
    const card = await Card.findById(req.params.id);

    if (!card)
        return res.status(404).send('Card not found');

    if (!user.isAdmin) {
        if (card.user_id.toString() !== user._id.toString()) {
            return res.status(403).send('Access denied');
        }
    }
    await Card.findByIdAndDelete(req.params.id);
    res.send(card);
});

export default router;

