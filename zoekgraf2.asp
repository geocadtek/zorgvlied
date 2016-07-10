<%@ LANGUAGE="VBScript" %> 
<% 
    ' http://classicasp.aspfaq.com/general/how-do-i-read-the-contents-of-a-remote-web-page.html
    ' this code requests the raw RSS/XML and saves the response as a string <RSSFeed> 

    Dim objHTTP ' this object is used to call the RSS Feed remotely 
    Dim RSSURL,RSSFeed ' these variables hold the URL and Content for the RSS Feed 
	'zoek_pc = request("zoek_pc")
    RSSURL = "http://geo.amstelveen.nl/geoserver/wfs?request=getFeature&service=WFS&version=1.1.0&typename=topp:O10002_gidw_beeldendekunst&outputFormat=json"
	'optionally do url verification here 
	'response.write RSSURL
    Set objHTTP = Server.CreateObject("MSXML2.ServerXMLHTTP") 
    objHTTP.open "GET",RSSURL,false 
    objHTTP.send "" 
    RSSFeed = objHTTP.responseText 
    Response.ContentType="application/json" 
    Response.Write RSSFeed 
%> 