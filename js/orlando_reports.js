$(document).ready(
    function(){

        var cwrcReportsBibcit = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_bibcit_lookup.xq', $);
        var cwrcReportsResearchnotes = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_researchnotes_lookup.xq', $);
        var cwrcReportsWorkflow = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_workflow_new.xq', $);

        function viewModel() 
        {
            self = this;
            self.pid = ko.observable("cwrc:johnp2-b");
            self.pid_read = ko.observable("");
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");
                cwrcReportsBibcit.executeReport(self.updateUI_BibcitReport,self);
                cwrcReportsResearchnotes.executeReport(self.updateUI_ResearchnotesReport,self);
                cwrcReportsWorkflow.executeReport(self.updateUI_WorkflowReport,self);
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
            self.updateUI_ResearchnotesReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              $("#div_researchnote_report").html(tmpXML);
            }

            // callback
            self.updateUI_WorkflowReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              $("#div_workflow_report").html(tmpXML);
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

