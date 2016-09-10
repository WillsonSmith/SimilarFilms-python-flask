# This makefile requires both vulcanize and html-minifier to be installed globally via npm

compile: vulcanize minify removevulcan

vulcanize:
	vulcanize  components.html -o components-vulcanize.html --strip-comments --inline-scripts --inline-css

minify:
	html-minifier components-vulcanize.html -o components-compiled.html --minify-js true --minify-css true

removevulcan:
	rm components-vulcanize.html