let movieStore = {
  movies: {}
}

let movieStoreEvents = EventEmitter();
movieStoreEvents.mixin(movieStore);
movieStore.bind('update', function() {
  localforage.setItem('favourited', movieStore.movies, logDataResult);
});

export default movieStore
