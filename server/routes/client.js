import express from "express";
import {
  getVisualization,
  postRegistration,
  getLogin,
} from "../controllers/client.js";
import { body } from 'express-validator';

const router = express.Router();
router.get("/visualization",getVisualization);

router.post("/registration", postRegistration);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  getLogin
);

export default router;