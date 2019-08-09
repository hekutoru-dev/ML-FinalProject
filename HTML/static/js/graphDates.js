
// READ selection to pass proper data.
function getProductData(dataMenu) {
    var dataURL = '';
    switch (dataMenu) {
        case 'beer':
            dataURL = '../static/res/BeerDates.csv';
            name = 'Beer';
            break;
        case 'beverage':
            dataURL = '../static/res/BeverageDates.csv';
            name = 'Beverages';
            break;
        case 'coffee':
            dataURL = '../static/res/CoffeeDates.csv';
            name = 'Cofee';
            break;
        case 'dessert':
            dataURL = '../static/res/DessertDates.csv';
            name = 'Desserts';
            break;
        case 'food':
            dataURL = '../static/res/FoodDates.csv';
            name = 'Food';
            break;
        case 'panini':
            dataURL = '../static/res/PaniniDates.csv';
            name = 'Panini';
            break;
        case 'shakes':
            dataURL = '../static/res/ShakesDates.csv';
            name = 'Shakes';
            break;
        case 'tea':
            dataURL = '../static/res/TeaDates.csv';
            name = 'Tea';
            break;
        case 'tobacco':
            dataURL = '../static/res/TobaccoDates.csv';
            name = 'Tobacco';
            break;
        case 'wines':
            dataURL = '../static/res/WineDates.csv';
            name = 'Wines';
            break;        
        default:
            dataURL = '../static/res/CoffeeDates.csv';
            name = 'Coffee';
    }
    // Pass data to update plot.
    return updatePlot(dataURL, name);

} // END function getProductData



// UPDATE PLOT FOR TOP 20 ITEM_DISHES_BEVERAGES
function updatePlot (dataURL, name) {
    
    d3.csv(dataURL, function(error, response) {    

        // Get Categories and Profits.
        //var categories = response.map(d => d.Category);
        
        var dates = response.map(d => d.Date);
        var profits = response.map(d => d.Profits);    
        //console.log(categories);
        console.log(dates);
        console.log(profits);

        //console.log(response);
        // svg container
        var svgHeight = 400;
        var svgWidth = 1000;

        // margins
        var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
        };

        // chart area minus margins
        var chartHeight = svgHeight - margin.top - margin.bottom;
        var chartWidth = svgWidth - margin.left - margin.right;

        // create svg container
        var svg = d3.select("#svg-area").append("svg")
                    .attr("height", svgHeight)
                    .attr("width", svgWidth);

        // shift everything over by the margins
        var chartGroup = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);


        // START TESTING
        var years = d3.nest()
            .key(d => d.Date)
            .entries(response)
            .reverse();
            

        //console.log(years)
        
        var cellSize = 15
        var yearHeight = cellSize * 7 + 25
        var formatDay = d => ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][d.getUTCDay()]
        var countDay = d => d.getUTCDay()
        var timeWeek = d3.utcSunday

        var year = chartGroup.selectAll('g')
            .data(years)
            .append('g')
            .attr('transform', (d, i) => `translate(40, ${yearHeight * i + cellSize * 1.5})`);
            
        
        year.append('text')
            .attr('x', -5)
            .attr('y', -30)
            .attr("text-anchor", "end")
            .attr('font-size', 16)
            .attr('font-weight', 550)
            .attr('transform', 'rotate(270)')
            .text(d => d.key);
        
        year.append('g')
            .attr('text-anchor', 'end')
            .selectAll('text')
            .data(d3.range(7).map(i => new Date(1999, 0, i)))
            .append('text')
            .attr('x', -5)
            .attr('y', d => (countDay(d) + 0.5) * cellSize)
            .attr('dy', '0.31em')
            .text(formatDay);

        year.append('g')
            .selectAll('rect')
            .data(d => d.Profits)
            .append('rect')
            .attr("width", cellSize - 1.5)
            .attr("height", cellSize - 1.5)
            .attr("x", (d, i) => timeWeek.count(d3.utcYear(d.Date), d.Date) * cellSize + 10)
            .attr("y", d => countDay(d.Date) * cellSize + 0.5)
    });
} // END updatePlot()


