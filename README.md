## SimilarFilms using Flask

### Polymer version changes, and missing pieces

The Polymer version comes with several improvements, but leaves the app in an unfinished state. Some design has changed, including making the background white, and removing the frame on the results of movies. 
After some consideration, I determined having the title of the film on top of the poster was redundant, as in almost all cases, the poster will give you the title.

It also has been updated to use the movie title on the similar page instead of just showing the movie ID. This is more user friendly, and something that should have existed from the beginning.

The build process right now has a `makefile` that runs `vulcanize` and `html-minifier`. While not finalized, the build process will probably continue to use a `makefile`. Things that may change include:

- location of files
- moving files from one location to another
- handling external minification before vulcanization
- checking if the file has already been vulcanized or minified to skip steps and reduce build time

You cannot currently like films, and the "Mine" page currently does not work. The rest of the app should be functioning as intended.

<img src='http://cl.willsonsmith.com/0a1X292K3c2E/download/IMG_1367.PNG' width='300'>
<img src='http://cl.willsonsmith.com/080K3T1h001Q/IMG_1368.PNG' width='300'>

**This is incomplete - the app works but has several bugs**

This is the initial round of porting over [SimilarFilms](https://github.com/willsonsmith/similarfilms) to the Python Based [Flask](http://flask.pocoo.org) web framework.
While currently in development, it has all the major feature of the original. Currently you cannot back up or delete all of your saved films. There is still cleanup and minor refactoring to do for some code.

### Some additional notes

- I recommend using [pip](https://pip.pypa.io/en/stable/) for package management so you can do `pip install -r requirements`
- I also recommend using [virtualenv](https://virtualenv.pypa.io/en/latest/) to manage an isolated python environment
- If you use [fish shell](https://fishshell.com) like I do, you can use [virtualfish](https://github.com/adambrenecki/virtualfish) as an alternative to virtualenv

#### How I start the server

Since I'm using an environemnt variable for the API key I set up a small bash script to start the server for me
```
#!/usr/bin/env bash
export APIKEY=YOUR_API_KEY_HERE
python run.py
```
