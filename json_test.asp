<%@ LANGUAGE="VBScript" %> 
<% 
    ' http://classicasp.aspfaq.com/general/how-do-i-read-the-contents-of-a-remote-web-page.html
    ' this code requests the raw RSS/XML and saves the response as a string <RSSFeed> 

    Dim objHTTP ' this object is used to call the RSS Feed remotely 
    Dim RSSURL,RSSFeed ' these variables hold the URL and Content for the RSS Feed 
	zoek_pc = request("zoek_pc")
    RSSURL = "https://geoweb.amstelveen.nl/geoserver/wms?request=getFeature&service=WFS&version=1.1.0&typename=topp:adressen_amstelveen&outputFormat=json&sortBy=huisnummer&filter=%3CFilter%20xmlns:gml=%22http://www.opengis.net/gml%22%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Enaam_openbare_ruimte%3C/PropertyName%3E%3CLiteral%3E"&zoek_pc&"%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E"
    'optionally do url verification here 
	'response.write RSSURL
    Set objHTTP = Server.CreateObject("MSXML2.ServerXMLHTTP") 
    objHTTP.open "GET",RSSURL,false 
    objHTTP.send "" 
    RSSFeed = objHTTP.responseText 
    Response.ContentType="application/json" 
    Response.Write RSSFeed 
%> 