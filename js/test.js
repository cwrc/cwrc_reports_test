$(document).ready(
    function(){

        var cwrcReportsTest1 = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/test1.xq', $);
        var cwrcReportsTest2 = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/test2.xq', $);

        function viewModel() 
        {
            self = this;
            self.pid = ko.observable("");
            self.pid_read = ko.observable("");
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");
                response = cwrcReportsTest1.executeReport(self.updateUI_BibcitReport);
                response = cwrcReportsTest2.executeReport(self.updateUI_NamesReport);
            }

            // callback
            self.updateUI_BibcitReport = function(data) {
              //tmpXML = xmlToString(data.responseXML);
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              //$("#div_bibcit").html(response.responseText);
              $("#div_bibcit_report").html(tmpXML);
              //$("#div_bibcit").html('<BIBCIT><div><li>a</li><li>b</li></div></BIBCIT>');
              
            }

            // callback
            self.updateUI_NamesReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              $("#div_name_report").html(tmpXML);
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

