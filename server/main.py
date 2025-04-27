from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from image_service import adjust_image

app = FastAPI()

class Dimensions(BaseModel):
    width: int
    height: int

class BoundingBox(BaseModel):
    x: int
    y: int
    width: int
    height: int

class PlacementPoint(BaseModel):
    x: int
    y: int

class ImageAdjustRequest(BaseModel):
    sourceImagePath: str
    targetImagePath: str
    outputImagePath: str
    sourceImage: Dimensions
    subjectBox: BoundingBox
    targetImage: Dimensions
    placementPoint: PlacementPoint  # <-- Fix here

@app.post("/adjust-image")
async def adjust_image_endpoint(request: ImageAdjustRequest):
    try:
        crop_box, placement_box = adjust_image(
            request.sourceImagePath,
            request.targetImagePath,
            request.outputImagePath,
            request.sourceImage.dict(),
            request.subjectBox.dict(),
            request.targetImage.dict(),
            request.placementPoint.dict()
        )
        return {
            "message": "Image adjusted successfully",
            "cropBox": crop_box,
            "placementBox": placement_box,
            "outputImagePath": request.outputImagePath
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
