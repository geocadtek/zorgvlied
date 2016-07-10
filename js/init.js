// Preload Images
img1 = new Image(16, 16);  
img1.src="images/spinner.gif";

img2 = new Image(220, 19);  
img2.src="images/ajax-loader.gif";

// When DOM is ready
$(document).ready(function(){

// Launch MODAL BOX if the Login Link is clicked
$("#login_link").click(function(){
$('#login_form').modal();
});

// When the form is submitted
$("#status > form").submit(function(){  

// Hide 'Submit' Button
$('#submit').hide();

// Show Gif Spinning Rotator
$('#ajax_loading').show();

// 'this' refers to the current submitted form  
var str = $(this).serialize();  

// -- Start AJAX Call --

$.ajax({  
    type: "POST",
    url: "do-login.asp",  // Send the login info to this page
    data: str,  
    success: function(msg){  
   
$("#status").ajaxComplete(function(event, request, settings){  
 
 // Show 'Submit' Button
$('#submit').show();

// Hide Gif Spinning Rotator
$('#ajax_loading').hide();  

 if(msg == 'OK') // LOGIN OK?
 {  
 var login_response = '<div id="logged_in">' +
	 '<div>' + 
	 '<div><img src="../i/RoVerkenner_logo.png"> '+ 
	 '<div id="header">U bent succesvol ingelogged!</div><p><img src="../i/wait.png"> Nog een moment geduld a.u.b...</p></div></div>' ;  

$('a.modalCloseImg').hide();  


 
 $(this).html(login_response); // Refers to 'status'

// After 0.01 seconds redirect the 
setTimeout('go_to_private_page()', 10); 
 }  
 else // ERROR?
 {  
 var login_response = msg;
 $('#login_response').html(login_response);
 }  
      
 });  
   
 }  
   
  });  
  
// -- End AJAX Call --

return false;

}); // end submit event

});

function go_to_private_page()
{
window.location = 'cad.asp'; // Members Area
}