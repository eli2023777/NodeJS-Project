import mongoose, { connect, disconnect } from 'mongoose';
import { User } from './users.model.mjs';
import bcrypt, { hash } from 'bcrypt';
import { alt } from 'joi';
import { isAdmin } from '../guard.mjs';
const createAdmin = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/your-db-name')

        const adminEmail = 'admin@a.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        } const admin = new User({
            name: {
                first: 'Admin',
                middle: '',
                last: 'User'
            },
            isAdmin: true,
            phone: '1234567890',
            email: adminEmail,
            password: await bcrypt.hash('yourSecurePassword', 10), // שנה את הסיסמה לפי הצורך
            address: {
                state: 'State',
                country: 'Country',
                city: 'City',
                street: 'Street',
                houseNumber: '123',
            },
            image: {
                url: '',
                alt: ''
            }
        });

        await admin.save();
        console.log('Admin user created successfully.');

        mongoose.disconnect();
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

createAdmin();
