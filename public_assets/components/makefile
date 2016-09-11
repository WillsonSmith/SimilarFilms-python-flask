# This makefile requires both vulcanize and html-minifier to be installed globally via npm
# Will possibly change to local installs and using node_modules/.bin

compile: components-vulcanize.html components-compiled.html

components-vulcanize.html: components.html
	vulcanize  components.html -o components-vulcanize.html --strip-comments --inline-scripts --inline-css

components-compiled.html: components-vulcanize.html
	html-minifier components-vulcanize.html -o components-compiled.html --minify-js true --minify-css true