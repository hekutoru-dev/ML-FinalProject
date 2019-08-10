// Part 1

console.log("hola")
function buildPlot() {
url = "/marketing"
d3.json(url).then(function(response) {
  //create variables
  idn = response.idn;
  idn2= idn-40;

  //Just gender
  ager0_11 = response.ager0_11;
  ager12_17 = response.ager12_17;
  ager18_25 = response.ager18_25;
  ager26_35 = response.ager26_35;
  ager36_45 = response.ager36_45;
  ager46_55 = response.ager46_55;
  ager56_65 = response.ager56_65;

  //Variables demográficas por edad género e impacto 
    //Hombre
  ager0_11_MH = response.ager0_11_MH;
  ager12_17_MH = response.ager12_17_MH;
  ager18_25_MH = response.ager18_25_MH;
  ager26_35_MH = response.ager26_35_MH;
  ager36_45_MH = response.ager36_45_MH;
  ager46_55_MH = response.ager46_55_MH;
  ager56_h_MH = response.ager56_h_MH;
  
  ager0_11_ML = response.ager0_11_ML;
  ager12_17_ML = response.ager12_17_ML;
  ager18_25_ML = response.ager18_25_ML;
  ager26_35_ML = response.ager26_35_ML;
  ager36_45_ML = response.ager36_45_ML;
  ager46_55_ML = response.ager46_55_ML;
  ager56_h_ML = response.ager56_h_ML;
  
  //Mujer
  ager0_11_FH = response.ager0_11_FH;
  ager12_17_FH = response.ager12_17_FH;
  ager18_25_FH = response.ager18_25_FH;
  ager26_35_FH = response.ager26_35_FH;
  ager36_45_FH = response.ager36_45_FH;
  ager46_55_FH = response.ager46_55_FH;
  ager56_h_FH = response.ager56_h_FH;
  
  ager0_11_FL = response.ager0_11_FL;
  ager12_17_FL = response.ager12_17_FL;
  ager18_25_FL = response.ager18_25_FL;
  ager26_35_FL = response.ager26_35_FL;
  ager36_45_FL = response.ager36_45_FL;
  ager46_55_FL = response.ager46_55_FL;
  ager56_h_FL = response.ager56_h_FL;

  console.log(idn)




var trace1 = {
  y: ["0-11", "12-17", "18-25", "26-35",
      "36-45", "46-55", ">55"],
  x: [ager0_11, ager12_17, ager18_25, ager26_35, ager36_45, ager46_55, ager56_65],
  type: "bar",
  orientation: 'h'
};

var data = [trace1];

var layout = {
  title: "'Counts per Age"
};

Plotly.newPlot("plot", data, layout);


// // Part 2 - Adding attributes
var hombre2 = {
  y: ["0-11", "12-17", "18-25", "26-35",
  "36-45", "46-55", ">55"],
  x: [ager0_11_MH+ager0_11_ML, ager12_17_MH+ager12_17_ML, ager18_25_MH+ager18_25_ML, ager26_35_MH+ager26_35_ML,
     ager36_45_MH+ager36_45_ML, ager46_55_MH+ager46_55_ML, ager56_h_MH+ager56_h_ML],
  type: "bar",
  orientation: 'h',
  name: 'MenL'
};

var mujer2 = {
 y: ["0-11", "12-17", "18-25", "26-35",
     "36-45", "46-55", ">55"],
 x: [-(ager0_11_FH+ager0_11_FL), -(ager12_17_FH+ager12_17_FL), -(ager18_25_FH+ager18_25_FL), -(ager26_35_FH+ager26_35_FL), 
  -(ager36_45_FH+ager36_45_FL), -(ager46_55_FH+ager46_55_FL), -(ager56_h_FH+ager56_h_FL)],
 type: "bar",
 orientation: 'h',
 name: 'WomanL'
};

var mujer1 = {
  y: ["0-11", "12-17", "18-25", "26-35",
      "36-45", "46-55", ">55"],
  x: [-(ager0_11_FH), -(ager12_17_FH), -(ager18_25_FH), -(ager26_35_FH), -(ager36_45_FH), -(ager46_55_FH), -(ager56_h_FH)],
  type: "bar",
  orientation: 'h',
  name: 'WomanH'
};


 var hombre1 = {
   y: ["0-11", "12-17", "18-25", "26-35",
   "36-45", "46-55", ">55"],
   x: [ager0_11_MH, ager12_17_MH, ager18_25_MH, ager26_35_MH, ager36_45_MH, ager46_55_MH, ager56_h_MH],
   type: "bar",
   orientation: 'h',
   name: 'MenH'
 };

 

 var data = [hombre2, mujer2, hombre1, mujer1];

 var layout = {
   title: "Marketing Impact per Genger-Age",
   xaxis: { title: "No. of People",
   range: [-40, 40],
   tickvals: [-30, -20, -10, 0, 10, 20, 30],
   ticktext: [30, 20, 10, 0, 10, 20, 30]},
   barmode: 'overlay',
   bargap: 0.1,
  
 };

 Plotly.newPlot("plot2", data, layout);


// // Part 3 - gauge-line
var data = [{
  type: "indicator", mode: "number+gauge+delta", gauge: {shape: "bullet"}, 
  delta: {reference: 30}, value:idn2, domain: {x: [0, 1], y: [0, 1]}, 
  title: {text: "Total"}}];

var layout = {
  title: "Total People vs. Previus Hour",
  width: 600, 
  height: 250
};
Plotly.newPlot(gd,data,layout);
});
}

buildPlot();
