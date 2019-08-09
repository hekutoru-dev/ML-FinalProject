//d3.event.preventDefault()


// Profit by Category of selling products. // ORIGINAL
function buildProfit() {
    console.log('BUILD PROFIT FUNCTION');

    d3.json('/metadata').then(function(response) {
        console.log('READ RESPONSE');

        d3.select('#graphics').html('');
        Object.entries(data).forEach(([key, value]) => {
            // 1
            metadata.append('div').text(`${key}: ${value}`); 
            // 2
            //d3.select("#sample-metadata").append().text(`${key}: ${value}`);       
          });
    }); // END read Categoty Data
}; // END buildProfit()



// WITH FLASK
// READ selection to pass proper data.
function getFavProducts(category) {
  console.log('SELECTED: ' + category);  

  // READ AMOUNT, TOTALS, COST & PROFITS FOR PRODUCTS
  d3.json(`/metadata/${category}`).then(function(response){
    
    // Use d3 to select the panel with id for each value.
    var rate = d3.select('#total-rate');
    var cost = d3.select('#total-cost');
    var quantity = d3.select('#total-products');
    var profit = d3.select('#total-profit');

    // Use `.html("") to clear any existing metadata
    d3.select('#total-rate').html('');
    d3.select('#total-cost').html('');
    d3.select('#total-products').html('');
    d3.select('#total-profit').html('');

    // Update Sales Fields
    rate.text('$ ' + response.Rate_000s);
    cost.text('$ ' +  parseFloat(response.Cost_000s).toFixed(6));
    quantity.text(response.Quantity);
    profit.text('$ ' +  parseFloat(response.Profit).toFixed(6));
  }); // END: READ AMOUNT, TOTALS, COST & PROFITS FOR PRODUCTS


  // READ DB FOR TOP 10 PRODUCTS PER CATEGORY.
  d3.json(`/category/${category}`).then(function(response){
    console.log('WHERE EVER YOU GO');
    console.log(response)

    var product = response.product
    var quantity = response.quantity

    // START PLOT
    var chart = c3.generate({
      bindto: '#graphic_bars',            
      data: {
          columns: [
              [product[0], quantity[0]],
              [product[1], quantity[1]],
              [product[2], quantity[2]],
              [product[3], quantity[3]],
              [product[4], quantity[4]],
              [product[5], quantity[5]],
              [product[6], quantity[6]],
              [product[7], quantity[7]],
              [product[8], quantity[8]],                    
          ],
          type: 'bar'
      },
      bar: {
          width: {
              ratio: 0.9 // this makes bar width ratio% of length between ticks
          } // or width: 100 // this makes bar width 100px
      }
      /*axis: {
          x: {
              show: true,
              padding: 2,                    
          }
      }*/
  }); // END C3 generate plot

  }); // END d3.json: READ DB FOR TOP 10 PRODUCTS PER CATEGORY.





      //var items = menuData.map(item => item.Item);
      //var totals = menuData.map(total => total.Total);

  // Pass data to update plot.
  //return updatePlot(dataURL, name);


  // COMMENTED TEST
  //updatePlot(dataURL, name);



} // END function getProductData




// ==========================================================================================
// ================================= BAR CHARTS =============================================
// UPDATE PLOT FOR TOP 9 ITEM_DISHES_BEVERAGES: BAR CHARTS
function updatePlot (dataURL, name) {
  console.log(dataURL);

  d3.csv(dataURL, function(error, menuData) {

      console.log("THIS IS " + menuData);
      
      // Get Data
      var items = menuData.map(item => item.Item);
      var totals = menuData.map(total => total.Total);
      //console.log(items);
      //console.log(totals);

      var total_profit = d3.select('#total-products');
      var sum_products = 0;
      for (i=0; i < totals.length; i++) {            
          sum_products += parseInt(totals[i]);
      }
      total_profit.text(sum_products);

      // START PLOT
      var chart = c3.generate({
          bindto: '#graphic_bars',            
          data: {
              columns: [
                  [items[0], totals[0]],
                  [items[1], totals[1]],
                  [items[2], totals[2]],
                  [items[3], totals[3]],
                  [items[4], totals[4]],
                  [items[5], totals[5]],
                  [items[6], totals[6]],
                  [items[7], totals[7]],
                  [items[8], totals[8]],                    
              ],
              type: 'bar'
          },
          bar: {
              width: {
                  ratio: 0.9 // this makes bar width ratio% of length between ticks
              } // or width: 100 // this makes bar width 100px
          }
          /*axis: {
              x: {
                  show: true,
                  padding: 2,                    
              }
          }*/
      }); // END C3 generate plot

  }); // END D3 get data.

}; // END function updatePlot(), update plot depending on select option product: BAR CHARTS




// ==========================================================================================
// ================================= INIT FUNCTION ==========================================
// Start App.
function init() {
    // Grab a reference to the dropdown select element
    console.log('INIT FUNCTION');
    var selector = d3.select('#selMenu');
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {

      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);

      }); // END sampleNames.forEach
    }); // END d3.json()

  }; // ================================= END INIT FUNCTION =================================



// ==========================================================================================
// ================================== Initialize Dashboard ==================================
init();