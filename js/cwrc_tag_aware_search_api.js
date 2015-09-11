/**
 *
 * Javascript API calls for Tag Aware Search 
 *
 * Requires jQuery
 * **/

function cwrcReportsAPI(url, jq) {
    if (!jq) {
        jq = $;
    }

    // Public Functions
   
    
    // retrieve a JSON datastruct containing facets for a given XML query
    this.executeReport = function(updateUICallback,queryObj){
        var result = result;

        // async - http://martinfowler.com/articles/asyncJS.html
        return jq.ajax({
            url : url,  
            type : 'POST',
            async : true,
            dataType : "json",
            data: {
                QUERY_TERMS: queryObj.searchTerms
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
