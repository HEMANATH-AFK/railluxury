import express from 'express';
import { getSavedPassengers, savePassenger } from '../controllers/passengerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSavedPassengers)
  .post(protect, savePassenger);

export default router;
