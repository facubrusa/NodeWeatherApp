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
        location.href = `/v1/current/${city}`;
    });

    $('#btnLocation').click(function () {
        console.log('click location');
    });
});
