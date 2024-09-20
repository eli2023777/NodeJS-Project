import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './users/users.model.mjs';
import userRoutes from './users/users.routes.mjs';
import cardRoutes from './cards/cards.routes.mjs';
import loginRoutes from './users/login.routes.mjs';
import { Card } from './cards/cards.model.mjs';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

// Create initial users
const createInitialUsers = async () => {
    const adminEmail = 'admin@10.com';
    const businessEmail = 'business@10.com';
    const regularEmail = 'regular@10.com';

    const existingAdmin = await User.findOne({ email: adminEmail });
    const existingBusiness = await User.findOne({ email: businessEmail });
    const existingRegular = await User.findOne({ email: regularEmail });

    if (!existingAdmin) {
        const admin = new User({
            name: { first: 'Admin', middle: '', last: 'User' },
            isAdmin: true,
            isBusiness: false,
            phone: '1234567890',
            email: adminEmail,
            password: await bcrypt.hash('Admin123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '1'
            },
            image: { url: '', alt: '' }
        });
        await admin.save();
        console.log(chalk.green('Admin user created successfully.'));
    }

    if (!existingBusiness) {
        const business = new User({
            name: { first: 'Business', middle: '', last: 'User' },
            isAdmin: false,
            isBusiness: true,
            phone: '1234567890',
            email: businessEmail,
            password: await bcrypt.hash('Business123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '2'
            },
            image: { url: '', alt: '' }
        });
        await business.save();
        console.log(chalk.green('Business user created successfully.'));
    }

    if (!existingRegular) {
        const regular = new User({
            name: { first: 'Regular', middle: '', last: 'User' },
            isAdmin: false,
            isBusiness: false,
            phone: '1234567890',
            email: regularEmail,
            password: await bcrypt.hash('Regular123!', 10),
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '3'
            },
            image: {
                url: '',
                alt: ''
            }
        });
        await regular.save();
        console.log(chalk.green('Regular user created successfully.'));
    }
};

// Create initial cards
const createInitialCards = async () => {
    const businessUser = await User.findOne({ email: 'business@10.com' });
    if (businessUser) {
        const card1 = new Card({
            title: 'Business Card 1',
            subtitle: 'First Card',
            description: 'This is the first business card',
            phone: businessUser.phone,
            email: businessUser.email,
            web: '',
            image: { url: '', alt: '' },
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '1',
                zip: '12345'
            },
            user_id: businessUser._id
        });
        await card1.save();

        const card2 = new Card({
            title: 'Business Card 2',
            subtitle: 'Second Card',
            description: 'This is the second business card',
            phone: businessUser.phone,
            email: businessUser.email,
            web: '',
            image: { url: '', alt: '' },
            address: { state: 'State', country: 'Country', city: 'City', street: 'Street', houseNumber: '2', zip: '67890' },
            user_id: businessUser._id
        });
        await card2.save();

        const card3 = new Card({
            title: 'Business Card 2',
            subtitle: 'Second Card',
            description: 'This is the second business card',
            phone: businessUser.phone,
            email: businessUser.email,
            web: '',
            image: { url: '', alt: '' },
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '2',
                zip: '67890'
            },
            user_id: businessUser._id
        });
        await card3.save();

        console.log('Business cards created successfully.');
    }
};


// Main function to connect to MongoDB and create the admin user if necessary
const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/fullStackProject')
            .then(() => console.log(chalk.blue(`Connected to MongoDB`)))
            .catch(err => console.error('Error connecting to MongoDB', err));

        await createInitialUsers();
        await createInitialCards();


    } catch (error) {
        console.error(chalk.red('Error connecting to MongoDB or creating initial data:', error));
    }
};

main().catch(console.error);

export const app = express();

app.use(morgan(':method :url :status :response-time ms - :date[iso]'));

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));


app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to MongoDB!',
    });
});


// Define __dirname using __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('/users/login', loginRoutes);

app.use((req, res) => {
    const filePath = path.join(__dirname, 'public', req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('The requested resource was not found on the server');
        }
    });
});

app.listen(7878, () => {
    console.log('listening on port 7878');
});
