picturefill();

var setup = (function app(){

  return {

    init: function(){
    var favourited,
        results = document.querySelectorAll('.result');

    function checkFavStatus(value){

      var film;

      for (var i = 0, l = results.length; i < l; i++){

        film = results[i].getAttribute('data-film');

          for (var j = 0, v = value.results.length; j < v; j++){

            if (film === value.results[j]){

              results[i].querySelector('.icon-heart').classList.remove('hidden');
              results[i].querySelector('.icon-heart2').classList.add('hidden');

            }

          }

      }
    }

    function clickEvent(e){

      var film = this.getAttribute('data-film'),
          id = this.getAttribute('data-id'),
          rating = this.getAttribute('data-rating'),
          posterURL = this.getAttribute('data-image');
      var index;

      if (favourited != null) {

        index = favourited.results.indexOf(film);

      }
      function setItem(element){

        element.querySelector('.icon-heart').classList.toggle('hidden');
        element.querySelector('.icon-heart2').classList.toggle('hidden');

      }

      function addFavourite(item, id, rating, url){

        favourited.results.push(item);

        favourited.extraData[item] = {

          "title": item,
          "id": id,
          "rating": rating,
          "posterURL": url

        };

      }

      if (index != null && index !== -1) {

        favourited.results.splice(index, 1);
        delete favourited.extraData[film];

        localforage.setItem('favourites', favourited, function(){

          setItem(this);

        }.bind(this));

      } else if (favourited == null) {

        favourited = { "results": [], "extraData": {} };

        addFavourite(film, id, rating, posterURL);

        localforage.setItem('favourites', favourited, function(data){

          setItem(this);

        }.bind(this));
        //setItem(this);


      } else {

        addFavourite(film, id, rating, posterURL);

        localforage.setItem('favourites', favourited, function(data){

          setItem(this);

        }.bind(this));

      }


    }

    for (var i = 0, l = results.length; i < l; i++) {

      results[i].querySelector('.fav').addEventListener('click', clickEvent);

    }


    localforage.getItem('favourites').then(function(val){

      favourited = val;
      checkFavStatus(favourited);

    });


  }
  /*localforage.getItem('favourites').then(function(val){

    console.log(val);

  });*/
  //localforage.setItem('favourites', { results: [], extraData: {} }, function(){
  //localforage.removeItem('favourites', function(){
  //init();
  //});
  //});
  };


})();
setup.init();

/*
localforage.setItem('favouriteData', { results: [
{
  "title": "The Wolf of Wall Street",
  "id": "106646",
  "rating": "8",
  "posterURL": "wAgdJRx4uZ0u4uzu34NOMvtjLAR.jpg"
},
{
  "title": "Frozen",
  "id": "109445",
  "rating": "7.7",
  "posterURL": "jIjdFXKUNtdf1bwqMrhearpyjMj.jpg"
},
{
  "title": "The Hunger Games: Catching Fire",
  "id": "101299",
  "rating": "7.7",
  "posterURL": "tAhSyLxpaZJCr-9oc2a3flvC2B7x.jpg"
}
]}
*/
