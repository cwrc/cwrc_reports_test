// the Tag Aware Search interface using KnockoutJS

$(document).ready(
    function(){

        var tasResultSearch = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_bibcit_lookup.xq', $);
        var tasResultFacets = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_researchnotes_lookup.xq', $);

        function viewModel() 
        {
            self = this;
            //FEDORA PID form element
            self.pid = ko.observable("cwrc:johnp2-b");
            self.query_terms = ko.observable("('Pauline','Pauline')");
            // debugging
            self.pid_read = ko.observable("");

            // loading messages
            self.tas_results_search_loading = ko.observable(false);
            self.tas_results_facets_loading = ko.observable(false);

            // form button - run Reports
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");

                // set loading indicator
                self.tas_results_search_loading(true);
                self.tas_results_facets_loading(true);

                // execute AJAX call
                tasResultSearch.executeReport(self.updateUI_tasResultSearch,self);
                tasResultFacets.executeReport(self.updateUI_tasResultFacets,self);
            }

            // callback
            self.updateUI_tasResultSearch = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.tas_results_search_loading(false);
              $("#tas_results_content").html(tmpXML);
              
            }

            // callback
            self.updateUI_tasResultFacets = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.tas_results_facets_loading(false);
              $("#tas_facets_content").html(tmpXML);
            }

        }
        ko.applyBindings(new viewModel());

    }
)



var xmlToString = function (xmlData) {
    var xmlString;
    if (window.ActiveXObject) { // IE
        xmlString = xmlData.xml;
    } else { // code for Mozilla, Firefox, Opera, etc.
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
};

