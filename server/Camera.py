from time import time
import cv2
import av
from base_camera import BaseCamera

class Camera(BaseCamera):
    @staticmethod

    # def frames():
    #     #method using pyav
    #     av.logging.set_level(av.logging.VERBOSE)
    #     container = av.open(
    #                     'video=Integrated Camera',
    #                     format='dshow',
    #                     options={'rtbufsize': '512M'}
    #     )

    #     # get frame
    #     for frame in container.decode(video=0): 
    #         yield frame.to_image().tobytes()

    def frames():
        # method using openCV
        camera = cv2.VideoCapture(0)
        if not camera.isOpened():
            raise RuntimeError('Could not start camera')
        
        while True:
            #read current frame
            _, img = camera.read()

            #encode as a jpeg image and return it
            yield cv2.imencode('.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 50])[1].tobytes()