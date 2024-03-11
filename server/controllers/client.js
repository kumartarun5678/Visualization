import { validationResult } from 'express-validator';
import User from "../models/User.js";
import Visualization from "../models/Visualization.js"
import Registration from "../models/Registration.js";
import bcrypt from 'bcrypt';
import getCountryIso3 from "country-iso-2-to-3";



export const getVisualization = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, search = "" } = req.query;

    const visualizations = await Visualization.find({
      title: { $regex: new RegExp(search, 'i') },
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json(visualizations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const postRegistration = async (req, res) => {
  const { name, email, password, country, image, address, position } = req.body;

  try {
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRegistration = new Registration({
      name,
      email,
      password: hashedPassword, 
      country,
      image,
      address,
      position,
    });

    await newRegistration.save();
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Error registering new user');
  }
};

export const getLogin = async (req, res) => {
  console.log('Received login request', req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await Registration.findOne({ email: { $regex: new RegExp(email, 'i') } });

    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful for user:', email);
    res.status(200).json({ success: true, authtoken: 'yourAuthToken' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login' });
  }
};
