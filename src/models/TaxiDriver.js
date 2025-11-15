import mongoose from 'mongoose';

const TaxiDriverSchema = new mongoose.Schema({
  // Required fields only
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp is required'],
    trim: true,
  },

  // Optional additional information
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  photo: {
    type: String, // URL
    default: null,
  },

  // Approval status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    trim: true,
  },

  // Metadata
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  approvalDate: {
    type: Date,
  },
  approvedBy: {
    type: String,
  },
}, {
  timestamps: true,
});

// Indexes for better search performance
TaxiDriverSchema.index({ status: 1, registrationDate: -1 });
TaxiDriverSchema.index({ fullName: 'text', description: 'text' });

export default mongoose.models.TaxiDriver || mongoose.model('TaxiDriver', TaxiDriverSchema);
