// Graph by Categories

function makeplot() {
  Plotly.d3.csv("../static/res/Top10Sells.csv", function(data){ processData(data) } );
};

function processData(allRows) {
  console.log(allRows); 

  // TAKE DATA
  allRows.forEach(function(d) {
    d.Category = d.Category;    
    
    d.Quantity = +d.Quantity;
    d.Rate_000s = +d.Rate_000s;
    d.Cost_000s = +d.Cost_000s;
    
    d.Total_000s = +d.Total_000s;
    d.Profit = +d.Profit;
  }); // END allRows.forEach()

  // Get Categories and Profits.
  var categories = allRows.map(d => d.Category);
  var profits = allRows.map(d => d.Profit);
  var rates = allRows.map(d => d.Rate_000s);
  var costs = allRows.map(d => d.Cost_000s);
  var totals = allRows.map(d => d.Total_000s);
  console.log(categories);
  console.log(profits);  


  var columns = ['Category', 'Quantity', 'Rate', 'Total', 'Cost', 'Profit'];  
  // CREATE/FILL TABLE.
  var tbody = d3.select('tbody');
  d3.select('td').remove()

  var rows = tbody.selectAll('tr')
                  .data(allRows)
                  .enter()
                  .append('tr')
  
  var cells = rows.selectAll('td').data(function(row) {
    return columns.map(function(column) {
      return {column: column, value: row[column]}
    })
  }).enter()
    .append('td')
    .text(function (d) { return d.value })



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
          //onclick: function (d, i) { console.log("onclick", d, i); },
          //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }      
  }); 

} // END FUNCTION PLOT

// CALL FUNCTION AT INIT.
makeplot();