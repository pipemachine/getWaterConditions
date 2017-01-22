/*
 * AUTHOR:       pipemachine
 *
 * TITLE:        A jQuery Plugin for retrieving USGS water data
 *
 * DESCRIPTION:  This plugin depends only on jQuery. The plugin takes an options obj.
 *               The required options are trigger (id for onclick trigger), siteNumber
 *               (the desired USGS river site number), and either a singleTarget or
 *               targets obj. The target option is a (text) rendering target. 
 */


(function ($){
  $.fn.getWaterConditions = function(options){
    //set click event based on trigger from options.
    $(options.trigger).click(function() {
    	var site = options.siteNumber;
    	$.ajax({
          type: 'GET',
    	  url: "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site,
    	  crossDomain: true,
    	  success: function(json){
		   //Interpret json response from USGS server
    		   var siteName = json.value.timeSeries[0].sourceInfo.siteName;
    		   var flowVal = json.value.timeSeries[0].values[0].value[0].value;
    		   var timeDate = String(json.value.timeSeries[0].values[0].value[0].dateTime);
		   var dateSplit = timeDate.split("T");
		   var date = dateSplit[0];
		   var time = dateSplit[1].split(":00")[0];  
                   // Assign parsed values to targets specified in options.
		   // If simply replacing text isn't desired, options like jQuery's
		   // append and prepend may be preferred.
		   if(options.singleTarget){
  		     $(options.singleTarget).text(
		       siteName+" (#" +site+ "): "+flowVal+"ft^3/s ON "+date+" AT "+time
		     );
		   }else{
  		     $(options.targets.nameTarget).text(siteName);
  		     $(options.targets.numberTarget).text(site);
  		     $(options.targets.flowTarget).text(flowVal + " ft^3/s");
  		     $(options.targets.timeTarget).text(time);
  		     $(options.targets.dateTarget).text(date);
		   }
    		 },
    	  error : function(XMLHttpRequest, textStatus, errorThrown) {
		   // If there is an error with the request, we pass back the site number,
		   // as well as letting the user know there is an error. 
		   $(options.numberTarget).text(site);
		   $(options.flowTarget).text(
			"There was an issue fetching the water flow data for this site at this time. "
		   );
		  if(errorThrown){
		    console.log("There was an error with the request to the USGS Water Service.")
		  }
		  console.log(textStatus, XMLHttpRequest)
    	  }
    	});
    });
  }
}( jQuery));  
