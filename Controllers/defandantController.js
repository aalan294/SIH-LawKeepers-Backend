const Defender = require('../Models/DefenderSchema'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Assuming you use JWT for authentication

const loginDefender = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the defender by email
    const defender = await Defender.findOne({ email });

    if (!defender) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // // Compare the provided password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password, defender.password);

    if (defender.password!=password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: defender._id, role: defender.role },
      "process.env.JWT_SECRET",
      { expiresIn: '1h' }
    );

    // Respond with token and user details
    res.status(200).json({
      message: 'Login successful',
      token,
      user: defender
    });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginDefender };
