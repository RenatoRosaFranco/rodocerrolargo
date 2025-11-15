import mongoose from 'mongoose';

const AdvertisementSchema = new mongoose.Schema({
  // Essential fields only
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  destinationLink: {
    type: String,
    required: [true, 'Destination link is required'],
    trim: true,
  },

  // Banner type (position)
  bannerType: {
    type: String,
    enum: ['top', 'sidebar-left', 'sidebar-right', 'footer', 'popup'],
    required: [true, 'Banner type is required'],
  },

  // Display period
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },

  // Status and control
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'expired', 'rejected'],
    default: 'pending',
  },
  priority: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },

  // Statistics
  views: {
    type: Number,
    default: 0,
  },
  clicks: {
    type: Number,
    default: 0,
  },

  // Administrative control
  approvedBy: {
    type: String,
  },
  approvalDate: {
    type: Date,
  },
  rejectionReason: {
    type: String,
  },

  // Popup specific settings
  popupConfig: {
    displayAfter: {
      type: Number, // in seconds
      default: 5,
    },
    frequency: {
      type: String,
      enum: ['always', 'once-per-session', 'once-per-day'],
      default: 'once-per-session',
    },
  },
}, {
  timestamps: true,
});

// Indexes for better performance
AdvertisementSchema.index({ bannerType: 1, status: 1, startDate: 1, endDate: 1 });
AdvertisementSchema.index({ status: 1, priority: -1 });

// Method to check if ad is active
AdvertisementSchema.methods.isActive = function() {
  const now = new Date();
  return (
    this.status === 'active' &&
    this.startDate <= now &&
    this.endDate >= now
  );
};

// Middleware to automatically update status
AdvertisementSchema.pre('save', function(next) {
  const now = new Date();

  if (this.status === 'active' && this.endDate < now) {
    this.status = 'expired';
  }

  next();
});

export default mongoose.models.Advertisement || mongoose.model('Advertisement', AdvertisementSchema);
