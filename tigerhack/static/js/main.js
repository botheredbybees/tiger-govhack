		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // map drawing stuff                                                                                                           //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
			var map = L.map('map').setView([-42.8112, 147.2758], 13);
			var osm = L.tileLayer('http://{s}.tile.cloudmade.com/572b6fba019c460cbc0c68b07da7dc2b/997/256/{z}/{x}/{y}.png', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					maxZoom: 18
			}).addTo(map);
//			var track = new L.KML("/static/kml/Public_MarineAndCoastal.kml", {async: true});

//    	track.on("loaded", function(e) { map.fitBounds(e.target.getBounds()); console.log(e.target.getBounds()); });

//    	map.addLayer(track);



    //var center = new L.LatLng(-42.8232,147.2555);
    //var map = new L.Map('map', { center: center, zoom: 14, attributionControl:true, zoomControl:false});    

    //Define layers
    //var osm = L.TileLayer.provider('OpenStreetMap.Mapnik');
    //var ggl = new L.Google('ROADMAP','maxZoom: 20');    
    var LISTBasemapWMS = new L.tileLayer.wms("http://services.thelist.tas.gov.au/arcgis/services/Basemaps/Topographic/ImageServer/WMSServer", {
        layers: 'Topographic',
        format: 'image/png',
        transparent: true,
        attribution: "Basemap &copy The LIST",
        minZoom: 19,
        maxZoom: 20
    });
    
    
    var LISTBasemap = new L.tileLayer("http://services.thelist.tas.gov.au/arcgis/rest/services/Basemaps/Topographic/ImageServer/tile/{z}/{y}/{x}", {
        attribution: "Basemap &copy The LIST",
        maxZoom: 18
    });
    var listLayers = L.layerGroup([LISTBasemap, LISTBasemapWMS])
    
    
    var baselayers = {
    "Open Street Map": osm,
    //"Google Maps": ggl,
    "List Basemap": listLayers
    };
    
    var gccAtt = 'GovHack 2103, <a href="http://creativecommons.org/licenses/by/3.0/au/">CC-BY</a>';
     var stormwater = new L.TileLayer.WMS("http://maps.gcc.tas.gov.au:8080/geoserver/gwc/service/wms", {
            layers: 'GCC_cc:Stormwater',
            format: 'image/png',
            transparent: true,
    attribution: gccAtt
    });  
    
//    var coastalprotection = new L.TileLayer.WMS("http://maps.gcc.tas.gov.au:8080/geoserver/gwc/service/wms?SERVICE=WMS&", {
//            layers: 'ips:E11_0_Waterway_and_Coastal_Protection_Code',
//            format: 'image/png',
//            transparent: true,
//    				attribution: gccAtt
//    });    

//    var erosion = new L.TileLayer.WMS("http://maps.gcc.tas.gov.au:8080/geoserver/gwc/service/wms?SERVICE=WMS&", {
//            layers: 'ips:E14_0_Coastal_Erosion_Hazard_Code',
//            format: 'image/png',
//            transparent: true,
//    				attribution: gccAtt
//    });
//    
//    
//    var test = new L.TileLayer.WMS("http://www.mrt.tas.gov.au/iwms/ecwp/ImageX.dll?dsinfo?layer=/mrt/images/all_tas/tas_geology250k.ecw", {
//            layers: 'ALL_TAS_TAS_GEOLOGY250K.ECW',
//            format: 'image/png',
//            transparent: true,
//    				attribution: gccAtt
//    });



    map.addLayer(listLayers);
   // map.addLayer(test);      

    var overlays = {
    "SW Pipes and Pits": stormwater,
//    "Marine and Coastal": track,
//    "Coastal protection areas": coastalprotection,
//    "Erosion hazard zones": erosion,
//    "test": test,
    
    };
 
    //Layer control
    L.control.layers(baselayers, overlays, {position: 'topleft'}).addTo(map);


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // form processing                                                                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // variable to hold request
var request;
// bind to the submit event of our form
$("#addmarker").submit(function(event){
    senddata($(this));
});

var senddata = function($form) {
	// abort any pending request
    if (request) {
        request.abort();
    }
    
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
    // serialize the data in the form
    var serializedData = $form.serialize();

    // let's disable the inputs for the duration of the ajax request
    $inputs.prop("disabled", true);

    // fire off the request to /form.php
    var request = $.ajax({
        url: "addmarker.php",
        type: "post",
        data: serializedData
    });

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        
        if (response == 'OK') {
        	$('#instructions').text('Thanks for posting, your data has been added to the moderator queue and will appear on the map shortly');
        	console.log("Hooray, it worked. Marker added! Response: "+response);
        } else {
        	// something went wrong
        	console.log("Error adding marker! Response: "+response);
        }
    });

    // callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        console.error(
            "The following error occured: "+
            textStatus, errorThrown
        );
    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // reenable the inputs
        $inputs.prop("disabled", false);
    });

    // prevent default posting of form
    event.preventDefault();
}



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // preload form with current lat/long                                                                                          //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    jQuery(window).ready(function(){   

        navigator.geolocation.getCurrentPosition(handle_geolocation_query);  
  
        function handle_geolocation_query(position){  
            $('#lat').attr('value',position.coords.latitude);  
            $('#long').attr('value',position.coords.longitude);  
        } 
    });
    
