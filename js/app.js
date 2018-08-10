$(document).ready(function(){
	//splash();
	//setDisplayFlex();  //

	$('#btn-match').click( function(){ 
		$('#match-movie').css("display","block"); 	
  	$('main').css("display","none");
	});
	

	$('.btn-back').click( function(){ 
		$('main').css("display","block"); 
		$('#match-movie').css("display","none"); 
	});

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
