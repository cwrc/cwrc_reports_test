/**
 *
 * Javascript API calls for Tag Aware Search 
 *
 * Requires jQuery
 * **/

function cwrcTagAwareSearchAPI(url, jq) {
    if (!jq) {
        jq = $;
    }

    // Public Functions
   
    
    // retrieve a JSON datastruct containing facets for a given XML query
    this.executeFacets = function(updateUICallback,queryObj){
        var result = result;

        // async - http://martinfowler.com/articles/asyncJS.html
        return jq.ajax({
            url : url,  
            type : 'POST',
            async : true,
            dataType : "json",
            data: {
                QRY_TERMS: queryObj.query_terms
                , QRY_FACETS: queryObj.serializeCBData()
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

 
    // retrieve an XML datastruct containing facets for a given XML query
    this.executeSearch = function(updateUICallback,queryObj){
        var result = result;

        // async - http://martinfowler.com/articles/asyncJS.html
        return jq.ajax({
            url : url,  
            type : 'POST',
            async : true,
            dataType : "xml",
            data: {
                QRY_TERMS: queryObj.query_terms
                , QRY_FACETS: queryObj.serializeCBData()
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
