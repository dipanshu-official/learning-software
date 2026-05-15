import Institute from '../models/Institute.js';

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