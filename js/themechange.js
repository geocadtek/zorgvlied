(function($){

	
	$.fn.changeLang = function(params){
	
		var toTest = this;
		
		var defaults = {
			file: 'theme/theme.xml',
			theme: 'robeheer'
		}
		
		if(params) $.extend(defaults, params);

		$.ajax({
		      type: "GET",
		      async: false,
		      data: { id: guid() },
		      url: defaults.file,
		      dataType: "xml",
		      success: function(xml)
					   {
		
							$.each($(toTest).find("*"), function(i, item)
							{
															
								if($(item).attr("themetag") != null)
								{
									
									aNode = $(xml).find("item[id='"+$(item).attr("themetag")+"']").find(defaults.theme);
									aVisibility = aNode.attr("visibility");
									aTitle = aNode.attr("title");
									aTexts = aNode.text();

									if(aTitle != "" && aTitle != undefined) 
									{
										aTitle = aTitle.replace("#","<br />");
										$(item).attr("title", aTitle);
									}

									if(aTexts != "") 
									{
										if(aTexts.indexOf("<") !=-1 && aTexts.indexOf(">") !=-1 )
										{
											$(item).html(aTexts);
										}
										else
										{
											$(item).text(aTexts);
										}
									}

									if(aVisibility !=null)
									{
										if(aVisibility == "false")
										{
											$(item).hide();
										}
										else
										{
											$(item).show();
										}
									}
								}
									
							});
		               }
		      });
	};
	
})(jQuery);