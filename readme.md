# Making Headlines - Intro to Express

![Daily Planet](http://blogs.smithsonianmag.com/design/files/2013/06/first-daily-planet1.jpg)

Welcome to the Daily Planet. We need your superhuman developer skills to help us share news with the world. We've seen that you have some Express knowledge and need you to make us a MVP website as soon as possible.

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
app.get("/",function(req,res){
  res.send('HELLO TACO!!!');
});
```

At this point you should be able to run `nodemon` and then go to `http://localhost:3000` and see "HELLO TACO!!!".

##Create a home page with a view

* Create a views folder
* Create an `index.ejs`
* Create a partials folder in your views folder
* Create `header.ejs` and `footer.ejs` in the partials folder
* Add HTML to the 3 files created above
* Render the index page on your root route with the header/footer partials.

Change your root route to render your home page (index.ejs)

```js
app.get("/",function(req,res){
  res.render('index.ejs');
});
```

**STOP** At this point we should be able to go to `localhost:3000` and see an html page that is the result of the contents of what is in `index.ejs`, `header.ejs`, and `footer.ejs`.

##Data setup

To store data we need to add an array near the top of the project (index.js) to store articles. Each article will need (at least) a title and a body. Here is an example array that starts with 1 predefined article.

```javascript
var articles = [
  {title: 'Article title', body: 'this is the first article body'}
];
```

**Note:** Articles will be stored in memory, meaning every time the server is restarted via nodemon, the array will be reset to this starting value. The solution to this problem is databases, which we'll get to later on.

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
    * purpose: creates a new article (adds to articles array)
* `get` `/articles/:id`
    * view: views/articles/show.ejs
    * purpose: find an article by id in the array of `articles` and display it.

## Static Pages
Create need the following `site` related routes:

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


