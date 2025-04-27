import sharp from "sharp";

// Input parameters
const sourceImagePath = "/Users/abhinavanand/Desktop/billi/source.png";
const targetImagePath = "/Users/abhinavanand/Desktop/billi/target.png";
const outputImagePath = "/Users/abhinavanand/Desktop/billi/output.png";

const sourceImage = { width: 796, height: 452 };
const subjectBox = { x: 283, y: 124, width: 306, height: 320 };
const targetImage = { width: 452, height: 796 };
const placementPoint = { x: 72, y: 236 };

// Example of calculatePlacement result (replace with dynamic output)
const cropBox = { x: 265, y: 104, width: 350, height: 350 }; // Example result
const placementBox = {
  x: placementPoint.x,
  y: placementPoint.y,
  width: subjectBox.width,
  height: subjectBox.height,
};

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

  // Resize subject if needed (to fit placement box)
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

placeSubjectOnExistingTarget(
  sourceImagePath,
  targetImagePath,
  cropBox,
  placementBox,
  outputImagePath
);
