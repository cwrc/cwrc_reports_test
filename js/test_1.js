$(document).ready(
    function(){

        var cwrcReports = new cwrcReportsAPI('./test/test.xml', $);

        function viewModel() 
        {
            self = this;
            self.pid = ko.observable("");
            self.pid_read = ko.observable("");
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");
                response = cwrcReports.executeBibcitReport(self.updateUI);
            }
            // callback
            self.updateUI = function(data) {
              //tmpXML = xmlToString(data.responseXML);
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              //$("#div_bibcit").html(response.responseText);
              $("#div_bibcit").html(tmpXML);
              //$("#div_bibcit").html('<BIBCIT><div><li>a</li><li>b</li></div></BIBCIT>');
              
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

