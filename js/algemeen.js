function IsNumeric(input){ 
    var RE = /^-{0,1}\d*\.{0,1}\d+$/; 
    return (RE.test(input)); 
} 


function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


function createRequestObject() {
  FORM_DATA = new Object();
    // The Object ("Array") where our data will be stored.
  separator = ',';
    // The token used to separate data from multi-select inputs
  query = '' + this.location;
  qu = query
    // Get the current URL so we can parse out the data.
    // Adding a null-string '' forces an implicit type cast
    // from property to string, for NS2 compatibility.
  query = query.substring((query.indexOf('?')) + 1);
    // Keep everything after the question mark '?'.
  if (query.length < 1) { return false; }  // Perhaps we got some bad data?
  keypairs = new Object();
  numKP = 1;
    // Local vars used to store and keep track of name/value pairs
    // as we parse them back into a usable form.
  while (query.indexOf('&') > -1) {
    keypairs[numKP] = query.substring(0,query.indexOf('&'));
    query = query.substring((query.indexOf('&')) + 1);
    numKP++;
      // Split the query string at each '&', storing the left-hand side
      // of the split in a new keypairs[] holder, and chopping the query
      // so that it gets the value of the right-hand string.
  }
  keypairs[numKP] = query;
    // Store what's left in the query string as the final keypairs[] data.<
  for (i in keypairs) {
    keyName = keypairs[i].substring(0,keypairs[i].indexOf('='));
      // Left of '=' is name.
    keyValue = keypairs[i].substring((keypairs[i].indexOf('=')) + 1);
      // Right of '=' is value.
    while (keyValue.indexOf('+') > -1) {
      keyValue = keyValue.substring(0,keyValue.indexOf('+')) + ' ' + keyValue.substring(keyValue.indexOf('+') + 1);
        // Replace each '+' in data string with a space.
    }
    keyValue = unescape(keyValue);
      // Unescape non-alphanumerics
    if (FORM_DATA[keyName]) {
      FORM_DATA[keyName] = FORM_DATA[keyName] + separator + keyValue;
        // Object already exists, it is probably a multi-select input,
        // and we need to generate a separator-delimited string
        // by appending to what we already have stored.
    } else {
      FORM_DATA[keyName] = keyValue;
        // Normal case: name gets value.
    }
  }
  return FORM_DATA;
}



