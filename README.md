## SimilarFilms using Flask

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
