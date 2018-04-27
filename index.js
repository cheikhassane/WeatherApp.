$(document).ready(function() {
    // https://www.apixu.com
    $('.short').hide();
    if(navigator.geolocation) {
        var currentLocation = '';
        navigator.geolocation.getCurrentPosition(function(position) {
            currentLocation = position;
            var latitude = currentLocation.coords.latitude;
            var longitude = currentLocation.coords.longitude;
            var url = 'http://api.apixu.com/v1/current.json?key=abd9353455ba49079e171307182204&q=';
            $.getJSON(url+latitude+','+longitude, function(data) {
                // turns a js object into JSON teks and stores that JSON text in a string
                var data = JSON.stringify(data);
                // turns a string of JSON teks into a js object
                var json = JSON.parse(data);

                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var tempCelcius = json.current.temp_c;
                var tempFahrenheit = json.current.temp_f;
                var lastUpdated = json.current.last_updated.replace('-', ' ');

                var wind = json.current.wind_kph;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloud;

                $('.short').show();

                $('#weather').html(city+', '+state+', '+country);

                if(temp < 10) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/01/08/05/07/sky-592415_960_720.jpg)'
                    });
                    $('#temp').html('<h1>It\'s a pretty cold day<hr></h1>');
                } else if(temp > 10 && temp < 28) {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/27/19/24/panoramic-3267048_960_720.jpg)'
                    });
                    $('#temp').html('<h1>It\'s a sunny day<hr></h1>');
                } else {
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/02/02/21/46/sand-3126461_960_720.jpg)'
                    });
                    $('#temp').html('<h1>It\'s a hot day<hr></h1>');
                }

                $('#info1').html(time);
                $('#info2').html('Wind '+wind+' kph');
                $('#info3').html(tempCelcius+'&#8451');

                var flag = true;
                $('#switch').on('click', function() {
                    if(flag) {
                        $('#info3').html(tempFahrenheit+'&#8457');
                        $('#switch').html('Show in Celcius');
                    } else {
                        $('#info3').html(tempCelcius+'&#8451');
                        $('#switch').html('Show in Fahrenheit'); 
                    }
                    flag = !flag;
                });

                if(cloud <= 30) {
                    $('#info5').html('Clear Sky');
                } else {
                    $('#info5').html('Cloudly Sky');
                }
                $('#info6').html('Humidity '+humidity+'%');
            });
        })
    }
});