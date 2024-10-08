import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/EmployeeForm.css';

const EmployeeForm = () => {
  // State for Personal Info
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    parentName: '',
    gender: '',
    maritalStatus: '',
    caste: '',
    category: '',
    religion: '',
    bloodGroup: '',
    homeState: '',
    homeDistrict: ''
  });

  // State for Address Info
  const [addressData, setAddressData] = useState({
    presentAddress: '',
    block: '',
    panchayat: '',
    district: '',
    state: '',
    pinCode: '',
    phoneNumber: '',
    permanentAddress: '',
    permanentBlock: '',
    permanentPanchayat: '',
    permanentDistrict: '',
    permanentState: '',
    permanentPinCode: ''
  });

  // State for Image Upload
  const [employeeImage, setEmployeeImage] = useState(null);

  // State to manage form steps
  const [step, setStep] = useState(1); // 1 for personal info, 2 for address info

  // Validation state
  const [Formerrors, setErrors] = useState({});

  // Handle input changes for both personal and address info
  const handlePersonalChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    };

  // Validate fields
  const validateForm = () => {
    let newErrors = {};
    if (step === 1) {
      // Personal info validation
      if (!formData.firstName) newErrors.firstName = '*First name is required';
      if (!formData.lastName) newErrors.lastName = '*Last name is required';
      if (!formData.dob) newErrors.dob = '*Date of birth is required';
      if (!formData.gender) newErrors.gender = '*Gender is required';
      if (!formData.maritalStatus) newErrors.maritalStatus = '*Marital status is required';
      if (!formData.caste) newErrors.caste = '*Caste is required';
      if (!formData.category) newErrors.category = '*Category is required';
      if (!formData.religion) newErrors.religion = '*Religion is required';
      if (!formData.bloodGroup) newErrors.bloodGroup = '*Blood group is required';
    } else if (step === 2) {
      // Address info validation
      if (!addressData.presentAddress) newErrors.presentAddress = '*Present address is required';
      if (!addressData.district) newErrors.district = '*District is required';
      if (!addressData.state) newErrors.state = '*State is required';
      if (!addressData.pinCode) newErrors.pinCode = '*Pin code is required';
      if (!addressData.phoneNumber) newErrors.phoneNumber = '*Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append personal information and address information as JSON
      formDataToSend.append('formData', JSON.stringify(formData));
      formDataToSend.append('addressData', JSON.stringify(addressData));

      // Append image file if selected
      if (employeeImage) {
        formDataToSend.append('employeeImage', employeeImage);
      }

      try {
        // Send POST request to the backend API
        const response = await axios.post('http://localhost:5000/api/employee', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Log the response from the server
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  // Handle moving to the next or previous step
  const handleNext = () => {
    if (validateForm()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Form styling
  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const sectionHeaderStyle = {
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px'
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  };

  const errorStyle = {
    color: 'red',            
    fontSize: '12px',        
    fontWeight: 'bold',      
    marginTop: '5px',        
    marginBottom: '10px',    
    backgroundColor: '#ffe6e6',
    padding: '8px',          
    borderRadius: '4px',     
    border: '1px solid red', 
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {step === 1 && (
        <div>
          <h2 style={sectionHeaderStyle}>Employee Personal Information</h2>
          <div>
            <label style={labelStyle}>First Name:</label>
            <input name="firstName" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.firstName && <p style={errorStyle}>{Formerrors.firstName}</p>}
          </div>
          <div>
            <label style={labelStyle}>Last Name:</label>
            <input name="lastName" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.lastName && <p style={errorStyle}>{Formerrors.lastName}</p>}
          </div>
          <div>
            <label style={labelStyle}>Date of Birth:</label>
            <input name="dob" type="date" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.dob && <p style={errorStyle}>{Formerrors.dob}</p>}
          </div>
          <div>
            <label style={labelStyle}>Gender:</label>
            <div>
              <input type="radio" name="gender" value="Male" onChange={handlePersonalChange} /> Male
              <input type="radio" name="gender" value="Female" onChange={handlePersonalChange} /> Female
              <input type="radio" name="gender" value="Other" onChange={handlePersonalChange} /> Other
            </div>
            {Formerrors.gender && <p style={errorStyle}>{Formerrors.gender}</p>}
          </div>
          <div>
            <label style={labelStyle}>Marital Status:</label>
            <input name="maritalStatus" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.maritalStatus && <p style={errorStyle}>{Formerrors.maritalStatus}</p>}
          </div>
          <div>
            <label style={labelStyle}>Caste:</label>
            <input name="caste" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.caste && <p style={errorStyle}>{Formerrors.caste}</p>}
          </div>
          <div>
            <label style={labelStyle}>Category:</label>
            <input name="category" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.category && <p style={errorStyle}>{Formerrors.category}</p>}
          </div>
          <div>
            <label style={labelStyle}>Religion:</label>
            <input name="religion" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.religion && <p style={errorStyle}>{Formerrors.religion}</p>}
          </div>
          <div>
            <label style={labelStyle}>Blood Group:</label>
            <input name="bloodGroup" style={inputStyle} onChange={handlePersonalChange} />
            {Formerrors.bloodGroup && <p style={errorStyle}>{Formerrors.bloodGroup}</p>}
          </div>
          <div>
            <label style={labelStyle}>Employee Image:</label>
            <input type="file" onChange={handleImageChange} />
            {employeeImage &&( 
            <img src={URL.createObjectURL(employeeImage)} alt='' style={{ width: '200px', marginTop: '10px', marginRight:'500px' }} />
            )}
          </div>
          
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={sectionHeaderStyle}>Employee Address Information</h2>
          <div>
            <label style={labelStyle}>Present Address:</label>
            <input name="presentAddress" style={inputStyle} onChange={handleAddressChange} />
            {Formerrors.presentAddress && <p style={errorStyle}>{Formerrors.presentAddress}</p>}
          </div>
          <div>
            <label style={labelStyle}>District:</label>
            <input name="district" style={inputStyle} onChange={handleAddressChange} />
            {Formerrors.district && <p style={errorStyle}>{Formerrors.district}</p>}
          </div>
          <div>
            <label style={labelStyle}>State:</label>
            <input name="state" style={inputStyle} onChange={handleAddressChange} />
            {Formerrors.state && <p style={errorStyle}>{Formerrors.state}</p>}
          </div>
          <div>
            <label style={labelStyle}>Pin Code:</label>
            <input name="pinCode" style={inputStyle} onChange={handleAddressChange} />
            {Formerrors.pinCode && <p style={errorStyle}>{Formerrors.pinCode}</p>}
          </div>
          <div>
            <label style={labelStyle}>Phone Number:</label>
            <input name="phoneNumber" style={inputStyle} onChange={handleAddressChange} />
            {Formerrors.phoneNumber && <p style={errorStyle}>{Formerrors.phoneNumber}</p>}
          </div>
          <div>
            <label style={labelStyle}>Permanent Address:</label>
            <input name="permanentAddress" style={inputStyle} onChange={handleAddressChange} />
          </div>
          <div>
            <label style={labelStyle}>Permanent Block:</label>
            <input name="permanentBlock" style={inputStyle} onChange={handleAddressChange} />
          </div>
          <div>
            <label style={labelStyle}>Permanent Panchayat:</label>
            <input name="permanentPanchayat" style={inputStyle} onChange={handleAddressChange} />
          </div>
          <div>
            <label style={labelStyle}>Permanent District:</label>
            <input name="permanentDistrict" style={inputStyle} onChange={handleAddressChange} />
          </div>
          <div>
            <label style={labelStyle}>Permanent State:</label>
            <input name="permanentState" style={inputStyle} onChange={handleAddressChange} />
          </div>
          <div>
            <label style={labelStyle}>Permanent Pin Code:</label>
            <input name="permanentPinCode" style={inputStyle} onChange={handleAddressChange} />
          </div>

        </div>
      )}

      <div style={buttonContainerStyle}>
        {step > 1 && <button type="button" style={buttonStyle} onClick={handlePrevious}>Previous</button>}
        {step < 2 && <button type="button" style={buttonStyle} onClick={handleNext}>Next</button>}
        {step === 2 && <button type="submit" style={buttonStyle}>Submit</button>}
      </div>
    </form>
  );
};

export default EmployeeForm;
 