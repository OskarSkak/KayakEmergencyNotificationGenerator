# app.py - a minimal flask api using flask_restful
from flask import Flask
from flask import jsonify
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class getContent(Resource):
    def get(self):
        data = [
            {'id': '1' , "title": 'gps1' ,  'route': 'gps',},
             {'id': '2' , "title": 'GyroScope' ,  'route': 'gyro',}
            ]
        return jsonify(data)

api.add_resource(getContent, '/')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')