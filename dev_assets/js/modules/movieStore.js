import EventEmitter from 'willson-smith-es2015-event-emitter/eventEmitter';
let movieStore = {
  movies: {}
}

function logDataResult(data) {
  console.log(data);
}

let movieStoreEvents = EventEmitter();
movieStoreEvents.mixin(movieStore);
movieStore.bind('update', function() {
  localforage.setItem('favourited', movieStore.movies, logDataResult);
});
export default movieStore;
