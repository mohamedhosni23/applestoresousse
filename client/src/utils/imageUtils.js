/**
 * Normalizes image URL to ensure it can be displayed correctly
 * Handles both external URLs and local file paths
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '';
  }

  // If it's already a full URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a local path starting with /img, prepend the server URL
  if (imagePath.startsWith('/img/')) {
    return `http://localhost:5000${imagePath}`;
  }

  // Default: assume it's a local path
  return `http://localhost:5000${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

