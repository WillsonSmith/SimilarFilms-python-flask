var builder = (function() {

  return{

    checkHash: function(callback) {
      var answer,
          parts = location.hash.split('/'),
          data;

      if (parts[0] === '#!') {

         answer = confirm("Are you sure you want clear all current movies and add this new set?");
         if (answer) {
            if (parts[0] === '#!'){
              data = decodeURI(location.hash.substr(location.hash.indexOf("/") + 1));
              localforage.setItem('favourites', JSON.parse(data), function(data){
                location.hash = '';
                callback();
              });
            }
          } else{
            callback();
          }
        } else {
          callback();
        }
    },

    setData: function(element, data) {

      var link = element.querySelector('.movie-result__image-link'),
          elTitle = element.querySelector('.title'),
          elRating = element.querySelector('.movie-result__rating'),

          elFav = element.querySelector('.movie-result__heart'),

          img = document.createElement('img'),
          film = data.title,
          id = data.id,
          rating = data.rating,
          imageBaseURL = 'http://image.tmdb.org/t/p/w300/',
          image = data.posterURL;

          img.classList.add('movie-result__image');
          img.src = imageBaseURL + image;
          link.appendChild(img);
          link.setAttribute('href', '/similar/' + id);
          elFav.setAttribute('data-film', film);
          elFav.setAttribute('data-id', id);
          elFav.setAttribute('data-rating', rating);
          elFav.setAttribute('data-image', image);
          elTitle.innerHTML = film;
          elRating.innerHTML = rating;

          return element;

    },

    makeResult: function (element) {
      var dupe = element.cloneNode(true),
          second,
          secondImg,
          toAppend = document.createDocumentFragment();

      var applyTo = document.getElementById('resultId');

      builder.checkHash(function() {
      localforage.getItem('favourites', function(val) {
        var firstResult = document.querySelector('.result'),
            data;

        if (val) {
          data = val.extraData;
        }

        document.getElementById('resultId').removeChild(element);

        for (var index in data) {
          if (data.hasOwnProperty(index)) {
            var attr = data[index];

            second = dupe.cloneNode(true);

            builder.setData(second, attr);
            toAppend.appendChild(second);

          }
        }
        applyTo.appendChild(toAppend);

        // setup.init();

      });
    });
    },

    prepEvents: function(){
      document.getElementById('deleteData').addEventListener('click', function(){
        var answer = confirm("Are you sure you want to remove all movies?");

        if (answer) {
          localforage.removeItem('favourites').then(function(){
            document.location.reload(true);
          });
        }

      }, false);

      document.getElementById('backupMovies').addEventListener('click', function(){
        localforage.getItem('favourites', function(val) {
          var firstResult = document.querySelector('.result'),
              data;

          if (val) {
            val = JSON.stringify(val);
            document.getElementById('textareaLink').value = 'http://similarfilms.com/mine/#!/' + encodeURI(val);
            location.hash = 'textareaLink';
          }
        });
      }, false);
    }
  };

})();


builder.prepEvents();
builder.makeResult(document.querySelector('.movie-result'));
