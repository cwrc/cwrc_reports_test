$(document).ready(
    function(){

        var cwrcReportsBibcit = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_bibcit_lookup.xq', $);
        var cwrcReportsResearchnotes = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_researchnotes_lookup.xq', $);
        var cwrcReportsWorkflow = new cwrcReportsAPI('http://cwrc-dev-01.srv.ualberta.ca/islandora/cwrc_xmldb/v1/orlando_workflow_new.xq', $);

        function viewModel() 
        {
            self = this;
            //FEDORA PID form element
            self.pid = ko.observable("cwrc:johnp2-b");
            // debugging
            self.pid_read = ko.observable("");

            // loading messages
            self.rpt_bibcit_loading = ko.observable(false);
            self.rpt_workflow_loading = ko.observable(false);
            self.rpt_researchnotes_loading = ko.observable(false);

            // form button - run Reports
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");
                self.rpt_bibcit_loading(true);
                self.rpt_researchnotes_loading(true);
                self.rpt_workflow_loading(true);
                cwrcReportsBibcit.executeReport(self.updateUI_BibcitReport,self);
                cwrcReportsResearchnotes.executeReport(self.updateUI_ResearchnotesReport,self);
                cwrcReportsWorkflow.executeReport(self.updateUI_WorkflowReport,self);
            }

            // callback
            self.updateUI_BibcitReport = function(data) {
              //tmpXML = xmlToString(data.responseXML);
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              //$("#div_bibcit").html(response.responseText);
              self.rpt_bibcit_loading(false);
              $("#div_bibcit_report").html(tmpXML);
              //$("#div_bibcit").html('<BIBCIT><div><li>a</li><li>b</li></div></BIBCIT>');
              
            }

            // callback
            self.updateUI_ResearchnotesReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_workflow_loading(false);
              $("#div_researchnote_report").html(tmpXML);
            }

            // callback
            self.updateUI_WorkflowReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_researchnotes_loading(false);
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

