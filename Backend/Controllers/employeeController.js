const employee = require('../Models/employee.js')
const Joi = require('joi')
const fs = require('fs');
const path = require('path');

exports.createEmployee = async (req, res) => {
    try {
      // validation schema using Joi
      const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
          'string.base': 'Name must be a string',
          'string.min': 'Name must be at least 3 characters long',
          'string.max': 'Name must be less than or equal to 50 characters long',
          'any.required': 'Name is required',
        }),
  
        email: Joi.string().email().required().messages({
          'string.base': 'Email must be a string',
          'string.email': 'Invalid email format',
          'any.required': 'Email is required',
        }),
  
        mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
          'string.base': 'Mobile number must be a string',
          'string.pattern.base': 'Mobile number must be 10 digits',
          'any.required': 'Mobile number is required',
        }),
  
        designation: Joi.string().valid('HR', 'Manager', 'Sales', 'Other').required().messages({
          'string.base': 'Designation must be a string',
          'any.required': 'Designation is required',
          'any.only': 'Designation must be one of HR, Manager, Sales, Other',
        }),
  
        gender: Joi.string().valid('male', 'female').required().messages({
          'string.base': 'Gender must be a string',
          'any.required': 'Gender is required',
          'any.only': 'Gender must be either male or female',
        }),
  
        course: Joi.string().valid('BCA', 'MCA', 'BSC').required().messages({
          'string.base': 'Course must be a string',
          'any.required': 'Course is required',
          'any.only': 'Course must be one of BCA, MCA, BSC',
        })
      });
  
      const { error } = schema.validate(req.body);
  
      if (error) {
     
        console.log(error.details[0].message)
        return res.status(400).json({ error: error.details[0].message });
      }
  
      
      if (!req.file) {
        return res.status(400).send('Image is required');
      }
  
      const { name, email, mobile, designation, gender, course } = req.body;
  
    
      const id = `EMP-${Date.now()}`;

      const image = req.file.path;  
      const allowedMimeTypes = ['image/jpeg', 'image/png']; 
      const fileMimeType = req.file.mimetype;
  
      
      if (!allowedMimeTypes.includes(fileMimeType)) {
        fs.unlinkSync(req.file.path); 
        return res.status(400).json({ error: 'Only JPG and PNG images are allowed' });
      }
  
   
      const newEmployee = new employee({
        id,
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image
      });
  
    
      await newEmployee.save();
  
     
      res.status(201).json({
        message: 'Employee created successfully',
        employee: newEmployee
      });
    } catch (error) {
      res.status(500).json({ error: 'Employee not created' });
    }
  };

//     try {
//         const id = req.params.id; 

//         // Fetch products that match the given category
//         const result = await employee.find({ id });
//         // console.log(result)
//         // If no products are found, return a message indicating this
//         if (result.length == 0) {
//             return res.status(404).json({error: 'No employee found'});
//         }

//         // Return the fetched products
//         res.status(200).json({ success: true, result});
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

exports.fetchEmployee = async (req, res) => {
    try{
        const employees = await employee.find(); // Fetch all employee records
        res.status(200).json({
            message: 'Employees fetched successfully',
            employees,
        });
    }catch(error){
        res.status(500).json({
            error: 'An error occurred while fetching employees',
        });
    }
}

exports.deleteEmployee = async (req, res) => {

    const employeeId = req.params.id;
    console.log(employeeId)
    try{
        const delemp = await employee.findByIdAndDelete(employeeId);

    if (!delemp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });

    if (delemp.image) {
        const imagePath = path.join(__dirname, '..', delemp.image); // Assuming 'image' stores the filename
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the image file
          console.log('Image deleted successfully:', imagePath);
        }
      }
    }catch(error){
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
}