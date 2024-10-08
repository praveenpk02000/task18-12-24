const express = require('express');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser');
const multer = require('multer'); // For handling file uploads
const mongoose = require('mongoose'); // For MongoDB connection

const app = express();
const port = 5000; // Backend server running on port 5000

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true // If your frontend sends cookies or uses credentials
}));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  serverSelectionTimeoutMS: 5000 // Optional timeout
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));


// Define Employee Schema for MongoDB
const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  maritalStatus: String,
  caste: String,
  category: String,
  religion: String,
  bloodGroup: String,
  homeState: String,
  homeDistrict: String,
  presentAddress: String,
  district: String,
  state: String,
  pinCode: String,
  phoneNumber: String,
  permanentAddress: String,
  employeeImage: String  // Storing image path in MongoDB
});

// Create Employee model
const Employee = mongoose.model('Employee', employeeSchema);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // File name format
  }
});
const upload = multer({ storage: storage });

// Route to handle employee form data and file upload
app.post('/api/employee', upload.single('employeeImage'), async (req, res) => {
  try {
    // Log the incoming data for debugging
    console.log('Request Body:', req.body);

    // Parse the formData and addressData fields
    const formData = JSON.parse(req.body.formData);
    const addressData = JSON.parse(req.body.addressData);

    // Uploaded image file path
    const employeeImage = req.file ? req.file.path : null;

    // Create new employee document
    const newEmployee = new Employee({
      ...formData,
      ...addressData,
      employeeImage  // Save image path in MongoDB
    });

    // Save the employee data to MongoDB
    await newEmployee.save();

    // Send success response
    res.status(200).json({ message: 'Employee data saved successfully' });
  } catch (error) {
    console.error('Error saving employee data:', error);
    res.status(500).json({ message: 'Failed to save employee data' });
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
