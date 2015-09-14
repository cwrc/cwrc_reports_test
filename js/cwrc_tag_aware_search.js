// the Tag Aware Search interface using KnockoutJS


function facetItem(facet_id, labelStr)
{
  this.facetId = ko.observable(facet_id);
  this.Label = ko.observable(labelStr);
  this.isSelected = ko.observable(false);
}



$(document).ready(
    function(){

        var tasResultSearch = new cwrcTagAwareSearchAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/xml_tag_search.xq', $);
        var tasResultFacets = new cwrcTagAwareSearchAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/xml_tag_search_facets.xq', $);

       function viewModel() 
       {
            self = this;

            self.init = function ()
            {
                // query terms
                self.query_terms = ko.observable("('Pauline','Pauline')");

                // query facets
                self.query_facet_array = ko.observableArray();
                self.query_facets_checked = ko.observableArray();
                
                // debugging
                self.debug_text = ko.observable("");
              
                // loading messages
                self.tas_results_search_loading = ko.observable(false);
                self.tas_results_facets_loading = ko.observable(false);
            }

            self.toggleAssociation = function(item)
            {
              item.Selected(!(item.Selected()));
              return true;
            }

            // form button - run Reports
            self.runReports = function() {
                self.debug_text( this.query_terms()!="" ? this.query_terms() : "");

                // set loading indicator
                self.tas_results_search_loading(true);
                self.tas_results_facets_loading(true);

                // execute AJAX call
                tasResultSearch.executeSearch(self.updateUI_tasResultSearch,self);
                tasResultFacets.executeFacets(self.updateUI_tasResultFacets,self);
            }

            // callback
            self.updateUI_tasResultSearch = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.tas_results_search_loading(false);
              $("#tas_results_content").html(tmpXML);
              
            }

            // callback
            self.updateUI_tasResultFacets = function(data) {
              data = '{ "k" : "2" , "l" : "3"  }';
              tmp = (typeof(data)=='string') ? $.parseJSON(data) : data;
              for (key in tmp)
              {
                // does key already exist?
                // indexOf doesn't work as it is not an array of atomics
                var iskey = ko.utils.arrayFirst(
                    self.query_facet_array()
                    , function(item) {
                        return key === item.facetId();
                        }
                    );
                // prevent duplication of key within array
                if( !iskey )
                {
                  var item = new facetItem(key, key + ' (' + tmp[key] + ')');
                  self.query_facet_array.push(item);
                }
              }
              self.tas_results_facets_loading(false);
              $("#tas_facets_content_debug").html(JSON.stringify(tmp));
              //$("#tas_facets_content_debug").html(self.query_facet_array().serializeArray());
            }

        }


        var viewModel = new viewModel();
        viewModel.init();
        ko.applyBindings(viewModel);

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

