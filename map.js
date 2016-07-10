	//OpenLayers.ProxyHost= 'proxy.cgi?url=';
    var map, drawControls, selectControl, selectedFeature, markers;
	var setting_default_namen = "topp:zorgvlied_fotos";
	var settings_default_wmsserver = "https://geoweb.amstelveen.nl/geoserver/topp/wms";
    var settings_default_wfsserver = "https://geoweb.amstelveen.nl/geoserver/wfs";
	var pad_fotos = "http://bp.amstelveen.nl/geoservices/zorgvlied/blobs/zorgvlied_graven/";
	var selectieLayer;
	var select_object_control;
	var zoekLayer;
	var selectie_styles;
	var selectiePopup;
	
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

    
	function init() {
        OpenLayers.ProxyHost = 'proxy.asp?url=';
		var fromProjection = new OpenLayers.Projection("EPSG:28992");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
		var position = new OpenLayers.LonLat(121810 ,483213).transform( fromProjection, toProjection);
		var zoom = 4;
        
        var layerPanel = new OpenLayers.Control.Panel({
            displayClass: "layerPanel",
            autoActivate: true
        });
        
                
        map = new OpenLayers.Map('map',
        {
			controls:[
            layerPanel,
			new OpenLayers.Control.LoadingPanel()
      //new OpenLayers.Control.PanZoomBar({})
			//new OpenLayers.Control.Navigation(),
			//new OpenLayers.Control.PanPanel()
			//new OpenLayers.Control.MousePosition(),
			//new OpenLayers.Control.OverviewMap(),
			//new OpenLayers.Control.ZoomPanel()            
			],
			maxExtent:new OpenLayers.Bounds(111488.109, 473003.562, 122160.438, 483443.469),
            projection: "EPSG:28992",
           	numZoomLevels: 10,
            maxResolution:13.28431396484384,
            units: 'm'
        });
        
         var topo = new OpenLayers.Layer.WMS(
            'Topo-Kaart',
            "https://geoweb.amstelveen.nl/geoserver/topp/wms",
            {layers:'BGT',
            transparent:true},
            {isBaseLayer:true,
            opacity: 0.8,
            buffer:0}
        );
            
        map.addLayer(topo);    
		//map.addControl( new OpenLayers.Control.LoadingPanel());
		laag_lufo = new OpenLayers.Layer.WMS("https://geoweb.amstelveen.nl/geoserver/topp/wms?", {
			layers : "Lufo_AA",
			"format" : "image/jpeg",
			transparent : false
			}, 
			{
			transitionEffect : "resize",
			'buffer' : 0,
			visibility : true,
			isBaseLayer : true,
			attribution : "Luchtfoto",
			numZoomLevels: 6
		});

		map.addLayer(laag_lufo);
        
        
        
    var topo_zorgvlied = new OpenLayers.Layer.WMS(
        'Zorgvlied Topo-Kaart',
        "https://geoweb.amstelveen.nl/geoserver/topp/wms?",
        {layers:'Zorgvlied',
        transparent:true},
        {isBaseLayer:false,
	       opacity:0.9,
        buffer:0}
        );
    map.addLayer(topo_zorgvlied);
        
		var fotos = new OpenLayers.Layer.WMS(
            'fotos',
            "https://geoweb.amstelveen.nl/geoserver/topp/wms?",
            {layers:'topp:zorgvlied_fotos',
            transparent:true},
            {isBaseLayer:false,
            opacity:0.9,
            buffer:0}
            );
    map.addLayer(fotos);
        
    //basemap buttons
    var mapButton = new OpenLayers.Control({
        type: OpenLayers.Control.TYPE_TOOL,
        displayClass: "mapButton",
        eventListeners: {
            activate: function() {
                if (topo) 
                {
                    map.setBaseLayer(topo);
                    $("div#layer_menu div.baseLbl").hide();
                    $("div#layer_menu div.baseLayersDiv").hide();
                    $("div#layer_menu div.dataLbl").hide();
                }
            }
        }
    });
    
    var aerialButton = new OpenLayers.Control({
        type: OpenLayers.Control.TYPE_TOOL,
        displayClass: "aerialButton",
        eventListeners: {
            activate: function() {
                if (laag_lufo) 
                {
                    map.setBaseLayer(laag_lufo);
                    $("div#layer_menu div.baseLbl").hide();
                    $("div#layer_menu div.baseLayersDiv").hide();
                    $("div#layer_menu div.dataLbl").hide();
                }
            }
        }
    });
    
    layerPanel.addControls([aerialButton, mapButton]);
    
    layerPanel.activateControl(mapButton);
        
	
		//Navigatie knop functie
		var navigation_control = new OpenLayers.Control.Navigation({title: 'Selecteer een object'});  
		var control_panel = new OpenLayers.Control.Panel({
			div: document.getElementById('boven_menu'),
	        defaultControl: navigation_control,
            saveState:true,
            autoActivate:true
        });

    function buttonZoomIn(){
       //alert("test button custom");
       map.zoomIn(1);
    }
    function buttonZoomOut(){
       map.zoomOut(1);
    }
    //Navigatie knop functie
    var custom_button_zoomIn = new OpenLayers.Control.Button({
            displayClass: 'olControlCustomButton', 
            trigger: buttonZoomIn
    })
    var custom_button_zoomOut = new OpenLayers.Control.Button({
            displayClass: 'zoomout', 
            trigger: buttonZoomOut
    })

		control_panel.addControls([
			new OpenLayers.Control.ZoomToMaxExtent({title: 'Volledig uitzoomen'}),
			navigation_control,
      custom_button_zoomIn,
      custom_button_zoomOut
		])

		map.addControl(control_panel);
		
		map.addControl(new OpenLayers.Control.MousePosition(
			{numDigits:0}
		));
		map.addControl(new OpenLayers.Control.ScaleLine({
			//div : document.getElementById('scale_div'),
			bottomOutUnits : 'm',
			bottomInUnits : '',
			maxWidth : 200
		}));
		markers = new OpenLayers.Layer.Markers("Locaties", {
		displayInLayerSwitcher: false
		});   			
        map.addLayer(markers);
        //map.setCenter(new OpenLayers.LonLat(112355, 475023),3.5);
		map.setCenter(position, zoom);
		//map click function
		
        //click en popUP functie
		OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },
                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    );
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.onClick,
                            'dblclick': this.onDblclick
                        }, this.handlerOptions
                    );
                },
                onClick: function(e) {
                    var msg = "click " + e.xy;
					var lonlat = map.getLonLatFromViewPortPx(e.xy);
					var klikpunt = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
					getGrafinfo( lonlat.lon.toFixed(2) + "," + lonlat.lat.toFixed(2) );
                }
        });
		var click_control = new OpenLayers.Control.Click({ handlerOptions: { "single": true  }});
		map.addControl( click_control );
		click_control.activate();
		
		//selectie style
		selectie_styles = new OpenLayers.StyleMap({
                  "default": new OpenLayers.Style(null, {
                      rules: [
                          new OpenLayers.Rule({
                              symbolizer: {
                                  "Point": {
                                      pointRadius: 8,
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
                                      strokeColor: "#FF0000",
				                      strokeWidth: 5,
				                      fillColor: "#444444",
                                      fillOpacity: 0.7
                                  }
                              }
                          })
                      ]
                  }),
                  "select": (null, {
                      rules: [
                          new OpenLayers.Rule({
                              symbolizer: {
                                  "Point": {
                                      pointRadius: 8,
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
                                      strokeColor: "#FF0000",
				                      strokeWidth: 8,
				                      fillColor: "#000000",
                                      fillOpacity: 0.1
                                  }
                              }
                          })
                      ]
                  })

            });
		//zoek style
		
		var zoek_styles = new OpenLayers.StyleMap({
                  "default": new OpenLayers.Style(null, {
                      rules: [
                          new OpenLayers.Rule({
                              symbolizer: {
                                  "Point": {
                                      pointRadius: 8,
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
                                      strokeColor: "#FFDDDD",
				                      strokeWidth: 6,
				                      fillColor: "#654E33",
                                      fillOpacity: 0.8
                                  }
                              }
                          })
                      ]
                  }),
                  "select": (null, {
                      rules: [
                          new OpenLayers.Rule({
                              symbolizer: {
                                  "Point": {
                                      pointRadius: 8,
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
                                      strokeColor: "#FF4444",
				                      strokeWidth: 8,
				                      fillColor: "#000000",
                                      fillOpacity: 0.5
                                  }
                              }
                          })
                      ]
                  })

        });
		//add zoek layer
		zoekLayer = new OpenLayers.Layer.Vector("ZoekLayer",
			{  isBaseLayer: false,
				displayInLayerSwitcher: false,
				styleMap: zoek_styles
			}
		);
		map.addLayer(zoekLayer);
		
		//add selectie layer
		selectieLayer = new OpenLayers.Layer.Vector("Selectie",
            {  isBaseLayer: false,
				displayInLayerSwitcher: false,
				styleMap: selectie_styles
			}
        );
		map.addLayer(selectieLayer);
		
		//select feature control
		select_object_control =  new OpenLayers.Control.SelectFeature( selectieLayer,{
			multiple: false, hover: false,
			toggleKey: "ctrlKey", // ctrl key removes from selection
			multipleKey: "shiftKey" // shift key adds to selection
		});

		select_object_control.onSelect = function(feature) {
		};

		select_object_control.onUnselect = function(feature) {
        };
		
		//style select
		var style = {
			fillColor: '#000',
			fillOpacity: 0.1,
			strokeWidth: 0
		};
		
        
		//Jqery functies voor Achtergronden, Legenda
			$("input[type='radio']").css('vertical-align', '0px');
			$('.olControlOverviewMapMinimizeButton').attr('title','Verberg overzichtskaart');
			$('.olControlOverviewMapMaximizeButton').attr('title','Toon overzichtskaart');
			$('.olControlCustomButtonItemInactive').attr('title','Inzoomen');
			$('.zoomoutItemInactive').attr('title','Uitzoomen');
			$('.gemen_logo').attr('title','Gemeente Amstelveen');
			$('.olControlNavigationHistoryPreviousItemInactive').attr('title','Zoom vorige');
			$('.olControlNavigationHistoryNextItemInactive').attr('title','Zoom volgende');
            
            $("div#layer_menu div.baseLbl").hide();
            $("div#layer_menu div.baseLayersDiv").hide();
			$("div#layer_menu div.dataLbl").hide();
            

            
			$("div.olControlCustomButtonItemInactive, .info_logo, div.zoomoutItemInactive, div.olControlZoomBoxItemInactive, div.olControlZoomToMaxExtentItemInactive, div.olControlNavigationItemActive, div.olControlNavigationHistoryPreviousItemInactive, div.olControlNavigationHistoryNextItemInactive, div.olControlNavigationHistoryNextItemActive").mouseover(function() {
			$(this).css("border", "1px inset #fff");
			//alert("Handler for .click() called.");
			});
			$("div.olControlCustomButtonItemInactive, .info_logo, div.zoomoutItemInactive, div.olControlZoomBoxItemInactive, div.olControlZoomToMaxExtentItemInactive, div.olControlNavigationItemActive, div.olControlNavigationHistoryPreviousItemInactive, div.olControlNavigationHistoryNextItemInactive, div.olControlNavigationHistoryNextItemActive").mouseout(function() {
			$(this).css("border", "none");
			//alert("Handler for .click() called.");
			});
             
             //Layer change function           
             $('input:checkbox[name="topo_kaart"]').change(function(){
                map.zoomOut(1);
                if($(this).is(':checked'))
                {
                   // alert('checked');
                    topo_zorgvlied.setVisibility(true);
                     $("div#layer_menu div.baseLbl").hide();
                     $("div#layer_menu div.baseLayersDiv").hide();
                     $("div#layer_menu div.dataLbl").hide();
                }else
                {
                    //alert('unchecked');
                    topo_zorgvlied.setVisibility(false);
                     $("div#layer_menu div.baseLbl").hide();
                     $("div#layer_menu div.baseLayersDiv").hide();
                     $("div#layer_menu div.dataLbl").hide();
                }
                   
             });
             $('input:checkbox[name="fotos"]').change(function(){
                map.zoomOut(1);
                if($(this).is(':checked'))
                {
                    
                   // alert('checked');
                    fotos.setVisibility(true);
                     $("div#layer_menu div.baseLbl").hide();
                     $("div#layer_menu div.baseLayersDiv").hide();
                     $("div#layer_menu div.dataLbl").hide();
                }else
                {
                    //alert('unchecked');
                    fotos.setVisibility(false);
                     $("div#layer_menu div.baseLbl").hide();
                     $("div#layer_menu div.baseLayersDiv").hide();
                     $("div#layer_menu div.dataLbl").hide();
                }
                   
             });
             
             //tooltip swicht basemap
             $( ".mapButtonItemActive " ).attr( "title", "Klik voor de Topo-kaart" );
              
             $('.aerialButtonItemInactive').attr("title", "Klik voor de Luchtfoto");
            
    } //END Functie Init();
    
    function mooie_datum( datum_string )
	{
		 var mon_number = datum_string.toString().substring( 4,6 );
		  var mon_naam = "";
		  if( mon_number == "01" ) mon_naam=" Januari ";
		  if( mon_number == "02" ) mon_naam=" Februari ";
		  if( mon_number == "03" ) mon_naam=" Maart ";
		  if( mon_number == "04" ) mon_naam=" April ";
		  if( mon_number == "05" ) mon_naam=" Mei ";
		  if( mon_number == "06" ) mon_naam=" Juni ";
		  if( mon_number == "07" ) mon_naam=" Juli ";
		  if( mon_number == "08" ) mon_naam=" Augustus ";
		  if( mon_number == "09" ) mon_naam=" September ";
		  if( mon_number == "10" ) mon_naam=" Oktober ";
		  if( mon_number == "11" ) mon_naam=" November ";
		  if( mon_number == "12" ) mon_naam=" December ";
		  return( datum_string.toString().substring( 6,8 ) + mon_naam + datum_string.toString().substring( 0,4 ) );
	}
	//popUP functie
	function getGrafinfo( coord_gml_string)
	{
		var splitted_coord = coord_gml_string.split(",");
		var current_x = splitted_coord[0];
		var current_y = splitted_coord[1];
		var point_click = new OpenLayers.Geometry.Point(current_x, current_y);
		var intPointFeature = new OpenLayers.Feature.Vector(point_click, null);

		var out_options = {
			'internalProjection': new OpenLayers.Projection("EPSG:28992"),
			'externalProjection': new OpenLayers.Projection("EPSG:28992")
		};

		var gmlOptions = {
			featureType: "feature",
			featureNS: "http://www.crotec.nl/feature"
		};

		var gmlOptionsOut = OpenLayers.Util.extend(
			OpenLayers.Util.extend({}, gmlOptions),
			out_options
		);
		var format_GML_V2 = new OpenLayers.Format.GML.v2(gmlOptionsOut);
		var format_GML_V3 = new OpenLayers.Format.GML.v3(gmlOptionsOut);
		var format_JSON = new OpenLayers.Format.GeoJSON();
		var str = format_GML_V2.write(intPointFeature, false);
		var url_wfs_aspx = 'asp/thema_wfs_request.asp';
		var this_all = "";
		$.ajax({
			type: "POST",
			async: false,
			url: url_wfs_aspx,
			data: {wfs_server: settings_default_wfsserver, Layer:setting_default_namen,inputGML:str },
			dataType: "json",
				success: function(content)
				{
					var json_format = new OpenLayers.Format.GeoJSON();
					selectieLayer.destroyFeatures();
					if( content.features !=  "" )
					{
						var perceel_features = json_format.read( content );
						selectieLayer.addFeatures(perceel_features);
						// select_object_control.select( selectieLayer.features[0] );
						if( perceel_features.length > 0 )
						{
							var wijknaam = "";
                            var val_wijkid_click =  perceel_features[0].attributes["wijk_id"];
                            
							this_all +=  "Grafnummer: <b>" + perceel_features[0].attributes["vak"]  + " " + perceel_features[0].attributes["klasse"]  + " " + perceel_features[0].attributes["nummer"] + "</b> in Wijk: <b id='wijknaam_div'></b><hr/>";
							var image_rechts = "";
							if( perceel_features[0].attributes["bestand"] !== undefined )
							{
								image_rechts = "<img style=\"cursor:pointer;\" title=\"Klik voor vergroting\" onclick=\"window.open('" + pad_fotos + perceel_features[0].attributes["bestand"] + "', '_new');\" height=150 border=1 src=\"" + pad_fotos + perceel_features[0].attributes["bestand"] + "\">";
							}
							this_all += "<table><td valign=top>" + image_rechts + "</td><td valign=top>";
						}
						var nr_personen = 0;
						for( jj=0; jj<perceel_features.length; jj++ )
						{
							if( perceel_features[jj].attributes["ngsl"] != "0.0" )
							{
								nr_personen = nr_personen + 1;
								this_tabel = "<div class=\"div_met_border\"><table width=100% class=class_blok_2>";
								// for (var this_att in perceel_features[jj].attributes)
								//{
								//  this_tabel += "<tr><td>"+ perceel_features[jj].attributes[this_att] + "</td></tr>";
								//}
								var tussen = ""
								if( perceel_features[jj].attributes["nvgsl"] == "null" )
								{
									tussen = " "
								}
								else
								{
									tussen = " " + perceel_features[jj].attributes["nvgsl"] + " ";
								}
								this_tabel += "<tr><td colspan=2 title=\"Uitgebreide Informatie\" onclick=\"open_PDF(" + jj + ");\"><span style=\"cursor:pointer\";><img id='opener' style=\" background-color:#e5ddc7; \" height=25 width=25 src=i/info.png> <B>"+ perceel_features[jj].attributes["nvoor"] + tussen+  perceel_features[jj].attributes["ngsl"] + "</B></span></td></tr>";
								// this_tabel += "<tr><td>Geboorteplaats</td><td>" + perceel_features[jj].attributes["gem_geb"]  + "</td></tr>";
								this_tabel += "<tr><td>" + mooie_datum( perceel_features[jj].attributes["dgeb"] )  + " - " +  mooie_datum( perceel_features[jj].attributes["dovl"] ) + "</td></tr>";
								this_tabel += "</table></div>";
								this_all += this_tabel;
							}
						}
						this_all += "</td></table>";
						if( selectiePopup )
						{
							selectiePopup.destroy();
						}
						if( nr_personen == 0 )
						{
							this_all += "Geen gegevens bekend";
						}
						selectiePopup = new OpenLayers.Popup.FramedCloud(
							"Zorgvlied",
							selectieLayer.features[0].geometry.getBounds().getCenterLonLat(),
							new OpenLayers.Size(200,200),
							this_all,
							null,
							true
						);
						map.addPopup(selectiePopup);
                        
                         //alert(val_wijkid_click);
                         //Wijknaam AJAX
                        $.ajax({
                            type:'GET',
                            url:'wijkenophalen.php',
                            dataType:'html',
                            async:false,
                            success: function(result){
                                var rijen = result.split('|');
                                for(var i=0; i<rijen.length; i++){
                                    var rij = rijen[i].split(';');
                                    var wijkid_rij = rij[1];
                                    var wijknummer_rij = rij[2];
                                    //var wijknaam_rij = rij[3];
                                    
                                    var wijknaam_text = " ";
                                    
                                    
                                    if(val_wijkid_click == wijkid_rij){
                                       wijknaam_text+= wijknummer_rij;
                                       $('#wijknaam_div').html(wijknaam_text);                                       
                                    }
                                }
                            }//END success
                        }); //END AJAX
                        
					}
				} //END success funtie
		}); //END Ajax
        
       
        
	} //END getGrafinfo funtie
	//zoek op achternaam deel
    
    //open PDF funtie
    function open_PDF( nr_selectie )
    {
   
       
        $('#dialog_div').show('slow');
        var pdf_src = "";
    
        var tussen = "";
    
    	if( selectieLayer.features[nr_selectie].attributes["nvgsl"] == "null" )
    	{
   	        tussen = " "
    	}
    	else
    	{
   	        tussen = " " + selectieLayer.features[nr_selectie].attributes["nvgsl"] + " ";
    	}
    
        var val_naam = selectieLayer.features[nr_selectie].attributes["nvoor"] + tussen+  selectieLayer.features[nr_selectie].attributes["ngsl"]
    
        var val_beroep = "";
        var val_geb_plaats = selectieLayer.features[nr_selectie].attributes["gem_geb"];
        var val_geb_datum =  mooie_datum( selectieLayer.features[nr_selectie].attributes["dgeb"] );
        var val_ovl_datum =  mooie_datum( selectieLayer.features[nr_selectie].attributes["dovl"] );
    
        var val_wijknaam = "ophalen";
        var val_wijkid = selectieLayer.features[nr_selectie].attributes["wijk_id"];
    
        var val_grafnummer = selectieLayer.features[nr_selectie].attributes["vak"]  + " " + selectieLayer.features[nr_selectie].attributes["klasse"]  + " " + selectieLayer.features[nr_selectie].attributes["nummer"];
    
        var val_extra_tekst = "ophalen";
    
        var val_ksub = selectieLayer.features[nr_selectie].attributes["ksub"];
        var val_graf_foto = selectieLayer.features[nr_selectie].attributes["bestand"];
        
        var xy = selectieLayer.features[nr_selectie].geometry.getBounds().getCenterLonLat();
    
        //pdf_src = "PDF/Zorgvlied_pdf.php?n=" + val_naam + "&b=" + val_beroep + "&p=" + val_geb_plaats + "&g=" + val_geb_datum + "&o=" + val_ovl_datum + "&w=" + val_wijkid + "&r=" + val_grafnummer + "&x=" + val_extra_tekst + "&ksub=" + val_ksub + "&gf=" + val_graf_foto+ "&x=" + xy.lon+ "&y=" + xy.lat;
        
        //open new window graf info
        
       
                
       var info_window =  window.open('','infoWindow','width=630, height=700, scrollbars=yes, toolbar=no,  menubar=no, location=no"');
                
       var html = " ";
       html+= "<html><head><title>Grafinformatie</title></head>";
       html+= "<body>";
       html+= "<div style=\"background-image: url('img/graf.gif'); background-repeat: no-repeat; margin-left:10px;  width:590px; height: 810px; \">";
       html+= "<div style=\" height:240px;\">"
       html+= "<table cellpadding='5' style='font-size:12px; float:left; width:500px; margin-left:34px; margin-top:50px;'>";
                
       html+= "<tr><td class='tabl_img' rowspan='7'><img alt='GEEN FOTO' style='border:2px solid silver;' width='150px;' height='170px;' src='http://bp.amstelveen.nl/geoservices/zorgvlied/blobs/zorgvlied_bners/"+val_ksub+".jpg' /></td>"
                
       html+= "<td class='tabl_eerst' >Naam</td><td class='tabl_twee'>"+val_naam+"</td></tr>";
                   
        //bekende_tekst AJAX
        $.ajax({
            type:'GET',
            url:'dataophalen.php',
            dataType:'html',
            async: false,
            success: function(result){
                
               var rijen = result.split("|");
               
               for(var i=0; i<rijen.length; i++){
                    
                var rij = rijen[i].split(";");
                var ksub_rij = rij[1];
                var tekst_rij = rij[5];
                var beroep_rij = rij[4];
                
                var bekende_text = " ";
                
                if(val_ksub == ksub_rij){
                    bekende_text+= tekst_rij;
                    $('#bkn_text').html("<p>"+bekende_text+"</p>");
                    bekende_text+= " ";
                    //alert(beroep_rij);
                    $('#beroep_div').html(beroep_rij);
                    
                    html+= "<tr><td class='tabl_eerst'>Beroep</td><td class='tabl_twee'>"+beroep_rij+"</td></tr><tr><td class='tabl_eerst'>Geboorteplaats</td><td class='tabl_twee'>"+val_geb_plaats+"</td></tr>";
                    
                }
                //$('#bkn_text').html('');
                    
               }
               
            } //END success
        });//END AJAX
        
              html+= "<tr><td class='tabl_eerst'>Geboren op</td><td class='tabl_twee'>"+val_geb_datum+"</td></tr>";
              html+= "<tr><td class='tabl_eerst'>Overleden op</td><td class='tabl_twee'>"+val_ovl_datum+"</td></tr>";
        
        //Wijknaam AJAX
        $.ajax({
            type:'GET',
            url:'wijkenophalen.php',
            dataType:'html',
            async:false,
            success: function(result){
                var rijen = result.split('|');
                for(var i=0; i<rijen.length; i++){
                    var rij = rijen[i].split(';');
                    var wijkid_rij = rij[1];
                    var wijknummer_rij = rij[2];
                    var wijknaam_rij = rij[3];
                    var wijkinfo_rij = rij[4];
                    
                    var wijknaam_text = " ";
                    var wijkinfo_text = " ";
                      
                    
                    if(val_wijkid == wijkid_rij){
                       wijknaam_text+= wijknaam_rij;
                       wijkinfo_text+= wijkinfo_rij;
                       
                        
                        html+= "<tr><td class='tabl_eerst'>Wijknaam</td><td class='tabl_twee'>"+wijknaam_text+"</td></tr>";
                       
                    }
                }
            }//END success
        }); //END AJAX
       
       
       html+= "<tr><td class='tabl_eerst'>Grafnummer</td><td class='tabl_twee'>"+val_grafnummer+"</td></tr>";
       html+= "</table>";
       html+= "</div>";
       
       html+= "<div style=\"width:540px; margin-left:25px; height:160px; \">";
       html+= "<div style= \"width:365px; float:left; font-family: verdana; font-size:11px; line-height: 15px; padding-left:12px; padding-right:5px; text-align:left; \">";
          
       //bekende_tekst AJAX
       $.ajax({
            type:'GET',
            url:'dataophalen.php',
            dataType:'html',
            async: false,
            success: function(result){
                
               var rijen = result.split("|");
               for(var i=0; i<rijen.length; i++){
                    
                var rij = rijen[i].split(";");
                var ksub_rij = rij[1];
                var tekst_rij = rij[5];
                var beroep_rij = rij[4];
                
                
                var bekende_text = " ";
                
                if(val_ksub == ksub_rij){
                    bekende_text+= tekst_rij;
                    html+= bekende_text;                             
                }
                //$('#bkn_text').html('');
                    
               }
               
            } //END success
        });//END AJAX
        
        html+= "</div>";
        html+= "<div style=\" float:right; width:160px; height:160px; margin-right:-10px; \">";
        html+= "<img width='160px;' height='160px;' src='http://bp.amstelveen.nl/geoservices/zorgvlied/blobs/zorgvlied_graven/"+val_graf_foto+" ' />";
        html+= "</div>";
        html+= "</div>";                
                
        //Wijknaam AJAX
        $.ajax({
            type:'GET',
            url:'wijkenophalen.php',
            dataType:'html',
            async:false,
            success: function(result){
                var rijen = result.split('|');
                for(var i=0; i<rijen.length; i++){
                    var rij = rijen[i].split(';');
                    var wijkid_rij = rij[1];
                    var wijknummer_rij = rij[2];
                    var wijknaam_rij = rij[3];
                    var wijkinfo_rij = rij[4];
                    
                    var wijknaam_text = " ";
                    var wijkinfo_text = " ";
                      
                    
                    if(val_wijkid == wijkid_rij){
                      
                       
                        html+="<div style=\"width:515px; margin-top:20px; margin-bottom:20px; font-family: verdana; font-size:11px; line-height: 15px; margin-left:17px; padding:10px; border:1px solid silver; \">";
                        html+= "<h4 style=\"  \">"+wijknaam_rij+"</h4>";
                        html+= "<div>"+wijkinfo_rij+"</div>";
                        html+="</div>";
                        
                        html+= "<a style=\" width:400px; color:#000; text-decoration: underline; font-style: italic; font-weight:bold; font-family: verdana; font-size:11px; line-height: 15px; margin-left:18px; \" target='_blank' href='wijken/"+wijknummer_rij+".pdf' >Open Routekaart PDF >>></a>";
                    }
                }
            }//END success
        }); //END AJAX
                
        html+= "</div>";
        html+= "</body>";
        html+="</html>";
                
        info_window.document.open();
        info_window.document.write(html);
        info_window.document.close();

        return false;
        
    } //END OPEN_PDF functie
    
    
    
	$(document).ready(function () {
 	  
       $('#close_btn').click(function(){
            $('#print_div').hide('slow');
       });
       
	   $('#success').hide();
        $('#demo_pdf').click(function () {
        	$.post('create_result.php', $('form').serialize(), function () {
        		$('div#wrapper').fadeOut( function () {
        
                $('#success').show();
        
        		});
        	});
        	return false;
        });
	
		$( "#achternaam, #vak, #klasse, #nummer" ).click(function(){
			$('#zoeken_center').hide();
			$("#achternaam").attr('value','');
		});
        
        $("#achternaam").click(function(){
           $('#vak, #klasse, #nummer').attr('value','');
        });

		var start_tabelregel = "<table class=\"tablesorter\" id=\"sortNamen\">";
		var header_regel = "<thead><tr><th class='head_img'>Naam</th><th class=\"head_img\"><center>Datum<br/>overlijden</center></th></tr></thead><tbody>";
		var einde_tabelregel = "</tbody></table>";
		var onzichtbare_timer = "<center><div id=timer style=\"display:none;\"><img width=200 src=\"i/pic_laden.gif\"></div></center>";
		var build_content = "<tr><td></td><td></td></tr>";
		$("#list_table").html(start_tabelregel + header_regel + build_content + einde_tabelregel + onzichtbare_timer);
		$("#sortNamen").tablesorter( { sortList: [[0,0]], widgets: ['zebra'] });
		$("#sortNamen tr").mouseover(function(){ $(this).addClass("over");  });
		$("#sortNamen tr").mouseout(function(){ $(this).removeClass("over"); });
    });
	
	var settings_default_wfsserver = "https://geoweb.amstelveen.nl/geoserver/wfs";
	var setting_default_namen = "topp:zorgvlied_fotos";

	function maak_table_link( click_function, content )
	{
		var _table_link;
		_table_link = "<table style=\"cursor:pointer;\" id=\"maak_table_link\"";
		if( click_function != "" )
		{
		_table_link += " onclick=\"" + click_function + ";\" title=\"Meer informatie\" class=\"doorklik\"";
		_table_link += "><tr><td><img src=i/next.png  >";
		}
		else
		{
		//_table_link += "><tr><td><B>&nbsp;&nbsp;</B>";
		_table_link += "><tr><td>";
		}
		_table_link += content;
		_table_link += "</td></tr></table>";
		return( _table_link );
	}
    
	function open_json_object ( nr )
	{
		var lonlat = zoekLayer.features[nr].geometry.getBounds().getCenterLonLat();
		map.setCenter( lonlat, 7);
		getGrafinfo( lonlat.lon.toFixed(2) + "," + lonlat.lat.toFixed(2) );
	}
	
    
    //getAchternaam functie
	function getAchternaam()
    {
        $('#zoeken_center').show();

        var strChar =  $("#achternaam").val();
        //$("#zoeken_center").html( "ophalen namen....");

        var sortTabel = $("#sortNamen");
        
        
        $("#sortNamen").find("tr:gt(0)").remove();
        
        $("#sortNamen").trigger("update");
        
        $("#timer").show();
        
        var url_wfs_aspx = 'asp/thema_zoek_request.asp';

        $.ajax({
            type: "POST",
            async: false,
            url: url_wfs_aspx,
            data: {wfs_server: settings_default_wfsserver, Layer:setting_default_namen, AttribName:"ngsl",AttribValue:strChar},
            dataType: "json",
            
            success: function(content)
            {
                $("#sortNamen").remove();

                var build_content = "";
                var start_tabelregel = "<table class=\"tablesorter\" id=\"sortNamen\">";
                var header_regel = "<thead><tr><th>Naam</th><th><center>Datum<br/>overlijden</center></th></tr></thead><tbody>";
                var einde_tabelregel = "</tbody></table>";

                var json_format = new OpenLayers.Format.GeoJSON();

                // global_selectieLayer.destroyFeatures();

                if ( typeof(zoekLayer) === "undefined")
                {

                }
                else
                {
                    zoekLayer.destroyFeatures();
                }

                var perceel_features = json_format.read( content );

                if ( typeof(zoekLayer) === "undefined")
                {
                    
                }
                else
                {
                    zoekLayer.addFeatures(perceel_features);
                }

                for( jj=0; jj<perceel_features.length; jj++ )
                {

                    if( perceel_features[jj].attributes["ngsl"] != "0.0" )
                    {

                        var tussen = "";
                        if( perceel_features[jj].attributes["nvgsl"] == "null" )
                        {
                            tussen = ""
                        }
                        else
                        {
                            tussen = perceel_features[jj].attributes["nvgsl"] + " ";
                        }
                        
                        var found_naam = tussen + perceel_features[jj].attributes["ngsl"] + ", " + perceel_features[jj].attributes["nvoor"];
                        var found_naam_title = perceel_features[jj].attributes["nvoor"]+" "+ tussen + perceel_features[jj].attributes["ngsl"];
                        var overled_datum = perceel_features[jj].attributes["dovl"];
                        
                        var this_x = perceel_features[jj].geometry.getCentroid().x;
                        var this_y = perceel_features[jj].geometry.getCentroid().y;


                        //zet_puntje_op_xy( this_x, this_y );

                        // build_content += maak_table_link( "open_test('" + found_naam + "','','" + this_x + "','" + this_y + "')", found_naam );


                        //   build_content += maak_table_link( "open_json_object( " + jj + " )", found_naam );

                        attr_regel = "<tr title='"+found_naam_title+", "+overled_datum+"' onclick=\"open_json_object(" + jj + ");\" style=\"cursor:pointer;\"><td>" + found_naam + "</td><td>" + perceel_features[jj].attributes["dovl"] + "</td></tr>";
                        build_content += attr_regel;

                        $("#sortNamen >tbody:last").append( attr_regel );

                    }
                }

                var onzichtbare_timer = "<center><div id=timer style=\"display:none;\"><img width=200 src=\"i/pic_laden.gif\"></div></center>";
                $("#zoeken_center").html(start_tabelregel + header_regel + build_content + einde_tabelregel + onzichtbare_timer);

                 $("#timer").hide();


                $("#sortNamen").ready( function () {
                    $("#sortNamen").tablesorter( { sortList: [[0,0]], widgets: ['zebra'] });
                    $("#sortNamen tr").mouseover(function(){ $(this).addClass("over");  });
                	$("#sortNamen tr").mouseout(function(){ $(this).removeClass("over"); });
                
                } );

            }

        } );

        return( false );
        
    }//END getAchternaam functie
    
    //getGrafNummer funtie
    function getGrafNummer(){
        $('#zoeken_center').show();

        var strChar = jQuery.trim( $("#vak").attr('value') + "|" + $("#klasse").attr('value') + "|" + $("#nummer").attr('value') );

        var sortTabel = $("#sortNamen");


        $("#sortNamen").find("tr:gt(0)").remove();

        $("#sortNamen").trigger("update");

        $("#timer").show();


        //map.setCenter( new OpenLayers.LonLat(121810,483200),10 );
        // $("#zoeken_center").html( "ophalen namen....");


        var url_wfs_aspx = 'asp/thema_zoek_request.asp';

        $.ajax({
            type: "POST",
            async: false,
            url: url_wfs_aspx,
            data: {wfs_server: settings_default_wfsserver, Layer:setting_default_namen, AttribName:"graf",AttribValue:strChar},
            dataType: "json",
            success: function(content)
            {
                $("#sortNamen").remove();
                var build_content = "";
                var start_tabelregel = "<table class=\"tablesorter\" id=\"sortNamen\">";
                var header_regel = "<thead><tr><th>Naam</th><th><center>Datum<br/>overlijden</center></th></tr></thead><tbody>";
                var einde_tabelregel = "</tbody></table>";
                var json_format = new OpenLayers.Format.GeoJSON();
                // global_selectieLayer.destroyFeatures();
                
                if ( typeof(zoekLayer) === "undefined")
                {
    
                }
                else
                {
                    zoekLayer.destroyFeatures();
                }
    
                var perceel_features = json_format.read( content );
    
                if ( typeof(zoekLayer) === "undefined")
                {
                }
                else
                {
                    zoekLayer.addFeatures(perceel_features);
                }
    
                var sortTabel = $("#sortNamen");
    
    
                $("#sortNamen").find("tr:gt(0)").remove();
    
                $("#sortNamen").trigger("update");
    
    
                for( jj=0; jj<perceel_features.length; jj++ )
                {
    
                    if( perceel_features[jj].attributes["ngsl"] != "0.0" )
                    {
    
                        var tussen = "";
                        if( perceel_features[jj].attributes["nvgsl"] == "null" )
                        {
                            tussen = ""
                        }
                        else
                        {
                            tussen = perceel_features[jj].attributes["nvgsl"] + " ";
                        }
                        
                        var found_naam = tussen + perceel_features[jj].attributes["ngsl"] + ", " + perceel_features[jj].attributes["nvoor"]
    
                        var this_x = perceel_features[jj].geometry.getCentroid().x;
                        var this_y = perceel_features[jj].geometry.getCentroid().y;
    
    
                        //zet_puntje_op_xy( this_x, this_y );
                        // build_content += maak_table_link( "open_test('" + found_naam + "','','" + this_x + "','" + this_y + "')", found_naam );
    
    
                        //   build_content += maak_table_link( "open_json_object( " + jj + " )", found_naam );
    
                        attr_regel = "<tr onclick=\"open_json_object(" + jj + ");\" style=\"cursor:pointer;\"><td>" + found_naam + "</td><td>" + perceel_features[jj].attributes["dovl"] + "</td></tr>";
    
                        build_content += attr_regel;
                
                        $("#sortNamen >tbody:last").append( attr_regel );
    
                    }
                }
    
                var onzichtbare_timer = "<center><div id=timer style=\"display:none;\"><img width=200 src=\"i/pic_laden.gif\"></div></center>";
                $("#zoeken_center").html(start_tabelregel + header_regel + build_content + einde_tabelregel + onzichtbare_timer);
    
                $("#timer").hide();
    
    
                $("#sortNamen").ready( function () {
                    $("#sortNamen").tablesorter( { sortList: [[0,0]], widgets: ['zebra'] });
                    $("#sortNamen tr").mouseover(function(){ $(this).addClass("over");  });
                	$("#sortNamen tr").mouseout(function(){ $(this).removeClass("over"); });
                });
            } //END success function
            
        }); //END ajax
    
        return( false );
    }//END getGrafFunctie
    
    
	

	
	