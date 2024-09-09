const Lawyer = require('../Models/LawyerSchema'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');// Adjust the path to the Lawyer model

// Fetch all lawyers
const getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find().select('_id name walletAddress'); // Select only name and walletAddress
    res.status(200).json(lawyers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lawyers', error: error.message });
  }
};
// Adjust the path as necessary

// Secret key for JWT (should be stored in environment variables in a real application)
const JWT_SECRET = 'your_jwt_secret_key';

// Login endpoint for lawyers
const login= async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find lawyer by email
    const lawyer = await Lawyer.findOne({ email });
    if (!lawyer) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // // Check password
    // const isMatch = await bcrypt.compare(password, lawyer.password);
    if (lawyer.password!=password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: lawyer._id, role: 'Lawyer' }, JWT_SECRET, { expiresIn: '1h' });

    // Send response with token
    res.status(200).json({
        message: 'Login successful',
        token,
        user: lawyer
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = { getAllLawyers, login };
