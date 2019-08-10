
// READ selection to pass proper data.
/*
function getFavProducts(dataMenu) {
    console.log(dataMenu);
    var dataURL = '';
    switch (dataMenu) {
        case 'beer':
            dataURL = '../static/res/TopBeerSales.csv';
            name = 'Beer';
            break;
        case 'beverage':
            dataURL = '../static/res/TopBeveragesSales.csv';
            name = 'Beverages';
            break;
        case 'coffee':
            dataURL = '../static/res/TopCoffeeSales.csv';
            name = 'Coffee';
            break;
        case 'dessert':
            dataURL = '../static/res/TopDessertSales.csv';
            name = 'Desserts';
            break;
        case 'food':
            dataURL = '../static/res/TopFoodSales.csv';
            name = 'Food';
            break;
        case 'panini':
            dataURL = '../static/res/TopPaniniSales.csv';
            name = 'Panini';
            break;
        case 'shakes':
            dataURL = '../static/res/TopShakesSales.csv';
            name = 'Shakes';
            break;
        case 'tea':
            dataURL = '../static/res/TopTeaSales.csv';
            name = 'Tea';
            break;
        case 'tobacco':
            dataURL = '../static/res/TopTobaccoSales.csv';
            name = 'Tobacco';
            break;
        case 'wines':
            dataURL = '../static/res/TopWinesSales.csv';
            name = 'Wines';
            break;        
        default:
            dataURL = '../static/res/TopWinesSales.csv';
            name = 'Wines';
    }
    // Pass data to update plot.
    return updatePlot(dataURL, name);

} // END function getProductData
*/




// WITH FLASK
// READ selection to pass proper data.
function getFavProducts(dataMenu) {
    console.log(dataMenu);
    
    var dataURL = '';
    switch (dataMenu) {
        case 'BEER':
            dataURL = '../static/res/TopBeerSales.csv';
            name = 'Beer';
            break;
        case 'BEVERAGE':
            dataURL = '../static/res/TopBeveragesSales.csv';
            name = 'Beverages';
            break;
        case 'COFFEE':
            dataURL = '../static/res/TopCoffeeSales.csv';
            name = 'Coffee';
            break;
        case 'DESSERT':
            dataURL = '../static/res/TopDessertSales.csv';
            name = 'Desserts';
            break;
        case 'FOOD':
            dataURL = '../static/res/TopFoodSales.csv';
            name = 'Food';
            break;
        case 'PANINI':
            dataURL = '../static/res/TopPaniniSales.csv';
            name = 'Panini';
            break;
        case 'SHAKES':
            dataURL = '../static/res/TopShakesSales.csv';
            name = 'Shakes';
            break;
        case 'TEA':
            dataURL = '../static/res/TopTeaSales.csv';
            name = 'Tea';
            break;
        case 'TOBACCO':
            dataURL = '../static/res/TopTobaccoSales.csv';
            name = 'Tobacco';
            break;
        case 'WINES':
            dataURL = '../static/res/TopWinesSales.csv';
            name = 'Wines';
            break;        
        default:
            dataURL = '/static/res/TopWinesSales.csv';
            name = 'Wines';
    }
    // Pass data to update plot.
    return updatePlot(dataURL, name);

} // END function getProductData






// UPDATE PLOT FOR TOP 9 ITEM_DISHES_BEVERAGES
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

}; // END function updatePlot(), update plot depending on select option product
