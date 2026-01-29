import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  method: {
    type: String,
    required: true,
    enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Cheque']
  },
  transactionId: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ['Completed', 'Pending', 'Failed'],
    default: 'Completed'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
