### Original Image

```
|-------------------|
|                   |
|                   |
|                   |
|                   |
|-------------------|
```

### Identifying Subject

```
|-------------------|
|                   |
|     |-------|     |
|     |Subject|     |
|     |-------|     |
|                   |
|-------------------|
```

## Example #1

### Target Dimension

```
|---------------------------------------|
|                                       |
|                                       |
|                                       |
|                                       |
|                                       |
|---------------------------------------|
```

### Subject Placement Proposal

```
|---------------------------------------|
|                                       |
|                            |-------|  |
|                            |Subject|  |
|                            |-------|  |
|                                       |
|---------------------------------------|
```

### Expected Output

#### Original Image Extraction

- We have to look at the target dimension.
- We have to consider the subject placement x,y coorindate.
- We see that to fit into the target dimension

```
|-------------------|
|[                  |
|     |-------|     |
|     |Subject|     |
|     |-------|     |
|                  ]|
|-------------------|
```

Result Expected:
How much crop dimension is needed from original image which can fit into the target image?

### Target Image Placement

Based on the

```
|---------------------------------------|
|                    [                  |
|                         |-------|     |
|                         |Subject|     |
|                         |-------|     |
|                                      ]|
|---------------------------------------|
```

Result Expected:
What is the inset of the cropped subject in the target image?

## Example #2

### Target Dimension

```
|--------------|
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|--------------|
```

### Subject Placement Proposal

```
|--------------|
|   |-------|  |
|   |Subject|  |
|   |-------|  |
|              |
|              |
|              |
|              |
|              |
|              |
|--------------|
```

## Example #3

### Target Dimension

```
|--------------|
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|              |
|--------------|
```

### Subject Placement Proposal

```
|--------------|
|              |
|              |
|              |
|              |
|              |
|   |-------|  |
|   |Subject|  |
|   |-------|  |
|              |
|--------------|
```

## Example #4

### Target Dimension

```
|---------------------------------------|
|                                       |
|                                       |
|                                       |
|                                       |
|                                       |
|---------------------------------------|
```

### Subject Placement Proposal

```
|---------------------------------------|
|                                       |
|   |-------|                           |
|   |Subject|                           |
|   |-------|                           |
|                                       |
|---------------------------------------|
```

## More feedback

## Inputs

- Source image dimensions (width, height)? **Yes**
- Subject bounding box (x, y, width, height) in the source image? **Yes**
- Target image dimensions (width, height)? **Yes**
- Target placement point (x, y) for subject inside the target image? **Yes**

## Output

- You need the crop area in source image (x, y, width, height)? **Yes**

- And the placement coordinates in the target image (x, y, width, height)? **Yes**

## Constraints:

- Should the subject scale to fit the target image? **No scaling needed. We need to increase the size of crop we do in source image in order to fit in target image. However if source image is lesser in size then don't scale.**

- Or should it retain its original size with extra cropping around it to match the target's available space? **It should retain it's original size with extra cropping around it if needed to fit the target image**

## Aspect Ratio:

Is preserving the aspect ratio of the subject important? **Very important to maintain the aspect ratio. The source subject should not get distorted or resized.**

Or is it okay to stretch the crop region? **Correct. Increase the crop region**

# UI for the implemnet
