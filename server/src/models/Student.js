import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  course: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  studentContact: {
    type: String,
    required: true
  },
  parentContact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  aadhaarNumber: {
    type: String,
    required: true
  },
  permanentAddress: {
    type: String,
    required: true
  },
  currentAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  totalFees: {
    type: Number,
    required: true
  },
  paidFees: {
    type: Number,
    required: true
  },
  photos: {
    passport: String,
    aadhaar: String
  },
  paymentHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }]
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
