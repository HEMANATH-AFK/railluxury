import Passenger from '../models/Passenger.js';

export const getSavedPassengers = async (req, res) => {
  try {
    if (!req.user?._id) {
      console.warn("⚠️ PASSENGER FETCH: No user found in request");
      return res.status(401).json({ message: 'Not authorized, user missing' });
    }

    const passengers = await Passenger.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(5);
      
    res.json(passengers);
  } catch (error) {
    console.error("🔥 PASSENGER FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch saved passengers", error: error.message });
  }
};

export const savePassenger = async (req, res) => {
  const { name, age, gender, preferences } = req.body;
  
  try {
    if (!req.user?._id) {
      console.warn("⚠️ PASSENGER SAVE: No user found in request");
      return res.status(401).json({ message: 'Not authorized, user missing' });
    }

    if (!name || !age || !gender) {
      return res.status(400).json({ message: "Name, Age, and Gender are required" });
    }

    // Upsert to avoid duplicates but update "recently used" timestamp
    const saved = await Passenger.findOneAndUpdate(
      { userId: req.user._id, name },
      { age, gender, preferences },
      { upsert: true, new: true, runValidators: true }
    );
    
    res.status(201).json(saved);
  } catch (error) {
    console.error("🔥 PASSENGER SAVE ERROR:", error);
    res.status(400).json({ message: "Failed to save passenger details", error: error.message });
  }
};
