const Judge = require('../Models/JudgeSchema'); // Import Judge model
const Lawyer = require('../Models/LawyerSchema')
const Police = require('../Models/StationSchema')

// Register Judge
const registerJudge =  async (req, res) => {
  try {
    const { name, email, password, walletAddress } = req.body;
    const newJudge = new Judge({
      name,
      email,
      password,
      walletAddress
    });

    await newJudge.save();
    res.status(201).json({ message: 'Judge registered successfully' });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Error registering judge' });
  }
}

const registerLawyer = async (req, res) => {
    const { name, email, password, walletAddress } = req.body || {};
  
    if (!name || !email || !password || !walletAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newLawyer = new Lawyer({
        name,
        email,
        password,
        walletAddress
      });
  
      await newLawyer.save();
      res.status(201).json({ message: 'Lawyer registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering lawyer' });
    }
  }

  const registerPolice = async (req, res) => {
    const { name, email, password, stationLocation, walletAddress } = req.body || {};
  
    if (!name || !email || !password || !stationLocation || !walletAddress) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const newPoliceStation = new Police({
        name,
        email,
        password,
        stationLocation,
        walletAddress
      });
  
      await newPoliceStation.save();
      res.status(201).json({ message: 'Police Station registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error registering police station' });
    }
  }

module.exports = {registerJudge, registerLawyer, registerPolice};
