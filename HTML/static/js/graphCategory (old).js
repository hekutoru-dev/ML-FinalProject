// Graph by Categories

function makeplot() {
  Plotly.d3.csv("../static/res/Top10Sells.csv", function(data){ processData(data) } );
};

function processData(allRows) {
  console.log(allRows);  

  allRows.forEach(function(d) {
    d.Category = d.Category;
    d.Profit = +d.Profit;    
  });

  // Get Categories and Profits.
  var categories = allRows.map(d => d.Category);
  var profits = allRows.map(d => d.Profit);
  console.log(categories);
  console.log(profits);

  // PLOTLY PIECHART
/*
  var data = [{
    values: profits,
    labels: categories,
    type: 'pie'
  }];

  var layout = {    
    height: 400,
    width: 400,
    showlegend: false    
  };

  Plotly.newPlot('chartProfits', data, layout);   */

    var chart = c3.generate({      
      bindto: '#chartProfits',
      data: {
          // iris data from R          
          columns: [
              [categories[0], profits[0]],
              [categories[1], profits[1]],
              [categories[2], profits[2]],
              [categories[3], profits[3]],
              [categories[4], profits[4]],
              [categories[5], profits[5]],
              [categories[6], profits[6]],
              [categories[7], profits[7]],
              [categories[8], profits[8]],
              [categories[9], profits[9]],              
          ],
          type : 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }      
  });
  
/*
  setTimeout(function () {
    chart.load({
        columns: [
            ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
            ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
            ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
        ]
    });
  }, 1500);
  

  setTimeout(function () {
    chart.unload({
        ids: 'data1'
    });
    chart.unload({
        ids: 'data2'
    });
  }, 2500);
  */

} // END FUNCTION PLOT

// CALL FUNCTION AT INIT.
makeplot();