(function() {
  function finishLazyLoading() {
    console.log('done');
  }
  var webComponentsSupported = ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')
  );

  if (!webComponentsSupported) {
    var script = document.createElement('script');
    script.async = true;
    script.src = '/assets/bower_components/webcomponentsjs/webcomponents-lite.js';
    script.onload = finishLazyLoading;
    document.head.appendChild(script);
  } else {
    finishLazyLoading();
  }
})();