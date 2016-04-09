import Dispatcher from 'willson-smith-es2015-dispatcher/dispatcher';
import EventEmitter from 'willson-smith-es2015-event-emitter/eventEmitter';

let body = document.getElementsByTagName('body')[0];

let voteDispatcher = Dispatcher();

let movieStore = {
  movies: {}
}

let movieStoreEvents = EventEmitter();
movieStoreEvents.mixin(movieStore);
movieStore.bind('update', function() {
  localforage.setItem('favourited', movieStore.movies, logDataResult);
});

localforage.getItem('favourited', function(data) {
  movieStore.movies = data;
  Object.keys(movieStore.movies).forEach(function(key) {
    if (movieStore.movies[key]) {
      document.querySelector(`[data-id='${key}']`).classList.add('movie-result__heart--is-active');
    }
  });
});

function logDataResult(data) {
  console.log(data);
}

function updateVote(data) {
  let isActive = data.node.classList.contains('movie-result__heart--is-active');
  data.node.classList.toggle('movie-result__heart--is-active');
  movieStore.movies[data.movie.id] ? movieStore.movies[data.movie.id] = null : movieStore.movies[data.movie.id] = data.movie;
  movieStore.trigger('update');
}

function handleVoteClick(event) {
  let target = event.target;
  if (target.classList.contains('movie-result__heart')) {
    voteDispatcher.dispatch({
      type: 'vote',
      node: target,
      movie: {
        film: target.getAttribute('data-film'),
        id: target.getAttribute('data-id'),
        rating: target.getAttribute('data-rating'),
        image: target.getAttribute('data-image')
      }
    });
  }
}

voteDispatcher.register('vote', updateVote);
body.addEventListener('click', handleVoteClick);
