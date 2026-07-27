from flask import Flask, render_template, Response, jsonify
from flask_cors import CORS
from Camera import Camera
import dotenv
import os
from dotenv import load_dotenv

load_dotenv() # read vars from .env file
STREAM_IP = os.getenv('STREAM_IP')

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# This route returns the streaming response
#TODO this should be an API call 
@app.route('/video-feed')
def video_feed():
    return Response(gen(Camera()), 
                    mimetype='multipart/x-mixed-replace; boundary=frame') 

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "hello world"})


if __name__ == '__main__':
    app.run(host = STREAM_IP, debug=True)