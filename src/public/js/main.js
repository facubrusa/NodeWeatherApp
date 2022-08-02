$(function (){
    // init components
    $('#alertMessage').hide();

    //private methods
    $('#currentForm').submit(function (e) {
        e.preventDefault();
        const city = $("input[name='city']").val();
        if (!city || isFinite(city)) {
            $('#alertMessage')
                .empty()
                .append('<h5>Please, enter a city</h5>')
                .show();
            // Hide alert
            setTimeout(() => $('#alertMessage').hide(), 5000);
            return;
        }

        // Redirect to url with the city
        // eslint-disable-next-line no-undef
        location.href = `/v1/current/${city}`;
    });

    $('#forecastForm').submit(function (e) {
        e.preventDefault();
        const city = $("input[name='city']").val();
        if (!city || isFinite(city)) {
            $('#alertMessage')
                .empty()
                .append('<h5>Please, enter a city</h5>')
                .show();
            // Hide alert after 5s
            setTimeout(() => $('#alertMessage').hide(), 5000);
            return;
        }

        // Redirect to url with the city
        // eslint-disable-next-line no-undef
        location.href = `/v1/forecast/${city}`;
    });

    // eslint-disable-next-line no-undef
    $('#btnCurrentLoc').click(() => location.href = '/v1/current/');
    // eslint-disable-next-line no-undef
    $('#btnForecastLoc').click(() => location.href = '/v1/forecast/');
});
