/*
 Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.4
 Version: 1.7.0
 Author: Sean Ngu
 Website: http://www.seantheme.com/color-admin-v1.7/admin/
 */

var handleJqueryFileUpload = function(callback) {
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        autoUpload: false,
        disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
        maxFileSize: 5000000, // 5 MB
        acceptFileTypes: /(\.|\/)(jpe?g)$/i, // JPG, JPEG
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    // Upload server status check for browsers with CORS support:
    if ($.support.cors) {
        $.ajax({
            type: 'HEAD'
        }).fail(function () {
            $('<div class="alert alert-danger"/>').text('Upload server currently unavailable - ' + new Date()).appendTo('#fileupload');
        });
    }

    // Load & display existing files:
    $('#fileupload').addClass('fileupload-processing');
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#fileupload').attr('action'),
        dataType: 'json',
        context: $('#fileupload')[0]
    }).always(function () {
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
        renderSwitcher();
        callback(result.files);
    });
};

var FormMultipleUpload = function () {
    "use strict";
    return {
        //main function
        init: function (callback) {
            handleJqueryFileUpload(callback);
        }
    };
}();