from flask.ext.googlemaps import GoogleMaps
from flask_googlemaps import Map
import cPickle as pickle
from pymongo import MongoClient
import StringIO


from flask import Flask
from flask import render_template, abort, jsonify, request,redirect, json
app = Flask(__name__)
app.debug = True

landslide_model = pickle.load(open("/home/git/dmine/circ/dmine-circ-ag-api-part5.pkl", "rb"))

@app.route('/')
def index():
    return render_template('joros.html')

@app.route('/gridmet', methods=['POST'])

def make_predict():
    #all kinds of error checking should go here
    data = request.get_json(force=True)
    #convert our json to a numpy array
    predict_request = [data['GEOLOGIC_1'],data['gradient_cat'],data['reacch_soi'],data['LANDSLIDE1'],data['SLOPE_MORP'],data['LAND_USE']]
    predict_request = np.array(predict_request)
    y_hat = landslide_model.predict(predict_request)
    #return our prediction
    output = [y_hat[0]]
    return jsonify(results=output)

if __name__ == '__main__':
    app.run(host='129.101.160.58', port = 5000, debug = True)
