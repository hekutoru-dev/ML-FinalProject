import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

from statsmodels.tsa.arima_model import ARIMA
from pandas import datetime

app = Flask(__name__)



#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/eTicket.db"
engine = create_engine(f"sqlite:///db/eTicket.db")
db = SQLAlchemy(app)
session = Session(engine)

def arimaFuntion(M):
    
    # fit model
    model = ARIMA(M, order=(5,1,0))
    model_fit = model.fit(disp=0)
    X = M.values
    size = int(len(X) * 0.70)
    train, test = X[0:size], X[size:len(X)]
    history = [x for x in train]
    predictions = list()
    for t in range(len(test)):
        model = ARIMA(history, order=(5,1,0))
        model_fit = model.fit(disp=0)
        output = model_fit.forecast()
        yhat = output[0]
        predictions.append(yhat)
        obs = test[t]
        history.append(obs)
#        print('predicted=%f, expected=%f' % (yhat, obs))

def parser(x):
	return datetime.strptime('%Y-%m-%D')



@app.route('/')
def index():
    return render_template('dashboard_sales.html')


@app.route('/tobacco_pred', methods=['GET', 'POST'])
def tobacco_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
    
    for X in df['Date']:
        parser(df['Date'][X])
        next

    TOBACCO = cafe_data.loc[cafe_data['Category'] == 'TOBACCO']   
    tobacco_arima=(TOBACCO
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )

    tobacco_pred = arimaFuntion(tobacco_arima)

    print(tobacco_pred)

    return jsonify(tobacco_pred)


@app.route('/food_pred', methods=['GET', 'POST'])
def food_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
    
    for X in df['Date']:
        parser(df['Date'][X])
        next

    FOODS = cafe_data.loc[cafe_data['Category'] == 'FOOD']
    food_arima=(FOODS
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
    
    food_pred = arimaFuntion(food_arima)

    print(food_pred)

    return jsonify(food_pred)

@app.route('/shakes_pred', methods=['GET', 'POST'])
def shakes_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
    
    for X in df['Date']:
        parser(df['Date'][X])
        next

    SHAKES = cafe_data.loc[cafe_data['Category'] == 'SHAKES']
    shakes_arima=(SHAKES
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
   
    shakes_pred = arimaFuntion(shakes_arima)

    print(shakes_pred)

    return jsonify(shakes_pred)

@app.route('/coffee_pred', methods=['GET', 'POST'])
def coffee_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
    
    for X in df['Date']:
        parser(df['Date'][X])
        next


    COFFEE = cafe_data.loc[cafe_data['Category'] == 'COFFEE']
    coffee_arima=(COFFEE
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
    
    coffee_pred = arimaFuntion(coffee_arima)

    print(coffee_pred)

    return jsonify(coffee_pred)

@app.route('/panini_pred', methods=['GET', 'POST'])
def panini_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
    
    for X in df['Date']:
        parser(df['Date'][X])
        next

    
    PANINI = cafe_data.loc[cafe_data['Category'] == 'PANINI']
    panini_arima=(PANINI
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
    
    panini_pred = arimaFuntion(panini_arima)

    print(panini_pred)

    return jsonify(panini_pred)


@app.route('/beer_pred', methods=['GET', 'POST'])
def beer_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
        
    for X in df['Date']:
        parser(df['Date'][X])
        next
    
    BEER = cafe_data.loc[cafe_data['Category'] == 'BEER']
    beer_arima=(BEER
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
        
    beer_pred = arimaFuntion(beer_arima)
    
    print(beer_pred)

    return jsonify(beer_pred)


@app.route('/beverage_pred', methods=['GET', 'POST'])
def beverage_pred():
    # Query all passengers
    Ventas = db.session.query(ventas_db).all()
    df = pd.DataFrame(Ventas)
        
    for X in df['Date']:
        parser(df['Date'][X])
        next
          
    BEVERAGE = cafe_data.loc[cafe_data['Category'] == 'BEVERAGE']
    beverage_arima=(BEVERAGE
                .set_index('Date')
                .loc[:,"Quantity"]
                .resample('D')
                .sum()
    )
    beverage_pred = arimaFuntion(beverage_arima)
    
    print(beverage_pred)

    return jsonify(beverage_pred)

    
    

# RUN main
if __name__ == "__main__":
    app.run()