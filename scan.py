import cv2
from pyzbar.pyzbar import decode
import requests


def BarcodeReader(image):
    img = cv2.imread(image)
    detectedBarcodes = decode(img)

    if not detectedBarcodes:
        print("Barcode Not Detected or your barcode is blank/corrupted!")
    else:
        for barcode in detectedBarcodes:
            (x, y, w, h) = barcode.rect
            cv2.rectangle(
                img, (x - 10, y - 10), (x + w + 10, y + h + 10), (255, 0, 0), 2
            )
            return barcode.data


if __name__ == "__main__":
    image = "barcode.png"
    stu_id = str(BarcodeReader(image))[2:-1]
    url = "http://localhost:8888/" + stu_id
    response = requests.post(url)
    print("Student ID: " + stu_id)
    print(response.text)
