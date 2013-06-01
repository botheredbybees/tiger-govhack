var map = L.map('map').setView([-42.8331, 147.2758], 14);
var osm = L.tileLayer('http://{s}.tile.cloudmade.com/572b6fba019c460cbc0c68b07da7dc2b/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 20
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
    
    var gccAtt = 'GovHack 2103, <a href="http://creativecommons.org/licenses/by/3.0/au/">CC-BY</a>'
    var stormwater = new L.TileLayer.WMS("http://maps.gcc.tas.gov.au:8080/geoserver/gwc/service/wms", {
            layers: 'GCC_cc:Stormwater',
            format: 'image/png',
            transparent: true,
    attribution: gccAtt
    });

    var acc_labels = new L.TileLayer.WMS("http://maps.gcc.tas.gov.au:8080/geoserver/gwc/service/wms", {
            layers: 'GCC_cc:Stormwaterpits_acc_labels',
            format: 'image/png',
            transparent: true,
    maxZoom: 20,
    attribution: gccAtt
    });

    map.addLayer(listLayers);
    map.addLayer(stormwater);
    map.addLayer(acc_labels);    

    var overlays = {
    "SW Pipes and Pits": stormwater,
    "SW Accuracy Labels": acc_labels
    };

    //Location control
    L.control.locate({
        position: 'topright',  
        drawCircle: false,
        follow: false
    }).addTo(map);
    //Zoom control
    L.control.zoom().addTo(map);    
    //Layer control
    L.control.layers(baselayers, overlays, {position: 'topleft'}).addTo(map);
    //Search control
    L.control.searchControl().addTo(map);

    
