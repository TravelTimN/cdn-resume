function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: {
            lat: 53.554564,
            lng: -7.757595
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 53.346925, lng: -6.306470 },
        { lat: 53.341396, lng: -6.249129 },
        { lat: 53.338981, lng: -6.261951 },
        { lat: 52.123733, lng: -6.929418 },
        { lat: 51.929094, lng: -8.570950 },
        { lat: 52.138341, lng: -10.270777 },
        { lat: 52.971664, lng: -9.430907 },
        { lat: 54.002478, lng: -7.399948 },
        { lat: 54.055402, lng: -7.394841 }
    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
};