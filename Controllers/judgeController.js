// judgeController.js

const Judge = require('../Models/JudgeSchema'); 
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication
const Request = require('../Models/requestModel')

const judgeLogin = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const email = username;

  try {
    // Find the judge in the database
    const judge = await Judge.findOne({ email });

    // Check if judge exists and password is correct
    if (!judge || judge.password!=password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token (optional, if using JWT)
    const token = jwt.sign({ id: judge._id, username: judge.username }, "process.env.JWT_SECRET", {
      expiresIn: '1h', // Token expiration time
    });

    // Respond with the judge data and token
    res.json(judge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
};

const judgeRequests = async (req, res) => {
    try {
      console.log("Fetching accepted requests...");
      const requests = await Request.find({ status: "accepted" }).populate('defendant');
      console.log("Requests found: ", requests);
      res.json(requests);
    } catch (err) {
      console.error("Error fetching requests:", err.message);
      res.status(500).json({ message: 'Error fetching requests', error: err.message });
    }
  };

module.exports = { judgeLogin , judgeRequests};
