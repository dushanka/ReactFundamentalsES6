 ### React w/ES6+ project implementation for the PluralSight React Fundamentals course
 _provided by Clayton Long_                         
 _course instruction and original materials provided by Liam McLennan_

 #### Getting Started

  1. Ensure Node and NPM are installed
  2. From the project root execute 'npm install' to install node dependencies for the project
  3. From the project root execute 'npm run build' to install and inject bower vendor front end dependencies

  #### Project Organization

  * ./src -> the front end application source code
  * ./src/css -> application css files
  * ./src/images -> application images
  * ./src/js -> application JavaScript
  * ./src/lib -> 3rd party front end application code (from bower)

  #### Project Files

  * .bowerrc -> configuration settings for bower (i.e. the directory where bower packages reside locally)
  * .editorconfig -> basic configuration for supported IDEs (e.g. 2 spaces/tab, return chars, etc.)
  * .gitignore -> tells Git what to leave out of commits
  * bower.json -> bower dependencies & related config
  * gulpfile.babel.js -> ES6+ gulpfile script
  * package.json -> npm project configuration

  #### NPM Tasks

  * build -> installs the bower dependencies & injects them into tagged files in the ./src directory (i.e. index.html)

  #### Other Notes

  index.html is the main entry page for the application, it is suggested that you run it from a Web server. Webstorm
  will automagically do this for you if you select 'Open In Browser' on index.html. Otherwise, you may want to use
  something like Mongoose.

  The main application JavaScript file is app.babel.js. index.html uses babel-browser to do in browser ES6+ and JSX
  transformations. Any JavaScript to be transformed must have a type="text/babel". The extension 'babel.js' lets gulp
  know to to inject those files as scripts with type="text/babel". That's why app.babel.js works great with JSX and
  ES6+ without having to be transpiled or converted to JavaScript before opening in a browser.
