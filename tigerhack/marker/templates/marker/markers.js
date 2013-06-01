// List of markers
{% if marker_list %}
{% for marker in marker_list %}
  var marker{{ marker.id }} = L.marker([{{ marker.latitude }}, {{ marker.longitude }}]).addTo(map);
{% endfor %}
{% else %}
// No markers available
{% endif %}

