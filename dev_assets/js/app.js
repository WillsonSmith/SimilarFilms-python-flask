import Dispatcher from 'willson-smith-es2015-dispatcher/dispatcher';
import movieStore from './modules/movieStore';
import builder from './build';

let body = document.getElementsByTagName('body')[0];

let voteDispatcher = Dispatcher();

function setAlreadyFavourited(key) {
  let movieItem = document.querySelector(`[data-id='${key}']`);
  if (movieStore.movies[key] && movieItem) {
    movieItem.classList.add('movie-result__heart--is-active');
  }
}

localforage.getItem('favourited', function(data) {
  movieStore.movies = data || {};
  let movieStoreKeys = Object.keys(movieStore.movies);
  movieStoreKeys.forEach(setAlreadyFavourited);

  let buildTemplate = document.querySelector('[data-build-template]');
  if (buildTemplate) {
    builder(buildTemplate, movieStoreKeys.map((key) => movieStore.movies[key]));
  }
});

function updateVote(data) {
  let isActive = data.node.classList.contains('movie-result__heart--is-active');
  let movieExists = movieStore.movies[data.movie.id];
  if (movieExists) {
    movieStore.movies[data.movie.id] = null;
  } else {
    movieStore.movies[data.movie.id] = data.movie;
  }

  data.node.classList.toggle('movie-result__heart--is-active');
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
