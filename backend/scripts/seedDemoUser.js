import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const DEMO_EMAIL = 'test@example.com';
const DEMO_PASSWORD = 'test123';
const DEMO_NAME = 'Demo Gardener';

async function seedDemoUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existingUser = await User.findOne({ email: DEMO_EMAIL });
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
    if (existingUser) {
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log(`Demo user password updated: ${DEMO_NAME} (${DEMO_EMAIL} / ${DEMO_PASSWORD})`);
    } else {
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

