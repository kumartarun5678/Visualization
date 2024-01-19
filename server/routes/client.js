import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getVisualization,
  postRegistration,
  getLogin,
} from "../controllers/client.js";
import { body } from 'express-validator';

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
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