// initialize map when page ready
var map;

var val_naam = "Crotec OSM_STEENBERGEN";
var val_url = "http://213.206.232.110/tilecache/tilecache.cgi?";
var val_layers = "CROTEC_OSM_STEENBERGEN";
var val_format = "image/png";

var val_naam2 = "Ondergrond";
var val_url2= "http://wms.ropubliceer.nl/geoserver/wms?";
var val_layers2 = "Kempen_ondergrond,crotec:brt_2009_gen";
var val_format2 = "image/png";

// Get rid of address bar on iphone/ipod
var fixSize = function() {
    window.scrollTo(0,0);
    document.body.style.height = '100%';
    if (!(/(iphone|ipod)/.test(navigator.userAgent.toLowerCase()))) {
        if (document.body.parentNode) {
            document.body.parentNode.style.height = '100%';
        }
    }
};
setTimeout(fixSize, 700);
setTimeout(fixSize, 1500);



            
var init = function () {
    // create map
    map = new OpenLayers.Map({
        div: "map",

          maxResolution: 'auto',
	  allOverlays: true,
	  projection: new OpenLayers.Projection("EPSG:28992"),
	  units: 'm',
	 'resolutions':[2048,1024,512,256,128,64,32,16,8,4,2,1,0.5,0.25,0.125,0.0625, 0.03125, 0.015625],
	  'maxExtent':new OpenLayers.Bounds(0,300000,300000,650000),

        theme: null,
        controls: [
            
        ],
        layers: [
        
        new OpenLayers.Layer.WMS(
	  val_naam, val_url,
	  {layers: val_layers,
	  "FORMAT": val_format,
	  transparent:false},
	  {transitionEffect: "resize",
	  'buffer': 0}
	  ),
	
	 new OpenLayers.Layer.WMS(
		  val_naam2, val_url2,
		  {layers: val_layers2,
		  "FORMAT": val_format2,
		  transparent:true},
		  {transitionEffect: "resize",
		  'buffer': 0}
		  ),
	

        ],
        center: new OpenLayers.LonLat(149950, 374167),
        zoom: 10
    });


	var uagent= navigator.userAgent.toLowerCase();
	if( uagent.search("applewebkit") > -1 )
	{
	// geen Zoombar nodig
	
	map.addControl( new OpenLayers.Control.TouchNavigation({
	dragPanOptions: {
	interval: 100,
	enableKinetic: true
	}
	}) );
	
	
       //	  map.addControl( );
	}
	else
	{
	  map.addControl(new OpenLayers.Control.Navigation());
	
	  map.addControl( new OpenLayers.Control.ScaleLine( {bottomOutUnits: "",maxWidth:100}) );

	  
	}
            


};
