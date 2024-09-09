const Request = require('../Models/requestModel');
  
const newRequest = async (req, res) => {
  const { defendant, lawyer, caseId } = req.body;

  // Validate input
  if (!defendant || !lawyer ||!caseId) {
    return res.status(400).json({ error: 'Defendant and lawyer IDs are required' });
  }

  try {
    // Create a new request
    const newRequest = new Request({
      defendant,
      lawyer,
      caseId,
      status: 'requested'
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating request' });
  }
}

// Get requests for a specific lawyer
// router.get('/requests/:lawyerId',
const allRequests =  async (req, res) => {
  try {
    const requests = await Request.find({ lawyer: req.params.lawyerId, status: "requested" }).populate('defendant');
    console.log(requests)
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};
const acceptRequests =  async (req, res) => {
    try {
      const requests = await Request.find({ lawyer: req.params.lawyerId, status: "accepted" }).populate('defendant');
      console.log(requests)
      res.json(requests);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching requests' });
    }
  };
  

// Update request status to accepted
// router.put('/requests/:requestId',
const updateRequest =  async (req, res) => {
  try {
    const { status } = req.body;
    const request = await Request.findByIdAndUpdate(req.params.requestId, { status }, { new: true });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error updating request' });
  }
};



module.exports = {newRequest,updateRequest,allRequests, acceptRequests};
