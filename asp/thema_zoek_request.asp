<%

strLayerName = Request( "Layer" )

strAttribName = Request( "AttribName" )

strAttribValue = Request( "AttribValue" )

strBaseUrl =  Request( "wfs_server" )


if( Instr( strAttribValue, "|" ) > 0 ) then


values = split( strAttribValue, "|" )


strFilter = "<Filter xmlns:gml=""http://www.opengis.net/gml"">"

strFilter  = strFilter & "<And>"

strFilter  = strFilter & "<PropertyIsEqualTo>"
strFilter  = strFilter & "<PropertyName>vak</PropertyName>"
 strFilter  = strFilter & "<Literal>" + trim(values(0)) + "</Literal>"
strFilter  = strFilter & "</PropertyIsEqualTo>"

if( trim(values(1)) <> "" ) then
strFilter  = strFilter & "<PropertyIsEqualTo>"
strFilter  = strFilter & "<PropertyName>klasse</PropertyName>"
strFilter  = strFilter & "<Literal>" + trim(values(1)) + "</Literal>"
strFilter  = strFilter & "</PropertyIsEqualTo>"
end if

if( trim(values(2)) <> "" ) then
strFilter  = strFilter & "<PropertyIsEqualTo>"
strFilter  = strFilter & "<PropertyName>nummer</PropertyName>"
strFilter  = strFilter & "<Literal>" + trim(values(2)) + "</Literal>"
strFilter  = strFilter & "</PropertyIsEqualTo>"
end if

strFilter  = strFilter & "</And>"

strFilter  = strFilter & "</Filter>"

'''''VOORBEELD:   <And>
''                       <PropertyIsEqualTo><PropertyName>nummer</PropertyName><Literal>0132</Literal></PropertyIsEqualTo>
''                       <PropertyIsEqualTo><PropertyName>vak</PropertyName><Literal>O</Literal></PropertyIsEqualTo>
''    '           </And>

else


strFilter = "<Filter xmlns:gml=""http://www.opengis.net/gml"">"

strFilter  = strFilter & "<PropertyIsLike matchCase=""false"" wildCard=""*"" singleChar=""!"" escapeChar=""/"">"
strFilter  = strFilter & "<PropertyName>" + strAttribName + "</PropertyName>"

if( Len( strAttribValue ) > 3 ) Then
  strFilter  = strFilter & "<Literal>*" + strAttribValue + "*</Literal>"
else
  strFilter  = strFilter & "<Literal>" + strAttribValue + "*</Literal>"
end if

strFilter  = strFilter & "</PropertyIsLike>"
strFilter  = strFilter & "</Filter>"

end if


 strOutputFormat="JSON"

 strWFSRequest = strBaseUrl + "?request=getfeature&maxfeatures=100&service=wfs&version=1.1.0"
strWFSRequest  = strWFSRequest & "&typename=" + strLayerName + "&outputFormat="+ strOutputFormat
strWFSRequest  = strWFSRequest & "&filter=" + strFilter

    '  response.write strWFSRequest
    ' response.end

Set poster_kad = nothing

Set poster = Server.CreateObject("Msxml2.ServerXMLHTTP.6.0")

poster.open "POST", strWFSRequest, false
poster.setRequestHeader "CONTENT_TYPE", "application/json"
poster.send

 response.write poster.responseTEXT

 Set poster = nothing
%>

