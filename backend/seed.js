import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_NAME = 'Demo Gardener';

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sprouted');
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: DEMO_EMAIL });
    if (existing) {
      console.log('ℹ️ Demo user exists:', existing.name);
    } else {
      const hashed = await bcrypt.hash(DEMO_PASSWORD, 10);
      await new User({ name: DEMO_NAME, email: DEMO_EMAIL, password: hashed }).save();
      console.log('✅ Created demo:', DEMO_EMAIL, '/', DEMO_PASSWORD);
    }
  } catch (e) {
    console.error('❌ Error:', e.message);
  } finally {
    mongoose.disconnect();
  }
}

run();
