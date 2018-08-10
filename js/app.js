$(document).ready(function(){
	//splash();
	//setDisplayFlex();  //

	$('#btn-match').click( function(){ 
		$('#match-movie').css("display","block"); 	
		$('main').css("display","none");
		clearResultsDiv();
		showMoviesPosters(matchResult);
	});
	

	$('.btn-back').click( function(){ 
		$('main').css("display","block"); 
		$('#match-movie').css("display","none");
		$('#my-movie-list').css("display","none"); 
		$('#friends-movie-list').css("display","none"); 	
	});

	$('.list-name').click( function(){ 
		$('main').css("display","none"); 
		$('#friends-movie-list').css("display","none"); 	
		$('#my-movie-list').css("display","flex"); 
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

var mainUserMoviesId = [1359, 807, 300669, 694, 381288, 21208, 155, 23483, 19908, 141052, 284053, 299536, 105];
var friendMoviesId = [381288, 264644, 6977, 146233, 274, 346685, 769, 263115, 284054, 299536, 118340, 293660, 752];

var mainUserRecomendations = getUserRecommendation(mainUserMoviesId);
var friendRecomendations = getUserRecommendation(friendMoviesId);

var matchResult = matchMovies(mainUserRecomendations, friendRecomendations);

function getUserRecommendation(array) {
  var recommendedMovies = [];

  for (movieId of array) {
    var settingsSimilarMovies = {
    "async": false,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/" + movieId + "/similar?page=1&language=pt-BR&api_key=b1407b98c04208f2dbc61738b0a7ce0c",
    "method": "GET",
    "headers": {},
    "data": "{}"
    }

    $.ajax(settingsSimilarMovies).done(function (response) {

      for (movie of response.results) {
          recommendedMovies.push(movie.id);
        }
    });
  }

  for (seenMovie of array) {
    for (i = 0; i < recommendedMovies.length; i++) {
      if (seenMovie === recommendedMovies[i]) {
        recommendedMovies.splice(i, 1);
      }
    }
  }
  return recommendedMovies;
}

function matchMovies(user1Rec, user2Rec) {
  var aux = [];
  for (movies1 of user1Rec) {
    for (movies2 of user2Rec) {
      if (movies1 === movies2) {
        aux.push(movies1);
      }
    }
  }

  var aux = aux.filter(function(value, index, array) { 
    return aux.indexOf(value) == index;
  });

  return aux;
}

function showMoviesPosters(array) {
  for (id of array) {
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR&api_key=315d946e45c8e82d7cf81925488ba003",
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

    $.ajax(settings).done(function (response) {
      var posterContainer = document.createElement('div');
      var posterImg = response.poster_path;
      /* var imgTag = '<img class="" src="https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg + '">'; */
      var imgTag = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg).addClass('movie-poster').data(response);
      $(posterContainer).append(imgTag);
      $('#match-movie').append(posterContainer);
      modalContent();
    });
  }
}

function clearResultsDiv() {
  $('#movie-row').empty();
}

//CRIAR EVENTO CLICK NO BOTAO MOSTRAR MEUS FILMES
showMyMovies(mainUserMoviesId);

function showMyMovies(array) {
  for (id of array) {
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR&api_key=315d946e45c8e82d7cf81925488ba003",
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

    $.ajax(settings).done(function (response) {
      var posterContainer = document.createElement('div');
      var posterImg = response.poster_path;
      /* var imgTag = '<img class="" src="https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg + '">'; */
      var imgTag = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg).addClass('my-movie-row-poster').data(response);
      $(posterContainer).append(imgTag);
      $('#my-movie-list').append(posterContainer);
      modalContent();
    });
  }
}

//CRIAR EVENTO CLICK QUANDO CLICAR NO ROSTO DA GEOCONDA PRA MOSTRAR OS FILMES DELA
showMyFriendsMovies(friendMoviesId);

function showMyFriendsMovies(array) {
  for (id of array) {
    var settings = {
      "async": false,
      "crossDomain": true,
      "url": "https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR&api_key=315d946e45c8e82d7cf81925488ba003",
      "method": "GET",
      "headers": {},
      "data": "{}"
    }

    $.ajax(settings).done(function (response) {
      var posterContainer = document.createElement('div');
      var posterImg = response.poster_path;
      /* var imgTag = '<img class="" src="https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg + '">'; */
      var imgTag = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w100_and_h100_bestv2/' + posterImg).addClass('my-friend-movie-row-poster').data(response);
      $(posterContainer).append(imgTag);
      $('#friends-movie-list').append(posterContainer);
      modalContent();
    });
  }
}

function modalContent() {
  $('.movie-poster').each(function() {
  $(this).click(function() {
    $('#info-modal').modal('show');
    $('.modal-title').html($(this).data('title'));
    $('.modal-poster').html($(this));
    $('.modal-description').html($(this).data('overview'));
  });
  });

  $('.my-movie-row-poster').each(function() {
  $(this).click(function() {
    $('#info-modal').modal('show');
    $('.modal-title').html($(this).data('title'));
    $('.modal-poster').html($(this));
    $('.modal-description').html($(this).data('overview'));
  });
  });

  $('.my-friend-movie-row-poster').each(function() {
  $(this).click(function() {
    $('#info-modal').modal('show');
    $('.modal-title').html($(this).data('title'));
    $('.modal-poster').html($(this));
    $('.modal-description').html($(this).data('overview'));
  });
  });
}
