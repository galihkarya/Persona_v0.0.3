import axios from 'axios';

// Load environment variables
require('dotenv').config();

const instance = axios.create({
  baseURL: `https://personaapp-2nryopyb2q-et.a.run.app`,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_KEY}`
  }

});

export default instance;
