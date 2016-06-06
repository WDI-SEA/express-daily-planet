# Making Headlines - Intro to Express

![Daily Planet](http://blogs.smithsonianmag.com/design/files/2013/06/first-daily-planet1.jpg)

Welcome to the Daily Planet. We need your superhuman developer skills to help us share news with the world. We've seen that you have some Express knowledge and need you to make us an MVP website as soon as possible.

You'll need to use an array of `articles` to create and display articles.

##Basic Setup

To get going we need to set up a basic express server (see today's notes for full details).

* Fork/clone this repository
* Run `npm init` in the directory
* Install express, ejs, and body-parser via npm
* Create an index.js file
* Setup a basic express server with a root route

Use this for your basic root route just to make sure it is working.

```js
app.get("/",function(req,res) {
  res.send('HELLO TACO!!!');
});
```

At this point you should be able to run `nodemon` and then go to `http://localhost:3000` and see "HELLO TACO!!!".

##Create a home page with a view

* Create a views folder
* Create an `index.ejs`
* Add HTML to the file created above
* Render the index page on your root route

Change your root route to render your home page (index.ejs)

```js
app.get("/", function(req, res) {
  res.render('index.ejs');
});
```

**STOP** At this point we should be able to go to `localhost:3000` and see an html page that is the result of the contents of what is in `index.ejs`. If you'd like, feel free to use partials for parts of this page.

##Data setup

To store data, we can read and write files using the `fs` module. Specifically, we can read and write JSON files. Create a folder called `data` in the project and create a JSON object with a sample article.

```json
[
  {
    "title": "Article title",
    "body": "This is the first article body"
  }
]
```

We can read this file using functions provided by `fs`. Note that `fs` stands for *file system*, and it's included with Node (no need to install it via npm).

**Read a JSON file**

```js
var fs = require('fs');
var fileContents = fs.readFileSync('./data.json');
var data = JSON.parse(fileContents);
```

**Write a JS object to a JSON file**

```js
var fs = require('fs');
fs.writeFileSync('./data.json', JSON.stringify(data));
```

## Routes

You'll need to create the following `article` routes:

* `get` `/`
    * view: views/index.ejs
    * purpose: Serve the homepage of your site.
* `get` `/articles`
    * view: views/articles/index.ejs
    * purpose: displays a list of all articles
* `get` `/articles/new`
    * view: views/articles/new.ejs
    * purpose: displays a form that users use to create a new article
* `post` `/articles`
    * view: none (redirects to /articles after the article is created)
    * purpose: creates a new article (adds to articles array and saves the file)
* `get` `/articles/:id`
    * view: views/articles/show.ejs
    * purpose: find an article by id in the array of `articles` and display it.

## Static Pages
Create the following `site` related routes. You can use EJS with these pages, but you won't be passing any data.

* `get` `/about` serve a static about daily planet page.
* `get` `/contact` serve a static `contact` page.

## Structure

All your article related views should be in an `views/articles` folder. Each article should utilize `ejs` to render the page. Your `site` related views `about` and `contact` can also have a folder `views/site`. You just need to render the file using the correct path, such as `res.render('site/about')`.


## Styling (Bootstrap, Materialize, etc.)

Style the page and include a navigation bar to help the user navigate the site.

### What about static files, like CSS and front-end JS?

We're getting to the big leagues now, so we'll let you figure that out on your own. [Express documentation is a useful resource](http://expressjs.com/starter/static-files.html).


## Bonus

####Add a search form

* Create a search form (can be on home page or articles index)
* Accept `q` query string on your articles route `/articles?q=search+term`
    * find how to access the query string from the request (Hint: the query isn't in `req.params`)
    * displays list of articles filtered by search term
    * ensure the route still works without a query string (displays all articles)
* There's no magic back-end solution to filtering! Use what you know about setting up routes, figure out how to access the query string and use regular JavaScript logic and array manipulation to build up an array of results.

