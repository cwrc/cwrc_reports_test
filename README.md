Test scaffolding for CWRC reports and a tag-aware search that interact with an XML database API - https://github.com/cwrc/islandora_cwrc_basexdb.


The tag aware search:
* [xml_tag_search.xq](https://github.com/cwrc/islandora_cwrc_basexdb/blob/9f8b9885e6b21ac373bc94ad708e3ddc2fe409e4/xq/xml_tag_search.xq)
* [xml_tag_search_facets.xq](https://github.com/cwrc/islandora_cwrc_basexdb/blob/9f8b9885e6b21ac373bc94ad708e3ddc2fe409e4/xq/xml_tag_search_facets.xq)
* [Orlando Reports](https://github.com/cwrc/islandora_cwrc_basexdb/tree/9f8b9885e6b21ac373bc94ad708e3ddc2fe409e4/xq/reports)


Installation:

* `cd ${DRUPAL_HOME}/sites/default/libraries`
* `sudo git clone https://github.com/cwrc/cwrc_reports_test.git
*  verify https://github.com/cwrc/islandora_cwrc_basexdb contains commit (otherwise XQuery is not whitelisted): https://github.com/cwrc/islandora_cwrc_basexdb/commit/58b1df36f0a23ac5421c4ca5bb6756930385d3b6

To test - tag aware search:
* login to the Drupal site
* enter the url: https://${server_name}/sites/default/libraries/cwrc_reports_test/tag_aware_search.html

To test - Orlando reports
* login to the Drupal site
* enter the url: https://${server_name}/sites/default/libraries/cwrc_reports_test/index_orlando_reports_v2.html

References:

http://stackoverflow.com/questions/6736136/working-with-a-list-of-checkboxes-in-knockoutjs
https://coderwall.com/p/_kakfa/javascript-iterate-through-object-keys-and-values
https://www.devbridge.com/articles/knockout-a-real-world-example/
http://jsfiddle.net/codesailor/H7wLT/37/
http://knockoutjs.com/documentation/checked-binding.html
