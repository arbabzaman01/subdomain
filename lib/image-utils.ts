// Image optimization utility for future real data uploads
// These guidelines should be followed when uploading real product images

export const imageOptimizationGuidelines = {
  maxWidth: 800,
  maxHeight: 800,
  targetFileSize: "200-300 KB",
  format: "JPEG or WebP",
  quality: 80,
  description: "Optimized product images for fast loading on admin panel and client side",
}

// Helper function to validate image uploads
export const validateProductImage = (file: File): { valid: boolean; error?: string } => {
  const maxSizeKB = 300
  const maxSizeBytes = maxSizeKB * 1024

  if (file.size > maxSizeBytes) {
    return { valid: false, error: `Image must be under ${maxSizeKB}KB. Current: ${(file.size / 1024).toFixed(2)}KB` }
  }

  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File must be an image" }
  }

  return { valid: true }
}
