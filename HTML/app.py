#Import Maribel
from flask import Flask, render_template, redirect, Response
from flask_pymongo import PyMongo
import time
from pymongo import MongoClient
from flask import jsonify

#Extras Hector
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask_sqlalchemy import SQLAlchemy

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
#connectionString = "mongodb://dbAdmin:Vol8e3v5XLGYrwTK@cluster0-shard-00-00-0dend.mongodb.net:27017,cluster0-shard-00-01-0dend.mongodb.net:27017,cluster0-shard-00-02-0dend.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
#mongo = PyMongo(app, uri="mongodb://panditas:<password>@cluster0-shard-00-00-nngnj.mongodb.net:27017,cluster0-shard-00-01-nngnj.mongodb.net:27017,cluster0-shard-00-02-nngnj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority/ProyectoFinal")
# Route to render index.html template using data from Mongo


#################################################
# Database Setup Maribel
#################################################
connectionString = "mongodb://panditas:panditas2019@cluster0-shard-00-00-nngnj.mongodb.net:27017,cluster0-shard-00-01-nngnj.mongodb.net:27017,cluster0-shard-00-02-nngnj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
dbClient = MongoClient(connectionString)
db = dbClient["ProyectoFinal"]

#################################################
# Database Setup Hector
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/cafe_sales.sqlite"
engine = create_engine(f"sqlite:///db/cafe_sales.sqlite")
db2 = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db2.engine, reflect=True)

# Save references to each table
Category = Base.classes.category
Beer = Base.classes.beer
Beverages = Base.classes.beverages
Coffee = Base.classes.coffee
Dessert = Base.classes.dessert
Food = Base.classes.food
Panini = Base.classes.panini
Shakes = Base.classes.shakes
Tea = Base.classes.tea
Tobacco = Base.classes.tobacco
Wine = Base.classes.wines

session = Session(engine)

#################################################
# Routes
#################################################
#Index
@app.route("/")
def home():
        
        return render_template("index.html", )

@app.route("/index")
def index():
        
        return render_template("index.html", )

#Maribel
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
#Fin Maribel

#Héctor
@app.route('/dsales')
def sales():
    return render_template('dashboard_sales.html')


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    #stmt = db2.session.query(Category.Category).statement
    #df = pd.read_sql_query(stmt, db2.session.bind)

    results = session.query(Category.Category).all()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

    # Return a list of the column names (sample names)
    #return jsonify(list(df.columns)[1:])


@app.route('/metadata/<category>')
def product_metadata(category):
    # Return Metada
    sel = [
        Category.Category,
        Category.Quantity,
        Category.Rate_000s,
        Category.Tax_000s,
        Category.Total_000s,
        Category.Cost_000s,
        Category.Profit,
    ]

    results = db2.session.query(*sel).filter(Category.Category == category).all()

    category_metadata = {}
    for result in results:
        category_metadata['Category'] = result[0]
        category_metadata['Quantity'] = result[1]
        category_metadata['Rate_000s'] = result[2]
        category_metadata['Tax_000s'] = result[3]
        category_metadata['Total_000s'] = result[4]
        category_metadata['Cost_000s'] = result[5]
        category_metadata['Profit'] = result[6]

    print(category_metadata)
    
    return jsonify(category_metadata)

# NEW ADDED
@app.route('/category/<category>')
def product_category(category):
    print ('Category is:' + category)    

    Table = Beer
    if category == 'BEER':
        Table = Beer
    elif category == 'BEVERAGES':
        Table = Beverages
    elif category == 'COFFEE':
        Table = Coffee
    elif category == 'DESSERT':
        Table = Dessert
    elif category == 'FOOD':
        Table = Food
    elif category == 'PANINI':
        Table = Panini
    elif category == 'SHAKES':
        Table = Shakes
    elif category == 'TEA':
        Table = Tea
    elif category == 'TOBACCO':
        Table = Tobacco
    elif category == 'WINES':
        Table = Wine
    

    # CHECK
    '''
    sel = [
        Table.product,
        Table.quantity,
    ]

    results = db2.session.query(*sel).filter(Table.product == category).all()
    results2 = db2.session.query(*sel).filter(Table.quantity == category).all()

    product_data = {}
    for result in results:
        product_data['product'] = result[0]
        product_data['quantity'] = result[1]
    '''

    #
    stmt = db2.session.query(Table).statement
    df = pd.read_sql_query(stmt, db2.session.bind)
    

    #product_data = df.loc[df[category],['product', 'quantity', category]]
    #results = db2.session.query(*sel).filter(Category.Category == category).all()

    data = {
        #'product': df.product.values.tolist(),
        #'quantity': df.quantity.values.tolist(),
        'product': df['product'].tolist(),
        'quantity': df['quantity'].tolist(),
    }

    print(jsonify(data))

    return jsonify(data)

@app.route('/team')
def team_page():
    return render_template('team.html')

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
