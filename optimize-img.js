import sharp from 'sharp';

async function processImage() {
  try {
    console.log("Starting compression for hero-bg.jpg...");
    await sharp('./public/hero-bg.jpg')
      .resize(1920) // Resize to max 1920px width
      .webp({ quality: 80 })
      .toFile('./public/hero-bg.webp');
    console.log("Successfully created hero-bg.webp!");
  } catch (error) {
    console.error("Error compressing image: ", error);
  }
}

processImage();
