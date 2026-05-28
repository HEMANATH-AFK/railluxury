import mongoose from 'mongoose';
import User from './backend/models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const createAdmin = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticket-reservation';
    await mongoose.connect(mongoURI);
    
    const adminExists = await User.findOne({ email: 'admin@ticketer.com' });
    if (adminExists) {
      console.log('Admin already exists. Updating role to admin...');
      adminExists.role = 'admin';
      await adminExists.save();
      console.log('Admin role updated.');
    } else {
      const admin = new User({
        name: 'System Admin',
        email: 'admin@ticketer.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created successfully!');
      console.log('Email: admin@ticketer.com');
      console.log('Password: adminpassword123');
    }
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
