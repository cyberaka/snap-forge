from PIL import Image

def adjust_image(source_path, target_path, output_path, source_img, subject_box, target_img, placement_point):
    # Calculate crop box
    crop_box = calculate_crop_box(source_img, subject_box, target_img)
    # Open images
    source_img_obj = Image.open(source_path)
    target_img_obj = Image.open(target_path)

    # Crop and paste
    cropped_subject = source_img_obj.crop((
        crop_box['x'],
        crop_box['y'],
        crop_box['x'] + crop_box['width'],
        crop_box['y'] + crop_box['height']
    ))
    # Adjust placement
    offset_x = subject_box['x'] - crop_box['x']
    offset_y = subject_box['y'] - crop_box['y']
    placement_box = {
        "x": placement_point['x'] - offset_x,
        "y": placement_point['y'] - offset_y,
        "width": crop_box['width'],
        "height": crop_box['height']
    }
    target_img_obj.paste(cropped_subject, (placement_box['x'], placement_box['y']))
    target_img_obj.save(output_path)

    return crop_box, placement_box

def calculate_crop_box(source_img, subject_box, target_img):
    subject_aspect = subject_box['width'] / subject_box['height']
    max_crop_width = min(target_img['width'], source_img['width'])
    max_crop_height = min(target_img['height'], source_img['height'])

    crop_width = max_crop_width
    crop_height = crop_width / subject_aspect
    if crop_height > max_crop_height:
        crop_height = max_crop_height
        crop_width = crop_height * subject_aspect

    subject_center_x = subject_box['x'] + subject_box['width'] / 2
    subject_center_y = subject_box['y'] + subject_box['height'] / 2
    crop_x = max(0, subject_center_x - crop_width / 2)
    crop_y = max(0, subject_center_y - crop_height / 2)

    # Stay within bounds
    if crop_x + crop_width > source_img['width']:
        crop_x = source_img['width'] - crop_width
    if crop_y + crop_height > source_img['height']:
        crop_y = source_img['height'] - crop_height

    return {
        "x": int(crop_x),
        "y": int(crop_y),
        "width": int(crop_width),
        "height": int(crop_height)
    }
