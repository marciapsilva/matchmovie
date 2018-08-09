$(document).ready(function(){
	//splash();
	//setDisplayFlex();  //

})

function splash(){
	$('#splash').delay(2000).fadeOut(500);  	
  $('#main').delay(3000).fadeIn(500);
}

function setDisplayFlex(){
	setTimeout(function(){
	  $("#main").css("display","flex");
	}, 3000);
}