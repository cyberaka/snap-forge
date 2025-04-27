import sharp from "sharp";

/**
 * Input parameters
 * - Paths to the source image, target image, and output image.
 * - Dimensions of the source image and target image.
 * - Subject box (area of interest in the source image) and placement point (where the subject will be placed on the target image).
 */
const sourceImagePath = "/Users/abhinavanand/Desktop/billi/source.png";
const targetImagePath = "/Users/abhinavanand/Desktop/billi/target.png";
const outputImagePath = "/Users/abhinavanand/Desktop/billi/output.png";

const sourceImage = { width: 796, height: 452 }; // Dimensions of the source image
const subjectBox = { x: 283, y: 124, width: 306, height: 320 }; // Area of interest in the source image
const targetImage = { width: 452, height: 796 }; // Dimensions of the target image
const placementPoint = { x: 72, y: 236 }; // Point on the target image where the subject will be placed

/**
 * Calculates the crop area from the source image and the placement area on the target image.
 * This ensures the subject is cropped and resized to fit the target image while maintaining its aspect ratio.
 */
function calculateCropAndPlacement() {
  const subjectAspectRatio = subjectBox.width / subjectBox.height; // Aspect ratio of the subject

  // Calculate the maximum possible crop dimensions that fit within both the source and target images
  const maxCropWidth = Math.min(targetImage.width, sourceImage.width);
  const maxCropHeight = Math.min(targetImage.height, sourceImage.height);

  let cropWidth = maxCropWidth;
  let cropHeight = cropWidth / subjectAspectRatio;

  // Adjust crop dimensions if the height exceeds the maximum allowed height
  if (cropHeight > maxCropHeight) {
    cropHeight = maxCropHeight;
    cropWidth = cropHeight * subjectAspectRatio;
  }

  // Center the crop area around the subject
  const subjectCenterX = subjectBox.x + subjectBox.width / 2;
  const subjectCenterY = subjectBox.y + subjectBox.height / 2;

  let cropX = subjectCenterX - cropWidth / 2;
  let cropY = subjectCenterY - cropHeight / 2;

  // Ensure the crop area stays within the bounds of the source image
  if (cropX < 0) cropX = 0;
  if (cropY < 0) cropY = 0;
  if (cropX + cropWidth > sourceImage.width)
    cropX = sourceImage.width - cropWidth;
  if (cropY + cropHeight > sourceImage.height)
    cropY = sourceImage.height - cropHeight;

  const cropBox = {
    x: Math.round(cropX),
    y: Math.round(cropY),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight),
  };

  // Adjust the placement point on the target image based on the crop area
  const offsetX = subjectBox.x - cropBox.x;
  const offsetY = subjectBox.y - cropBox.y;

  const placementBox = {
    x: placementPoint.x - offsetX,
    y: placementPoint.y - offsetY,
    width: cropBox.width,
    height: cropBox.height,
  };

  console.log("Crop Box:", cropBox);
  console.log("Placement Box:", placementBox);

  return { cropBox, placementBox };
}

/**
 * Crops the subject from the source image based on the calculated crop area.
 * @param sourceImagePath Path to the source image
 * @param cropBox The area to crop from the source image
 * @returns A buffer containing the cropped image
 */
async function cropSubject(
  sourceImagePath: string,
  cropBox: { x: number; y: number; width: number; height: number }
): Promise<Buffer> {
  const meta = await sharp(sourceImagePath).metadata();

  // Adjust the crop box to ensure it stays within the bounds of the source image
  const adjustedCropBox = {
    left: Math.max(0, cropBox.x),
    top: Math.max(0, cropBox.y),
    width: Math.min(cropBox.width, (meta.width ?? 0) - cropBox.x),
    height: Math.min(cropBox.height, (meta.height ?? 0) - cropBox.y),
  };

  console.log("Adjusted Crop Box:", adjustedCropBox);

  // Extract the cropped area from the source image
  return sharp(sourceImagePath).extract(adjustedCropBox).toBuffer();
}

/**
 * Places the cropped subject onto the target image at the specified placement area.
 * @param sourceImagePath Path to the source image
 * @param targetImagePath Path to the target image
 * @param cropBox The area to crop from the source image
 * @param placementBox The area on the target image where the cropped subject will be placed
 * @param outputImagePath Path to save the final output image
 */
async function placeSubjectOnExistingTarget(
  sourceImagePath: string,
  targetImagePath: string,
  cropBox: { x: number; y: number; width: number; height: number },
  placementBox: { x: number; y: number; width: number; height: number },
  outputImagePath: string
) {
  // Crop the subject from the source image
  const subjectBuffer = await cropSubject(sourceImagePath, cropBox);

  // Resize the cropped subject to fit the placement area
  const resizedSubject = await sharp(subjectBuffer)
    .resize(placementBox.width, placementBox.height)
    .toBuffer();

  // Composite the resized subject onto the target image
  await sharp(targetImagePath)
    .composite([
      {
        input: resizedSubject,
        top: placementBox.y,
        left: placementBox.x,
      },
    ])
    .toFile(outputImagePath);

  console.log(`Output image saved at: ${outputImagePath}`);
}

// Run the process
const { cropBox, placementBox } = calculateCropAndPlacement();
placeSubjectOnExistingTarget(
  sourceImagePath,
  targetImagePath,
  cropBox,
  placementBox,
  outputImagePath
);
