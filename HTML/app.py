from flask import Flask, render_template, redirect, Response
from flask_pymongo import PyMongo
import time
from pymongo import MongoClient
from flask import jsonify

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#connectionString = "mongodb://dbAdmin:Vol8e3v5XLGYrwTK@cluster0-shard-00-00-0dend.mongodb.net:27017,cluster0-shard-00-01-0dend.mongodb.net:27017,cluster0-shard-00-02-0dend.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
#mongo = PyMongo(app, uri="mongodb://panditas:<password>@cluster0-shard-00-00-nngnj.mongodb.net:27017,cluster0-shard-00-01-nngnj.mongodb.net:27017,cluster0-shard-00-02-nngnj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority/ProyectoFinal")
# Route to render index.html template using data from Mongo

connectionString = "mongodb://panditas:panditas2019@cluster0-shard-00-00-nngnj.mongodb.net:27017,cluster0-shard-00-01-nngnj.mongodb.net:27017,cluster0-shard-00-02-nngnj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
dbClient = MongoClient(connectionString)
db = dbClient["ProyectoFinal"]

@app.route("/")
def home():
        
        return render_template("index.html", )

@app.route("/index")
def index():
        
        return render_template("index.html", )

@app.route("/mdash")
def mdash():
        
        # Find one record of data from the mongo database
        
        transformed_data = db.PruebaF.find_one(sort=[("idn",-1)])

        print("hola")

                        
        
        #return render_template("marketing.html", transformed=transformed_data)
        return render_template("marketing.html", transformed=transformed_data)

@app.route("/promo")
def promo():
        
        # Find one record of data from the mongo database
        
        promo = db.Promo.find_one(sort=[("idn",-1)])
                        
        
        #return render_template("marketing.html", transformed=transformed_data)
        return render_template("promo.html", promoimg = promo)

@app.route("/marketing")
def marketing():
        
        ao = db.PruebaF.find_one(sort=[("idn",-1)])
             
        trace = {
                "idn":ao["idn"],
                "age":ao["age"],
                "gender":ao["gender"],
                "fcount":ao["fcount"],
                "mcount":ao["mcount"],
                "h15":ao["h15"],
                "l15":ao["l15"],
                "ager0_11":ao["ager0_11"],
                "ager12_17":ao["ager12_17"],
                "ager18_25":ao["ager18_25"],
                "ager26_35":ao["ager26_35"],
                "ager36_45":ao["ager36_45"],
                "ager56_h":ao["ager56_h"],
                "ager0_11_MH": ao["ager0_11_MH"],
                "ager12_17_MH": ao["ager12_17_MH"],
                "ager18_25_MH": ao["ager18_25_MH"],
                "ager26_35_MH": ao["ager26_35_MH"],
                "ager36_45_MH": ao["ager36_45_MH"],
                "ager46_55_MH": ao["ager46_55_MH"],
                "ager56_h_MH": ao["ager56_h_MH"],
                "ager0_11_ML": ao["ager0_11_ML"],
                "ager12_17_ML": ao["ager12_17_ML"],
                "ager18_25_ML": ao["ager18_25_ML"],
                "ager26_35_ML": ao["ager26_35_ML"],
                "ager36_45_ML": ao["ager36_45_ML"],
                "ager46_55_ML": ao["ager46_55_ML"],
                "ager56_h_ML": ao["ager56_h_ML"],
                "ager0_11_FH": ao["ager0_11_FH"],
                "ager12_17_FH": ao["ager12_17_FH"],
                "ager18_25_FH": ao["ager18_25_FH"],
                "ager26_35_FH": ao["ager26_35_FH"],
                "ager36_45_FH": ao["ager36_45_FH"],
                "ager46_55_FH": ao["ager46_55_FH"],
                "ager56_h_FH": ao["ager56_h_FH"],
                "ager0_11_FL": ao["ager0_11_FL"],
                "ager12_17_FL": ao["ager12_17_FL"],
                "ager18_25_FL": ao["ager18_25_FL"],
                "ager26_35_FL": ao["ager26_35_FL"],
                "ager36_45_FL": ao["ager36_45_FL"],
                "ager46_55_FL": ao["ager46_55_FL"],
                "ager56_h_FL": ao["ager56_h_FL"]
                
        }

        return jsonify(trace)



if __name__ == "__main__":
    app.run(debug=True, threaded=True)
