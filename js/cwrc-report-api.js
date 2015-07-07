/**
 *
 * Javascript API calls for Reports
 *
 * Requires jQuery
 * **/

function cwrcReportsAPI(url, jq) {
    if (!jq) {
        jq = $;
    }

    // Public Functions
    this.executeReport = function(updateUICallback,reportObj){
        var result = result;

        // async - http://martinfowler.com/articles/asyncJS.html
        return jq.ajax({
            url : url,  
            type : 'GET',
            async : true,
            dataType : "xml",
            data: {
                FEDORA_PID: reportObj.pid
            },
            success : function(data) {
                result = data;
                updateUICallback(data);
                //reportObj.success(result);
            },
            error : function(error) {
                result = error;
                updateUICallback(error.responseText);
                //reportObj.error(error);
            },
        });

        return result
    }
}
