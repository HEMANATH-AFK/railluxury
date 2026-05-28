import express from 'express';
import { searchTransport, getTransportById, createTransport, deleteTransport } from '../controllers/transportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(searchTransport)
  .post(protect, admin, createTransport);

router.route('/:id')
  .get(getTransportById)
  .delete(protect, admin, deleteTransport);

export default router;
