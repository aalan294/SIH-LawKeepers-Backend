const Defender = require('../Models/DefenderSchema');

// Handle case creation and defender update
createCase = async (req, res) => {
  const { caseId, defenderName, defenderEmail, defenderPassword, description, firDocumentCID, initialProofName, initialProofCID } = req.body;

  try {
    // Check if the defender already exists
    let defender = await Defender.findOne({ email: defenderEmail });

    if (defender) {
      // If defender exists, update their case list
      defender.cases.push(caseId);
      await defender.save();
    } else {
      // If defender doesn't exist, create a new one
      defender = new Defender({
        name: defenderName,
        email: defenderEmail,
        password: defenderPassword,
        cases: [caseId]
      });
      await defender.save();
    }

    // Respond with success message
    res.status(201).json({ message: 'Case created and defender updated successfully', caseId });
  } catch (error) {
    console.error('Error creating case:', error);
    res.status(500).json({ message: 'Error creating case' });
  }
};

module.exports = {createCase}
