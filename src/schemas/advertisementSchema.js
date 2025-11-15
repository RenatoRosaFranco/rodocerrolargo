import * as Yup from 'yup';

const validateURL = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const advertisementSchema = Yup.object().shape({
  // Essential fields only - just the banner image and link
  imageUrl: Yup.string()
    .test('valid-url', 'Invalid image URL', validateURL)
    .required('Image URL is required'),

  destinationLink: Yup.string()
    .test('valid-url', 'Invalid destination URL', validateURL)
    .required('Destination link is required'),

  // Banner type
  bannerType: Yup.string()
    .oneOf(['top', 'sidebar-left', 'sidebar-right', 'footer', 'popup'], 'Invalid banner type')
    .required('Banner type is required'),

  // Period
  startDate: Yup.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Start date cannot be in the past')
    .required('Start date is required'),

  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
});
