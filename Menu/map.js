$(document).ready(function () {
    var delay = 100;
    var addresses = [];

    var infowindow = new google.maps.InfoWindow();
    var geo = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("map"));
    var bounds = new google.maps.LatLngBounds();

    $('ul:not(#main)').hide();
    $('li.city').click(function () {
        $(this).children().slideToggle();
        $(this).toggleClass("open");
    });

    function getAddress(search, next) {
        console.log("In method");
        geo.geocode({
            address: search
        }, function (results, status) {
            console.log("In thing");
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("In if");
                var p = results[0].geometry.location;
                var lat = p.lat();
                var lng = p.lng();
                var msg = 'address="' + search + '" lat=' + lat + ' lng=' + lng + '(delay=' + delay + 'ms)<br>';
                createMarker(search, lat, lng);
            } else {
                console.log("In else");
                if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    nextAddress--;
                    delay++;
                } else {
                    var reason = "Code " + status;
                    var errmsg = 'address="' + search + '" error=' + reason + '(delay=' + delay + 'ms)<br>';
                    console.log(errmsg);
                }
            }
            console.log("out method");

            next();
        });
    }

    function createMarker(add, lat, lng) {
        var contentString = add;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map,
        });
        google.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
        bounds.extend(marker.position);
    }

    var nextAddress = 0;

    function theNext() {
        if (nextAddress < addresses.length) {
            setTimeout(getAddress("'" + addresses[nextAddress] + "'", theNext), delay);
            nextAddress++;
        } else {
            console.log("done");
            map.fitBounds(bounds);
        }
    }
    addresses = ['Statesboro, GA', 'Seattle, WA', 'Sandy Springs, GA', 'Pine Mountain, GA', 'Panama City Beach, FL', 'Ormond Beach, FL', 'Orlando, FL', 'New York City, NY', 'New Orleans, LA', 'Jerusalem, Israel', 'Hot Springs, NC', 'Gulf Shores, AL', 'Gainesville, FL', 'Dunwoody, GA', 'Cambridge, MA', 'Brooklyn, NY', 'Atlanta, GA', 'Athens, GA', 'Alpharetta, GA', 'Airplane'];
    theNext();
    $(".city").each(function (index, value) {
        console.log("Here: " + $(this).text().split("\n")[0]);
        $(this).innerHTML += $(this).children.length;
    });
});