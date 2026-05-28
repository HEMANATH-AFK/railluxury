import Transport from '../models/Transport.js';

export const searchTransport = async (req, res) => {
  const { type, source, destination } = req.query; 
  try {
    const query = {};
    if (type) query.type = type;
    
    // Check if source and destination exist in the route array
    if (source) {
      query['route.station'] = { $regex: source, $options: 'i' };
    }
    if (destination) {
      if (query['route.station']) {
        // If both source and destination are provided
        query['route'] = { 
          $all: [
            { $elemMatch: { station: { $regex: source, $options: 'i' } } },
            { $elemMatch: { station: { $regex: destination, $options: 'i' } } }
          ]
        };
        delete query['route.station'];
      } else {
        query['route.station'] = { $regex: destination, $options: 'i' };
      }
    }
    
    // We want to return virtuals (source, destination) and calculate min price
    const transports = await Transport.find(query);
    
    // Map to include starting price and basic route info for the frontend
    const results = transports.map(t => {
      const jsonObj = t.toJSON({ virtuals: true });
      jsonObj.startingPrice = Math.min(...t.classes.map(c => c.basePrice));
      jsonObj.departureTime = t.route[0].departureTime;
      jsonObj.arrivalTime = t.route[t.route.length - 1].arrivalTime;
      return jsonObj;
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (transport) {
      res.json(transport);
    } else {
      res.status(404).json({ message: 'Transport not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only
export const createTransport = async (req, res) => {
  try {
    const transport = new Transport(req.body);
    const createdTransport = await transport.save();
    res.status(201).json(createdTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransport = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (transport) {
      await transport.deleteOne();
      res.json({ message: 'Transport removed' });
    } else {
      res.status(404).json({ message: 'Transport not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
