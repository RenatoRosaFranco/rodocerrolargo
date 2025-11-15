import * as Yup from 'yup';

export const taxiDriverSchema = Yup.object().shape({
  // Required fields only - 4 essential fields
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be at most 100 characters')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  phone: Yup.string()
    .min(10, 'Invalid phone')
    .max(15, 'Invalid phone')
    .required('Phone is required'),

  whatsapp: Yup.string()
    .min(10, 'Invalid WhatsApp')
    .max(15, 'Invalid WhatsApp')
    .required('WhatsApp is required'),

  // Optional field
  description: Yup.string()
    .max(500, 'Description must be at most 500 characters')
    .nullable(),
});
