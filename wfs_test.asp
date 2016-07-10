<%@ LANGUAGE="VBScript" %> 
<% 
    ' http://classicasp.aspfaq.com/general/how-do-i-read-the-contents-of-a-remote-web-page.html
    ' this code requests the raw RSS/XML and saves the response as a string <RSSFeed> 

    Option Explicit 
    Dim objHTTP ' this object is used to call the RSS Feed remotely 
    Dim RSSURL,RSSFeed ' these variables hold the URL and Content for the RSS Feed 

    RSSURL = "http://geo.amstelveen.nl/geoserver/topp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=topp:O10002_gidw_beeldendekunst&maxFeatures=5&outputFormat=GML2"
    'optionally do url verification here 

    Set objHTTP = Server.CreateObject("MSXML2.ServerXMLHTTP") 
    objHTTP.open "GET",RSSURL,false 
    objHTTP.send "" 
    RSSFeed = objHTTP.responseText 
    Response.ContentType="text/xml" 
    Response.Write RSSFeed 
%> 