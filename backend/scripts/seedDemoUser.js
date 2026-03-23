import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = 'Demo Gardener';

async function seedDemoUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existingUser = await User.findOne({ email: DEMO_EMAIL });
    if (existingUser) {
      console.log('Demo user already exists. Skipping...');
    } else {
      const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
      const demoUser = new User({
        name: DEMO_NAME,
        email: DEMO_EMAIL,
        password: hashedPassword
      });
      await demoUser.save();
      console.log(`Demo user created: ${DEMO_NAME} (${DEMO_EMAIL} / ${DEMO_PASSWORD})`);
    }
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
  }
}

seedDemoUser();

