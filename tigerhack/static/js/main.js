		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // map drawing stuff                                                                                                           //
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			var map = L.map('map').setView([-42.8112, 147.2758], 13);
			var osm = L.tileLayer('http://{s}.tile.cloudmade.com/572b6fba019c460cbc0c68b07da7dc2b/997/256/{z}/{x}/{y}.png', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					maxZoom: 18
			}).addTo(map);



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
//$("#addmarker").submit(function(event){
//    validate_user_submission($(this));
//});


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
    

// Add new site photo image reading, form validation and submission fucntions

// This code has some extra stuff to try to read EXIF data but it is unfinished
map.on('click', addUserMarker);

var usermarker = L.marker();
usermarker.addTo(map);
function addUserMarker(e) {
  // Update form fields
  document.getElementById("lat").value= e.latlng.lat;
  document.getElementById("long").value= e.latlng.lng;
  // Add a marker with popup here
  usermarker.setLatLng(e.latlng);
  usermarker.update();
}

function loadImageFile() {
  if (document.getElementById("userpic").files.length === 0) { return; }
    document.getElementById("marker_popup").innerHTML = '<h3>Image Preview</h3><img id="uploadPreview" src="" />';
    oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
 
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
    };

    var oFile = document.getElementById("userpic").files[0];
      if (!rFilter.test(oFile.type)) { 
          document.getElementById("marker_popup").innerHTML = '<h4 id="submission_error">Error:</h4><p>You must select a valid image file!</p>'; 
          return; 
      }   
      oFReader.readAsDataURL(oFile);
      
}

//var validate_user_submission = function($form) {
function validate_user_submission() {
    //alert ("SUBMITTING3	!");
	// abort any pending request
    if (request) {
    		console.log('aborting');
        request.abort();
    }
    
    // Validate
	caption = document.getElementById("caption").value;
	console.log(caption);
	note = document.getElementById("note").value;
	console.log(note);
	latitude = parseFloat(document.getElementById("lat").value);
	console.log(latitude);
	longitude = parseFloat(document.getElementById("long").value);
	console.log(longitude);
	if (latitude < -90 || latitude > 90) {
		$('#marker_popup').text('Error: Latitude is out of range');
		return false;
	}
	if (longitude < -180 || longitude > 180) {
		$('#marker_popup').text('Error: Longitude is out of range');
		return false;
	}
	if (note.length < 1) {
		$('#marker_popup').text('Error: You need to add a note.');
		return false;
	}
	if (caption.length < 1) {
		$('#marker_popup').text('Error: You need to add a title/caption.');
		return false;
	}

	// Make an AJAX call and get the response
	var formData = new FormData($('#addmarker'));
	var request = jQuery.ajax('/marker/add', {
		processData: false,
		contentType: false,
    		data: formData,
		type: "POST"
	});    

    // callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // log a message to the console
        
        if (response == 'OK') {
        	$('#marker_popup').text('Thanks for posting, your data has been added to the list of interesting photos');
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
    return false;

}
