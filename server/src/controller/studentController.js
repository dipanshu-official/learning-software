import sendWelcomeEmail from "../config/sendMail.js";
import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
    try {
        const studentData = { ...req.body };
        
        if (req.file) {
            studentData.photos = {
                passport: req.file.filename
            };
        }
        
        const student = await Student.create(studentData);
        
        res.status(201).json(student);
        await sendWelcomeEmail(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getStudents = async (req, res) => {
  
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

export const updateStudent = async (req, res) => {
  
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        Object.assign(student, req.body);
        await student.save();
        
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
