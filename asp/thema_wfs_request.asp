<%

  strPrefix = Request( "Prefix" )

  strLayerName = Request( "Layer" )

  strinputGML = Request( "inputGML" )

  strGeomNode = ""


 Set xmlKad = Server.CreateObject("Microsoft.XMLDOM")


strGeomNode = ""


If not xmlKad.LoadXml (strinputGML) then

else

   Set Polygonen = xmlKad.documentElement.getElementsByTagName("gml:Point")

    For Each objPolygon In Polygonen

         strGeomNode = objPolygon.XML

    Next
    Set Polygonen = nothing


end if


strGeometryAttribName ="geometrie"
strBaseUrl =  Request( "wfs_server" )

strFilter = "<Filter xmlns:gml=""http://www.opengis.net/gml"">"
strFilter = strFilter & "<Intersects>"
strFilter = strFilter &  "<PropertyName>" + strGeometryAttribName + "</PropertyName>"
strFilter = strFilter &  strGeomNode
strFilter = strFilter &  "</Intersects>"
strFilter = strFilter &  "</Filter>"

 strOutputFormat="JSON"

 strWFSRequest = strBaseUrl + "?request=getfeature&service=wfs&version=1.2.0"
strWFSRequest  = strWFSRequest & "&typename=" + strLayerName + "&outputFormat="+ strOutputFormat
strWFSRequest  = strWFSRequest & "&filter=" + strFilter

  'response.write strWFSRequest
  'response.end

Set poster_kad = nothing

Set poster = Server.CreateObject("Msxml2.ServerXMLHTTP.6.0")

poster.open "POST", strWFSRequest, false
poster.setRequestHeader "CONTENT_TYPE", "text/xml"
poster.send

 response.write poster.responseTEXT

 Set poster = nothing
%>

