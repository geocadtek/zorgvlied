function updateStrength(password, aneg, a0, a1, a2, a3, a4, strAction, allowSpace, minchars, maxchars)
{

  var text = new Array(aneg, a1, a2, a3, a4);

  // Div en stertkte bepalen
  var div = (document.getElementById("passwordStrengthTextRight") ? document.getElementById("passwordStrengthTextRight") : document.getElementById("passwordStrengthTextLeft"));
  var result = checkPasswordStrength(password, allowSpace, minchars, maxchars);

  if (password=="" && strAction!='add')
  	{ text[result]=a0;}

  
  if (text[result]==aneg)
  {//document.getElementById("Bewerk").style.visibility="hidden";
  }
  else
  {//document.getElementById("Bewerk").style.visibility="visible";
  }


  // Tekst juist plaatsen
  if(result > 2)
	{div.setAttribute("id", "passwordStrengthTextLeft");}
  else
	{div.setAttribute("id", "passwordStrengthTextRight");}

  // Balk breedte & tekst
  document.getElementById("passwordStrengthBar").style.width = ((4 - result) * 25).toString() + "%";
  div.childNodes[0].nodeValue = text[result];
}

function checkPasswordStrength(password, allowSpace, minchars, maxchars)
{ // Niet-opgegeven parameters
  if(allowSpace !== true) allowSpace = false;
  if(!minchars) minchars = 5;
  if(!maxchars) maxchars = null;

  // Variabelen
  var i, curChar, lastPos, mulChar, tmp;

  // Test-regexen
  var regex = new Array(
	// Zwak
	new Array(new RegExp("^.{1,4}$"), 1),					// Alles korter dan 5 tekens
	new Array(new RegExp("^[a-z]{1,10}$"), 1),				// Kleine letters tot 10 tekens
	new Array(new RegExp("^[a-zA-Z]{1,7}$"), 1),			// Kleine en hoofdletters tot 7 tekens
	new Array(new RegExp("^[0-9]{1,7}$"), 1),				// Cijfers tot 7 tekens
	new Array(new RegExp("^[a-zA-Z0-9]{1,6}$"), 1),			// Cijfers en letters tot 6 tekens
	new Array(new RegExp("^[a-zA-Z]{1,6}[0-9]{1,4}$"), 1),	// Wachtwoorden met een getal (vb: geboortejaar) op het einde

	// Matig
	new Array(new RegExp("^[0-9]{0,3}([a-zA-Z]{1,6}[0-9]{1,6})[a-zA-Z]{0,3}$"), 2),
	new Array(new RegExp("^[^a-zA-Z0-9]{0,1}[a-zA-Z0-9]{0,3}[^a-zA-Z0-9][a-zA-Z0-9]{0,5}$"), 2),
	new Array(new RegExp("^[a-z]{11,}$"), 2),			// Kleine letters vanaf 11 tekens
	new Array(new RegExp("^[a-zA-Z]{8,}$"), 2),			// Kleine en hoofdletters vanaf 8 tekens
	new Array(new RegExp("^[a-zA-Z0-9]{7,10}$"), 2),	// Cijfers en letters vanaf 7 tot 10 tekens

	// Sterk
	new Array(new RegExp("^[0-9]*([a-zA-Z]{1,6}[0-9]{1,6}){1,3}[a-zA-Z]*$"), 3),
	new Array(new RegExp("^[^a-zA-Z0-9]{0,1}([a-zA-Z0-9]{0,}[^a-zA-Z0-9]{1,2}){1,2}[a-zA-Z0-9]{0,5}$"), 3),
	new Array(new RegExp("^[0-9]*([a-zA-Z]+[0-9]+){5,}[a-zA-Z]*$"), 3),
	new Array(new RegExp("^[a-zA-Z0-9]{11,}$"), 3), // Cijfers en letters vanaf 11 tekens

	// Zeer sterk
	new Array(new RegExp("^[a-zA-Z0-9]*([^a-zA-Z0-9]{2,}[a-zA-Z0-9]*)+$"), 4),
	new Array(new RegExp("^[^a-zA-Z0-9]*([a-zA-Z0-9]+[^a-zA-Z0-9]+){2,}[a-zA-Z0-9]*$"), 4),
	new Array(new RegExp("^[^a-zA-Z0-9]*([a-zA-Z0-9]+[^a-zA-Z0-9]+){1,}[a-zA-Z0-9]{5,}$"), 4)
  );

/* Comment want: (CJE)
     - spaties worden toch niet goedgekeurd in de regexes
     - de herhaal-functies blijken buggy 
     
  // Overscheiden parameters?
  if((allowSpace == false && (new RegExp("[\\s ]")).exec(password)) || password.length < minchars || (maxchars && password.length > maxchars))
	return 0;
	if((allowSpace == false && (new RegExp("[\' ]")).exec(password)) || password.length < minchars || (maxchars && password.length > maxchars))
	return 0;
	if((allowSpace == false && (new RegExp("[\, ]")).exec(password)) || password.length < minchars || (maxchars && password.length > maxchars))
	return 0;

  // 3x (of meer) hetzelfde teken na elkaar -> vervangen door 1x
  for(i = 0; i < password.length; i++)
  {
  	curChar = password.charAt(i);				// Huidig teken
  	lastPos = password.lastIndexOf(curChar);	// Laatste positie

	if(i != lastPos && i != (lastPos - 1))
	{ // Komt meerdere keren voor (niet 2x na elkaar)
	  mulChar = curChar + curChar;

	  do
		mulChar += curChar;
	  while(password.indexOf(mulChar + curChar) != -1)

	  tmp = password.split(mulChar);
	  password = tmp.join(curChar);
	}
  }

  // Meerdere malen dezelfde reeks na elkaar
  if(password.length > 2)
  {
	i = 1;
	mulChar = password.charAt(0);
	curChar = password.charAt(1);

	do
	{
	  i++;
	  mulChar += curChar;
	  curChar = password.charAt(i);
	}
	while(password.length > (i + 1) && password.indexOf(mulChar + curChar, i) != -1)

	tmp = password.split(mulChar);
	password = tmp.join(mulChar);
  }*/

  for(i = 0; i < regex.length; i++)
  { // Regexen testen
	if(regex[i][0].exec(password))
	{
	  return regex[i][1];
	  break;
	}
  }

  return 1; // Was 3 (Sterk)? Default naar "Zwak" gezet. CJE;
}
