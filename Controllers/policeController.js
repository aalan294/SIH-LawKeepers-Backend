const Police = require('../Models/StationSchema');
const jwt = require('jsonwebtoken'); 

const loginPolice = async (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = 'your_jwt_secret';
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const policeStation = await Police.findOne({ email });
  
      if (!policeStation) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
    //   const isMatch = await bcrypt.compare(password, policeStation.password);
  
      if (policeStation.password !=password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: policeStation._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  module.exports = {loginPolice}