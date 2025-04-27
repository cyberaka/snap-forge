import sharp from "sharp";

// Input parameters
const sourceImagePath = "/Users/abhinavanand/Desktop/billi/source.png";
const targetImagePath = "/Users/abhinavanand/Desktop/billi/target.png";
const outputImagePath = "/Users/abhinavanand/Desktop/billi/output.png";

const sourceImage = { width: 796, height: 452 };
const subjectBox = { x: 283, y: 124, width: 306, height: 320 };
const targetImage = { width: 452, height: 796 };
const placementPoint = { x: 72, y: 236 };

function calculateCropAndPlacement() {
  const subjectAspectRatio = subjectBox.width / subjectBox.height;

  // Calculate max possible crop dimensions
  const maxCropWidth = Math.min(targetImage.width, sourceImage.width);
  const maxCropHeight = Math.min(targetImage.height, sourceImage.height);

  let cropWidth = maxCropWidth;
  let cropHeight = cropWidth / subjectAspectRatio;

  if (cropHeight > maxCropHeight) {
    cropHeight = maxCropHeight;
    cropWidth = cropHeight * subjectAspectRatio;
  }

  // Center crop around the subject
  const subjectCenterX = subjectBox.x + subjectBox.width / 2;
  const subjectCenterY = subjectBox.y + subjectBox.height / 2;

  let cropX = subjectCenterX - cropWidth / 2;
  let cropY = subjectCenterY - cropHeight / 2;

  // Adjust crop to stay within source bounds
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

  // Adjust placement point based on new crop
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

async function cropSubject(
  sourceImagePath: string,
  cropBox: { x: number; y: number; width: number; height: number }
): Promise<Buffer> {
  const meta = await sharp(sourceImagePath).metadata();

  const adjustedCropBox = {
    left: Math.max(0, cropBox.x),
    top: Math.max(0, cropBox.y),
    width: Math.min(cropBox.width, (meta.width ?? 0) - cropBox.x),
    height: Math.min(cropBox.height, (meta.height ?? 0) - cropBox.y),
  };

  console.log("Adjusted Crop Box:", adjustedCropBox);

  return sharp(sourceImagePath).extract(adjustedCropBox).toBuffer();
}

async function placeSubjectOnExistingTarget(
  sourceImagePath: string,
  targetImagePath: string,
  cropBox: { x: number; y: number; width: number; height: number },
  placementBox: { x: number; y: number; width: number; height: number },
  outputImagePath: string
) {
  const subjectBuffer = await cropSubject(sourceImagePath, cropBox);

  // Resize subject to fit placement box
  const resizedSubject = await sharp(subjectBuffer)
    .resize(placementBox.width, placementBox.height)
    .toBuffer();

  // Composite onto target image
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
