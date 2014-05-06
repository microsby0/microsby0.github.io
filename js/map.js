$(document).ready(function () {
    var delay = 0;
    var addresses = [];

    var infowindow = new google.maps.InfoWindow();
    var geo = new google.maps.Geocoder();
    var mapOptions = {
        zoom: 4,
        center: google.maps.LatLng(34.363882,84.344922)
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var bounds = new google.maps.LatLngBounds();

    $('ul:not(#main)').hide();
    $('li.city').click(function () {
        $(this).children(":not(span)").slideToggle();
        $(this).toggleClass("open");
    });

    function getAddress(search, next) {
        geo.geocode({
            address: search
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var p = results[0].geometry.location;
                var lat = p.lat();
                var lng = p.lng();
                var msg = 'address="' + search + '" lat=' + lat + ' lng=' + lng + '(delay=' + delay + 'ms)<br>';
                console.log(msg);
                createMarker(search, lat, lng);
            } else {
                if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    nextAddress--;
                    delay++;
                } else {
                    var reason = "Code " + status;
                    var errmsg = 'address="' + search + '" error=' + reason + '(delay=' + delay + 'ms)<br>';
                    console.log(errmsg);
                }
            }
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
            setTimeout(function(){getAddress(addresses[nextAddress], theNext);}, delay);
            nextAddress++;
            delay+=100;
        } else {
	addresses = ['Unknown','Statesboro, GA','Seattle, WA','Sandy Springs, GA','Pine Mountain, GA','Panama City Beach, FL','Ormond Beach, FL','Orlando, FL','New York City, NY','New Orleans, LA','Misc.','Jerusalem, Israel','Hot Springs, NC','Gulf Shores, AL','Gainesville, FL','Dunwoody, GA','Cambridge, MA','Brooklyn, NY','Atlanta, GA','Athens, GA','Alpharetta, GA'];
            map.fitBounds(bounds);
            $("#loading_gif").fadeOut('slow', function() {
                $("#loading_gif").attr('display', 'none');
            });
        }
    }
    addresses = ['Statesboro, GA', 'Seattle, WA', 'Sandy Springs, GA', 'Pine Mountain, GA', 'Panama City Beach, FL', 'Ormond Beach, FL', 'Orlando, FL', 'New York City, NY', 'New Orleans, LA', 'Jerusalem, Israel', 'Hot Springs, NC', 'Gulf Shores, AL', 'Gainesville, FL', 'Dunwoody, GA', 'Cambridge, MA', 'Brooklyn, NY', 'Atlanta, GA', 'Athens, GA', 'Alpharetta, GA', 'Airplane'];
    google.maps.event.addListenerOnce(map, 'idle', function(){
        console.log("ready");
        theNext();

    });

    $(".city span").each(function (index, value) {
        $(this).text($(this).text() + " - " + $(this).parent().children().children().length);
        console.log("Here: " + $(this).parent().children().children().length);
        //$(this).html() = 5;
    });
});