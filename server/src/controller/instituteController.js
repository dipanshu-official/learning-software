import jwt from 'jsonwebtoken';
import Institute from '../models/Institute.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

export const getInstitutes = async (req, res) => {
  try {
    const institutes = await Institute.find().sort({ createdAt: -1 });
    res.status(200).json(institutes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInstitute = async (req, res) => {
  try {
    const newInstitute = new Institute(req.body);
    await newInstitute.save();
    res.status(201).json(newInstitute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateInstitute = async (req, res) => {
  try {
    const updated = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteInstitute = async (req, res) => {
  try {
    await Institute.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Institute deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const instituteLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const institute = await Institute.findOne({ 
      email: { $regex: new RegExp("^" + normalizedEmail.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "$", "i") }
    });

    if (!institute) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (institute.status !== "active") {
      return res.status(403).json({ success: false, message: "Institute account is inactive. Please contact the super admin." });
    }

    if (institute.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(institute._id);

    res.status(200).json({
      success: true,
      message: "Institute login successful",
      token,
      institute: {
        id: institute._id,
        name: institute.ownerName,
        instituteName: institute.instituteName,
        email: institute.email,
        role: "institute",
      },
    });
  } catch (error) {
    console.error("Institute login error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};