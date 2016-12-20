$(document).ready(
    function(){

        var server_base = 'http://cwrc-dev-05.srv.ualberta.ca/islandora/cwrc_xmldb/v1/';
        var cwrcReportsBibcit = new cwrcReportsAPI(server_base+'orlando_bibcit_lookup.xq', $);
        var cwrcReportsResearchnotes = new cwrcReportsAPI(server_base+'orlando_researchnotes_lookup.xq', $);
        var cwrcReportsWorkflow = new cwrcReportsAPI(server_base+'orlando_workflow_new.xq', $);
        var cwrcReportsQuotes = new cwrcReportsAPI(server_base+'orlando_quotes_lookup.xq', $);
        var cwrcReportsCoreTags = new cwrcReportsAPI(server_base+'orlando_core_tags_lookup.xq', $);
        var cwrcReportsChronstructBibcits = new cwrcReportsAPI(server_base+'orlando_chronstruct_bibcit_test.xq', $);

        function viewModel() 
        {
            self = this;
            //FEDORA PID form element
            self.pid = ko.observable("orlando:9f0c5add-7167-41bd-8111-77e0cff09ed5");
            // debugging
            self.pid_read = ko.observable("");

            // loading messages
            self.rpt_bibcit_loading = ko.observable(false);
            self.rpt_researchnotes_loading = ko.observable(false);
            self.rpt_workflow_loading = ko.observable(false);
            self.rpt_quotes_loading = ko.observable(false);
            self.rpt_coretags_loading = ko.observable(false);
            self.rpt_chronstruct_bibcit_loading = ko.observable(false);

            // form button - run Reports
            self.runReports = function() {
                self.pid_read( this.pid()!="" ? this.pid() : "");

                // set loading indicator
                self.rpt_bibcit_loading(true);
                self.rpt_researchnotes_loading(true);
                self.rpt_workflow_loading(true);
                self.rpt_quotes_loading(true);
                self.rpt_coretags_loading(true);
                self.rpt_chronstruct_bibcit_loading(true);

                // execute AJAX call
                cwrcReportsBibcit.executeReport(self.updateUI_BibcitReport,self);
                cwrcReportsResearchnotes.executeReport(self.updateUI_ResearchnotesReport,self);
                cwrcReportsWorkflow.executeReport(self.updateUI_WorkflowReport,self);
                cwrcReportsQuotes.executeReport(self.updateUI_QuotesReport,self);
                cwrcReportsCoreTags.executeReport(self.updateUI_CoreTagsReport,self);
                cwrcReportsChronstructBibcits.executeReport(self.updateUI_ChronstructBibcitsReport,self);
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
              self.rpt_researchnotes_loading(false);
              $("#div_researchnote_report").html(tmpXML);
            }

            // callback
            self.updateUI_WorkflowReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_workflow_loading(false);
              $("#div_workflow_report").html(tmpXML);
            }

            // callback
            self.updateUI_QuotesReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_quotes_loading(false);
              $("#div_quotes_report").html(tmpXML);
            }

            // callback
            self.updateUI_CoreTagsReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_coretags_loading(false);
              $("#div_coretags_report").html(tmpXML);
            }

            // callback
            self.updateUI_ChronstructBibcitsReport = function(data) {
              tmpXML = (typeof(data)=='string') ? data : xmlToString(data);
              self.rpt_chronstruct_bibcit_loading(false);
              $("#div_chronstruct_bibcit_report").html(tmpXML);
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

