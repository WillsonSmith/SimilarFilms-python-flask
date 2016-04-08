import Dispatcher from 'willson-smith-es2015-dispatcher/dispatcher';
import EventEmitter from 'willson-smith-es2015-event-emitter/eventEmitter';

let body = document.getElementsByTagName('body')[0];

let voteDispatcher = Dispatcher();

function logDataResult(data) {
  console.log(data);
}

function addRemoveFavourite({ alreadyActive = false, movie = {}}) {
  if (alreadyActive) {
    localforage.removeItem('favourited', logDataResult);
  } else {
    localforage.setItem('favourited', movie, logDataResult);
  }
}

function updateVote(data) {
  let isActive = data.node.classList.contains('movie-result__heart--is-active');
  console.log(isActive)
  addRemoveFavourite({alreadyActive: isActive, movie: data.movie});
  data.node.classList.toggle('movie-result__heart--is-active');
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
