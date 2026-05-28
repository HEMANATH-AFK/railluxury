import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Transport from './models/Transport.js';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticket-reservation';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

const southCities = [
  'Chennai Central', 'Bangalore City', 'Coimbatore Jn', 'Madurai Jn', 
  'Trichy Jn', 'Salem Jn', 'Tirunelveli Jn', 'Kochi (Ernakulam)', 
  'Trivandrum Central', 'Mysore Jn', 'Hyderabad Deccan', 'Vijayawada Jn',
  'Visakhapatnam', 'Mangalore Central', 'Calicut', 'Thanjavur'
];

const trainNames = [
  'Express', 'Superfast', 'Shatabdi', 'Rajdhani', 'Mail', 
  'Duronto', 'Intercity', 'Passenger', 'Garib Rath', 'Jan Shatabdi'
];

const prefixes = [
  'Kaveri', 'Vaigai', 'Nilgiri', 'Cheran', 'Pandian', 
  'Nellai', 'Brindavan', 'Lalbagh', 'Pinakini', 'Ratnachal',
  'Godavari', 'Charminar', 'Venkatadri', 'Krishna', 'Sabari',
  'Trivandrum', 'Island', 'Tea Garden', 'West Coast', 'Mangala'
];

const generateTrains = () => {
  const trains = [];
  for (let i = 1; i <= 100; i++) {
    const sourceIdx = Math.floor(Math.random() * southCities.length);
    let destIdx = Math.floor(Math.random() * southCities.length);
    while (destIdx === sourceIdx) destIdx = Math.floor(Math.random() * southCities.length);

    const source = southCities[sourceIdx];
    const destination = southCities[destIdx];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const type = trainNames[Math.floor(Math.random() * trainNames.length)];
    
    const trainNumber = (10000 + i).toString();
    const name = `${prefix} ${type}`;

    // Generate 5 stops
    const stops = [];
    stops.push({ station: source, departureTime: new Date(2024, 4, 1, 6 + Math.floor(Math.random() * 12), 0), distanceFromSourceKm: 0 });
    
    for (let j = 1; j <= 3; j++) {
      stops.push({ 
        station: `Stop ${j} of ${trainNumber}`, 
        arrivalTime: new Date(2024, 4, 1, 8 + j * 3, 0), 
        departureTime: new Date(2024, 4, 1, 8 + j * 3, 5),
        distanceFromSourceKm: j * 200
      });
    }
    
    stops.push({ station: destination, arrivalTime: new Date(2024, 4, 1, 22, 0), distanceFromSourceKm: 800 });

    trains.push({
      type: 'train',
      name,
      number: trainNumber,
      route: stops,
      classes: [
        { className: 'SL', basePrice: 400 + Math.floor(Math.random() * 200), totalSeats: 72, layout: 'sleeper' },
        { className: '3A', basePrice: 1100 + Math.floor(Math.random() * 300), totalSeats: 64, layout: '3x3' },
        { className: '2A', basePrice: 1600 + Math.floor(Math.random() * 400), totalSeats: 48, layout: '2x2' },
        { className: '1A', basePrice: 2800 + Math.floor(Math.random() * 600), totalSeats: 24, layout: '2x2' }
      ],
      durationMinutes: 600 + Math.floor(Math.random() * 600)
    });
  }
  return trains;
};

const generateFlights = () => {
  const airlines = ['IndiGo', 'Air India', 'Vistara', 'AirAsia', 'SpiceJet'];
  const routes = [
    { from: 'Chennai (MAA)', to: 'Bangalore (BLR)' },
    { from: 'Chennai (MAA)', to: 'Hyderabad (HYD)' },
    { from: 'Chennai (MAA)', to: 'Delhi (DEL)' },
    { from: 'Bangalore (BLR)', to: 'Mumbai (BOM)' },
    { from: 'Bangalore (BLR)', to: 'Kochi (COK)' },
    { from: 'Hyderabad (HYD)', to: 'Delhi (DEL)' },
    { from: 'Mumbai (BOM)', to: 'Delhi (DEL)' },
    { from: 'Kochi (COK)', to: 'Mumbai (BOM)' }
  ];

  const flights = [];
  for (let i = 1; i <= 20; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const route = routes[Math.floor(Math.random() * routes.length)];
    
    flights.push({
      type: 'flight',
      name: airline,
      number: `${airline.substring(0, 2).toUpperCase()}-${100 + i}`,
      route: [
        { station: route.from, departureTime: new Date(2024, 4, 1, 8 + (i % 12), 0), distanceFromSourceKm: 0 },
        { station: route.to, arrivalTime: new Date(2024, 4, 1, 10 + (i % 12), 30), distanceFromSourceKm: 1200 }
      ],
      classes: [
        { className: 'Economy', basePrice: 3500 + Math.floor(Math.random() * 2000), totalSeats: 150, layout: '3x3' },
        { className: 'Business', basePrice: 12000 + Math.floor(Math.random() * 5000), totalSeats: 12, layout: '2x2' }
      ],
      durationMinutes: 60 + Math.floor(Math.random() * 120)
    });
  }
  return flights;
};

const importData = async () => {
  try {
    await connectDB();
    await Transport.deleteMany();
    await User.deleteMany();

    await User.create([
      { name: 'Admin', email: 'admin@ticketer.com', password: 'admin', role: 'admin' },
      { name: 'John Doe', email: 'john@example.com', password: 'password', role: 'user' }
    ]);

    const trains = generateTrains();
    const flights = generateFlights();

    await Transport.insertMany([...trains, ...flights]);

    console.log(`${trains.length} Trains and ${flights.length} Flights Imported!`);
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();
