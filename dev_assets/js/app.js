import Dispatcher from 'willson-smith-es2015-dispatcher/dispatcher';
import smallDataStore from 'willson-smith-es2015-small-data-store/smallDataStore';

let similarFilmsStore = smallDataStore();
let favouriteStore = similarFilmsStore.new();

let voteDispatcher = Dispatcher();

function sendVote(data) {
  console.log('test')
  console.log(data);
}

voteDispatcher.register("vote", sendVote);

[...document.querySelectorAll('.result')].forEach(function(result) {
  result.querySelector('.fav').addEventListener('click', function(fav) {
    voteDispatcher.dispatch({
      type: "vote",
      data:  {
        value: true
      }
    });
  });
});
