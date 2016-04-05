// picturefill();

var setup = (function app() {


  function checkFavStatus(value) {
    var film;

    results.forEach(function(result) {
      film = result.getAttribute('data-film');

      value.results.forEach(function(valueResult) {
        if (film === valueResult) {
          result.querySelector('.icon-heart').classList.remove('hidden');
          result.querySelector('.icon-heart2').classList.add('hidden');
        }
      });
    });
  }

  function setItem(element) {
    element.querySelector('.icon-heart').classList.toggle('hidden');
    element.querySelector('.icon-heart2').classList.toggle('hidden');
  }

  return {
    init: function() {
      var favourited,
          results = document.querySelectorAll('.result');

      function addFavourite(item, id, rating, url) {
        favourited.results.push(item);
        favourited.extraData[item] = {
          "title": item,
          "id": id,
          "rating": rating,
          "posterURL": url
        };
      }

      function clickEvent(e) {

        var film = this.getAttribute('data-film'),
            id = this.getAttribute('data-id'),
            rating = this.getAttribute('data-rating'),
            posterURL = this.getAttribute('data-image');
        var index;

        if (favourited != null) {
          index = favourited.results.indexOf(film);
        }

        if (index != null && index !== -1) {
          favourited.results.splice(index, 1);
          delete favourited.extraData[film];
          localforage.setItem('favourites', favourited, function() {
            setItem(this);
          }.bind(this));
        } else if (favourited == null) {
          favourited = { "results": [], "extraData": {} };

          addFavourite(film, id, rating, posterURL);
          localforage.setItem('favourites', favourited, function(data) {
            setItem(this);
          }.bind(this));
        } else {
          addFavourite(film, id, rating, posterURL);
          localforage.setItem('favourites', favourited, function(data) {
            setItem(this);
          }.bind(this));
        }
      }

      for (var i = 0, l = results.length; i < l; i++) {
        results[i].querySelector('.fav').addEventListener('click', clickEvent);
      }

      localforage.getItem('favourites').then(function(val) {
        favourited = val;
        checkFavStatus(favourited);
      });
    }
  }
})();
setup.init();
