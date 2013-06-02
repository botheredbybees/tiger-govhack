// List of markers
{% if marker_list %}
  var markers = new Array();
{% for marker in marker_list %}
  markers[{{ marker.id }}] = L.marker([{{ marker.latitude }}, {{ marker.longitude }}]).addTo(map)
     .on('click', function() { showmarker({{marker.id}}); });
{% endfor %}
{% else %}
// No markers available
{% endif %}
  
function showmarker(id) {
/*  var request = $.ajax({
    url: "http://tiger.scriptforge.org:8000/marker/" + id,
    type: 'get',
    dataType: 'html',
    
    });
  request.done(function(response,textStatus, jqXHR) {
    console.log("Marker added! Reponse: " + response);
    $('#marker_popup').html(response);
    }); */
    $('#marker_popup').load('http://tiger.scriptforge.org:8000/marker/' + id);
} 