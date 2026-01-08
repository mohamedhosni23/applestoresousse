import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1693009279822',
    description: 'The most advanced iPhone ever. Featuring A17 Pro chip, titanium design, and Action button.',
    brand: 'Apple',
    category: 'Smartphones',
    price: 999,
    countInStock: 10,
  },
  {
    name: 'MacBook Air M3',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-202402?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1708363882526',
    description: 'Supercharged by the M3 chip. Incredibly thin and light design with all-day battery life.',
    brand: 'Apple',
    category: 'Laptops',
    price: 1099,
    countInStock: 8,
  },
  {
    name: 'iPad Pro 12.9"',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-202210?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1664413332703',
    description: 'The ultimate iPad experience with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
    brand: 'Apple',
    category: 'Tablets',
    price: 1099,
    countInStock: 6,
  },
  {
    name: 'AirPods Pro (2nd generation)',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1660803972361',
    description: 'Active Noise Cancellation, Adaptive Transparency, and Spatial Audio for an immersive experience.',
    brand: 'Apple',
    category: 'Audio',
    price: 249,
    countInStock: 15,
  },
  {
    name: 'Apple Watch Series 9',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-case-45-aluminum-midnight-nc-s9?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1692893842706',
    description: 'The most advanced Apple Watch. Featuring S9 SiP, Double Tap gesture, and brighter display.',
    brand: 'Apple',
    category: 'Wearables',
    price: 399,
    countInStock: 12,
  },
  {
    name: 'iMac 24" M3',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-select-202310?wid=2560&hei=2560&fmt=webp&qlt=80&.v=1697230830209',
    description: 'Stunning 24-inch display, M3 chip, and all-in-one design in vibrant colors.',
    brand: 'Apple',
    category: 'Desktops',
    price: 1299,
    countInStock: 5,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });
    console.log('👤 Admin user created:', adminUser.email);

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`📦 Created ${createdProducts.length} products`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();






