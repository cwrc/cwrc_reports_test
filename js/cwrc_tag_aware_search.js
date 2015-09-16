// the Tag Aware Search interface using KnockoutJS


function facetItem(facetId, labelStr, hitCount)
{
  this.facetId = ko.observable(facetId);
  this.label = ko.observable(labelStr);
  this.hitCount = ko.observable(hitCount);
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
                self.query_terms = ko.observable("{&apos;Pauline&apos;,&apos;Pauline&apos;}");

                // query facets
                self.query_facet_array = ko.observableArray();
                self.query_facets_checked = ko.observableArray();
                
                // debugging
                self.debug_text = ko.observable("");
              
                // loading messages
                self.tas_results_search_loading = ko.observable(false);
                self.tas_results_facets_loading = ko.observable(false);
            }


            // form button - run Reports
            self.runQuery = function() {
                self.debug_text( this.query_terms()!="" ? this.query_terms() : "");

                // set loading indicator
                self.tas_results_search_loading(true);
                self.tas_results_facets_loading(true);

                // execute AJAX call
                tasResultSearch.executeSearch(self.updateUI_tasResultSearch,self);
                tasResultFacets.executeFacets(self.updateUI_tasResultFacets,self);
            }

            // callback
            // populated the "main results" component
            self.updateUI_tasResultSearch = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.tas_results_search_loading(false);
              $("#tas_results_content").html(tmpXML);
              
            }

            // callback
            // populated the "facets" component
            self.updateUI_tasResultFacets = function(data) {

              // reset the hit counters in the facets
              self.resetHitCounter(self.query_facet_array());

              // update the facet array
              //data = '{ "k" : "2" , "l" : "3"  }';
              tmp = (typeof(data)=='string') ? $.parseJSON(data) : data;
              for (key in tmp)
              {
                // does key already exist?
                // indexOf doesn't work as it is not an array of atomics
                var obj = ko.utils.arrayFirst(
                    self.query_facet_array()
                    , function(item) {
                        return key === item.facetId();
                        }
                    );
                // prevent duplication of key within array
                if( !obj )
                {
                  var item = new facetItem(key, self.buildLabel(key, tmp[key]),tmp[key] );
                  self.query_facet_array.push(item);
                }
                else
                {
                  obj.hitCount(tmp[key]);
                }
              }

              // update the loading indicator
              self.tas_results_facets_loading(false);
              
              // update the debug location 
              $("#tas_facets_content_debug").html(JSON.stringify(tmp));
              //$("#tas_facets_content_debug").html(self.query_facet_array().serializeArray());
            }

            // reset the hit counter in the facet array
            self.resetHitCounter = function(facetArray)
            {
              var len = facetArray.length;
              for (var i=0; i<len; i++)
              {
                facetArray[i].hitCount(0);
              }
            }

            // searialize the checkbox facets
            self.buildLabel = function(key)
            {
              //return label + ' (' + hitCount + ')'
              return key; 
            }

            // searialize the checkbox facets
            self.serializeCBData = function()
            {
              var tmp = "";
              var foundChecked = false;
              var len = self.query_facet_array().length;
              for (var i = 0; i < len; i++)
              {
                if ( (self.query_facet_array())[i].isSelected() )
                {
                  if ( foundChecked )
                  {
                    tmp = tmp + ",";
                  }
                  /* 2015-09-16 - simplify output
                  tmp = tmp + "&apos;" + (self.query_facet_array())[i].facetId() + "&apos;";
                  */
                  tmp = tmp + (self.query_facet_array())[i].facetId();
                  foundChecked = true;

                }
              }
              /* 2015-09-16 - simplify output
              if (tmp) 
              { 
                tmp = '(' + tmp + ')';
              }
              */
              return tmp;
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

