// STYLES ///////////////////////////////////


var defaultStyle3 = new OpenLayers.Style({fillColor: '#0000FF',
fillOpacity: 0.2, strokeWidth: 1.0, strokeColor:  '#0000FF', strokeOpacity: 0.8, pointRadius: 17 });
// label: "${MASTID}", fontColor: "#0000FF", fontSize: "9px", fontFamily: "Arial"  });

var selectStyle3 = new OpenLayers.Style({fillColor: 'blue',
fillOpacity: 0.3, strokeWidth: 2.0, strokeColor:  'red', strokeOpacity: 1, pointRadius: 17});

var hoverStyle3 = new OpenLayers.Style({fillColor: 'green',
fillOpacity: 0.3, strokeWidth: 2.0, strokeColor:  'red', strokeOpacity: 1, pointRadius: 17});

var WFSStyleMap3 = new OpenLayers.StyleMap({
   'default': defaultStyle3,
   'select': selectStyle3,
   'hover':hoverStyle3
});

 var detail_styles = new OpenLayers.StyleMap({
                 "default": new OpenLayers.Style(null, {
                     rules: [
                         new OpenLayers.Rule({
                             symbolizer: {
                                 "Point": {
                                     pointRadius: 5,
                                     graphicName: "square",
                                     fillColor: "white",
                                     fillOpacity: 0.1,
                                     strokeWidth: 1,
                                     strokeOpacity: 1,
                                     strokeColor: "#333333"
                                 },
                                 "Line": {
                                     strokeWidth: 2,
                                     strokeOpacity: 1,
                                     strokeColor: "#000000"
                                 },
                                 "Polygon": {
                                     fillOpacity: 0.4,
                                     fillColor: "#BBBBBB",
                                     strokeWidth: 2,
                                     strokeOpacity: 1,
                                     strokeColor: "#000000"
                                 }
                             }
                         })
                     ]
                 }),
                 "select": new OpenLayers.Style({
                     strokeColor: "#00ccff",
                     strokeWidth: 4,
                     fillColor: "#BBBBBB"
                 })
             });


var style_star =
         {
             pointRadius: 8,
             graphicName: "star",
             strokeColor: "#FF5555",
             strokeOpacity: 1,
             strokeWidth: 2,
             fillColor: "#FF0000",
             fillOpacity: 0.4
         }


var bestaandeLayer_styles = new OpenLayers.StyleMap(
                {
                "default":{
                    strokeColor: "#000000",
                    strokeWidth: 3,
                    fillOpacity: 0.6,
                    rotation: 0,
                    fillColor: "#FFDDDD"
                }, 
                 "select": {
                   strokeColor: "#0A873F",
		     strokeWidth: 4,
		     fillColor: "#E5F0EB",
                    fillOpacity: 0.4
                }
            });

var constructie_styles = new OpenLayers.StyleMap(
                {
                "default":{
                    strokeColor: "#008542",
                    strokeWidth: 3,
                    fillOpacity: 0.6,
                    rotation: 0,
                    fillColor: "#008542"
                }, 
                 "select": {
                    strokeColor: "#FF0000",
                    strokeWidth: 3,
                    fillOpacity: 0.4,
                    rotation: 0,
                    fillColor: "#FFEEEE"
                }
            });

var snijpuntent_styles = new OpenLayers.StyleMap(
                {
                "default":{
                    strokeColor: "#000000",
		   strokeWidth: 4,
		// strokeDashstyle: "dashdot",
		   pointRadius: 12,
		  pointerEvents: "visiblePainted",
		  label: "+",
		  fontColor: "#000000",
		  fillColor: "#FFFF00",
		  fontWeight: "bold",
		  fontSize: "12px",
		  fillOpacity: 1,
 	          strokeOpacity: 1
                }, 
                 "select": {
                    strokeColor: "#FF0000",
                    strokeWidth: 3,
                    fillOpacity: 0.4,
                    rotation: 0,
                    fillColor: "#FFEEEE",
                     pointRadius: 10
                }
            });

var snijpuntent_styles

 var graphic_styles = new OpenLayers.StyleMap(
                {
                "default": {
                    strokeColor: "#555555",
		    pointRadius: 18,
		    strokeColor: "#FF5555",
		    fillOpacity: 0.5,
		    rotation: 0,
		    fillColor: "#FF0000"
                },
                 "select": {
                    pointRadius: 18,
                    strokeColor: "#FF5555",
                    fillOpacity: 0.5,
                    rotation: 0,
                    fillColor: "#FF0000"
                }
            });


  var lookupKENMERK = {
            "POINT:Bouwhoogte/Goothoogte": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", fillOpacity: 0.9, pointRadius: 10,   strokeWidth: 2, strokeColor: "#000", fillColor: "#888888", graphicName: "square"},
            "POINT:Bouwhoogte": {   label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px",   pointRadius: 10,   strokeWidth: 2, strokeColor: "#000", fillColor: "#888888", graphicName: "square"},
            "POINT:Goothoogte": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#000", graphicName: "square"},
            "POINT:Bebouwingsoppervlakte": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#000", graphicName: "triangle"},
            "POINT:Bebouwingspercentage": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#000", graphicName: "square"},
            "POINT:Dakhelling": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#000", graphicName: "x"},
            "POINT:VRAAGTEKEN": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#FF0000", graphicName: "x"},
            "POINT:DISCUSSIE": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10,  strokeColor: "#FF0000", graphicName: "x"},
            "POINT:FOTO": { label: "${HOEVEELHEID}", fontColor: "black", fontWeight: "bold", fontSize: "12px", pointRadius: 10, strokeColor: "#FF0000", 'externalGraphic': '/xml/DevicePhoto.png'},
            "POLYGON:Hoofdbebouwing": { label: "${OPMERKING}", strokeWidth: 2, strokeColor: "#000000", fillColor: "#FF0000",fillOpacity: 0.4},
            "POLYGON:Bijgebouw": { label: "${OPMERKING}", strokeWidth: 2, strokeColor: "#000000", fillColor: "#FF8888",fillOpacity: 0.4,strokeDashstyle: 'longdashdot'},
            "POLYGON:Bouwvlak": { label: "${OPMERKING}", strokeWidth: 2, strokeColor: "#000000", fillColor: "#888888",fillOpacity: 0.4},
            "POLYGON:Veiligheidszone": { label: "${OPMERKING}", strokeWidth: 2, strokeColor: "#000000", fillColor: "#88FF88",fillOpacity: 0.4},
            "POLYGON:VRAAGTEKEN": { label: "${OPMERKING}", strokeWidth: 6, strokeColor: "#000000", fillColor: "#FF0000",fillOpacity: 0.4},
            "POLYGON:DISCUSSIE": { label: "${OPMERKING}", strokeWidth: 6, strokeColor: "#000000", fillColor: "#FF0000",fillOpacity: 0.4},
            "POLYGON:FOTO": { label: "${OPMERKING}",strokeWidth: 6, strokeColor: "#000000", fillColor: "#FF0000",fillOpacity: 0.4},
            "LINESTRING:Voorgevel": { label: "${OPMERKING}",strokeWidth: 4, strokeColor: "#000", strokeDashstyle: 'solid' },
            "LINESTRING:Koppelteken": {label: "${OPMERKING}", strokeWidth: 4, strokeColor: "#225555", strokeDashstyle: 'dot' },
            "LINESTRING:Leiding": { label: "${OPMERKING}",strokeWidth: 4, strokeColor: "#553355", strokeDashstyle: 'dash' },
            "LINESTRING:VRAAGTEKEN": { label: "${OPMERKING}",strokeWidth: 6, fillColor: "#FF0000", strokeColor: "#000000", strokeDashstyle: 'solid' },
            "LINESTRING:DISCUSSIE": { label: "${OPMERKING}",strokeWidth: 6, fillColor: "#FF0000", strokeColor: "#000000", strokeDashstyle: 'solid' },
            "LINESTRING:FOTO": { label: "${OPMERKING}",strokeWidth: 6, fillColor: "#FF0000", strokeColor: "#000000", strokeDashstyle: 'solid' }
        };

 
 var lookupPERCEEL = {
 
 'Agrarisch': 			{fillColor: '#EBF0D2',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Agrarisch met waarden':	{fillColor: '#D2E1A5',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Bedrijf': 			{fillColor: '#B45FD2',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Bedrijventerrein': 		{fillColor: '#C8A0D7',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Bos': 			{fillColor: '#64AA2D',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Centrum': 			{fillColor: '#FFC8BE',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Cultuur en ontspanning': 	{fillColor: '#FF3C83',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Detailhandel': 		{fillColor: '#FFA096',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Dienstverlening':		{fillColor: '#F091BE',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Gemengd': 			{fillColor: '#FFBE87',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Groen': 			{fillColor: '#28C846',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Horeca': 			{fillColor: '#FF7D4E',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Kantoor': 			{fillColor: '#EBC3D7',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Maatschappelijk':	 	{fillColor: '#DC9B78',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Natuur': 			{fillColor: '#83A591',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Overig': 			{fillColor: '#EBE1EB',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Recreatie': 			{fillColor: '#B9D746',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Sport': 			{fillColor: '#83C846',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Tuin': 			{fillColor: '#C8D76E',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Verkeer': 			{fillColor: '#CDCDCD',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Water': 			{fillColor: '#AFCDE1',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Wonen': 			{fillColor: '#FFFF36',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'Woongebied': 			{fillColor: '#FFFFB4',  fillOpacity: 0.5, strokeWidth: 1, strokeColor: '#000000'},
 'VRAAGTEKEN': 			{fillColor: '#FF0000',  fillOpacity: 0.5, strokeWidth: 3, strokeColor: '#000000'}
};

 
    var style_perceel =
         {
             pointRadius: 8,
             graphicName: "circle",
             strokeColor: "#000000",
            strokeOpacity: 1,
             strokeWidth: 2,
             fillColor: "#FF0000",
             fillOpacity: 0.4
         };

  // STYLES ///////////////////////////////////
  
  var Projectstyles = new OpenLayers.StyleMap({
                    "default": new OpenLayers.Style(null, {
                        rules: [
                            new OpenLayers.Rule({
                                symbolizer: {
                                    "Polygon": {
                                        strokeColor: "#000000",
  				      strokeWidth: 3,
  				      fillColor: "#FFFFFF",
                                        fillOpacity: 0.0 
                                    }
                                }
                            })
                        ]
                    }),
                    "select": new OpenLayers.Style({
                       strokeColor: "#0A873F",
  		     strokeWidth: 5,
  		     fillColor: "#E5F0EB",
                      fillOpacity: 0.7
                    })
    
            });
            
  var styles = new OpenLayers.StyleMap({
                  "default": new OpenLayers.Style(null, {
                      rules: [
                          new OpenLayers.Rule({
                              symbolizer: {
                                  "Point": {
                                      pointRadius: 5,
                                      graphicName: "square",
                                      fillColor: "white",
                                      fillOpacity: 0.1,
                                      strokeWidth: 1,
                                      strokeOpacity: 1,
                                      strokeColor: "#333333"
                                  },
                                  "Line": {
                                      strokeWidth: 2,
                                      strokeOpacity: 1,
                                      strokeColor: "#0000FF"
                                  },
                                  "Polygon": {
                                      strokeColor: "#0A873F",
				      strokeWidth: 3,
				      fillColor: "#E5F0EB",
                                      fillOpacity: 0.5 
                                  }
                              }
                          })
                      ]
                  }),
                  "select": new OpenLayers.Style({
                     strokeColor: "#0A873F",
		     strokeWidth: 5,
		     fillColor: "#E5F0EB",
                    fillOpacity: 0.7
                  })
  
            });
            
 var defaultStyle1 = new OpenLayers.Style({fillColor: '#FFFFFF',
 fillOpacity: 0.7, strokeWidth: 2.0, strokeColor:  '#FF0000', strokeOpacity: 0.7, pointRadius: 5 });

var selectStyle1 = new OpenLayers.Style({fillColor: 'blue',
fillOpacity: 0.3, strokeWidth: 4.0, strokeColor:  '#FF6666', strokeOpacity: 1, pointRadius: 8});

 var WFSStyleMap1 = new OpenLayers.StyleMap({
    'default': defaultStyle1,
    'select': selectStyle1
});

 var defaultStyle2 = new OpenLayers.Style({fillColor: '#FFFFFF',
 fillOpacity: 0.05, strokeWidth: 2.0, strokeColor:  '#0000FF', strokeOpacity: 0.5, pointRadius: 5 });

var selectStyle2 = new OpenLayers.Style({fillColor: 'blue',
fillOpacity: 0.3, strokeWidth: 1.0, strokeColor:  'red', strokeOpacity: 1, pointRadius: 8});

 var WFSStyleMap2 = new OpenLayers.StyleMap({
    'default': defaultStyle2,
    'select': selectStyle2
});            
