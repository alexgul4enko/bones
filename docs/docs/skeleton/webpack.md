---
id: webpack
title: Webpack configurations
sidebar_label: Webpack configurations
---

If you're not already familiar with webpack then you may want to read official [webpack documentation](https://webpack.js.org/concepts/).

As a core fundament of flexible webpack configuration, we use [webpack-blocks](https://github.com/andywer/webpack-blocks). That makes webpack configuration much easier and reusable. All configs are splitted to separate presets that you can find in folder `presets`


## ~~assets~~ 
block to handle static files. By default it will copy all assets files (images and fonts) rename it with unique hash name and put to `dist/assets` folder. 
All u need to configure your ngnix to serve all files from `dist` folder as a static. 

:::tip

Note that u should not be worried about what is a folder for static files, webpack will search for static files at hole your project.But it is more consider way to store all image files in `img` folder and fonts in `fonts` folder.

:::

## ~~babel~~

block that overrides standard [babel block](https://github.com/andywer/webpack-blocks/tree/master/packages/babel)  and changes only `exclude` configuration.

:::caution

Please do not remove this preset. This is temporary solution, but to make everything work fine we should this preset to be defined

:::

## ~~postcss~~

block to handle postcss syntax with [postcss-loader](https://github.com/postcss/postcss-loader)

## ~~sass~~

block to handle Sass/SCSS files and compile to css with [sass-loader](https://webpack.js.org/loaders/sass-loader)

## ~~styles~~

block that will use [css-modules](https://github.com/css-modules/css-modules) plugin with [sass-loader](https://webpack.js.org/loaders/sass-loader) and [postcss-loader](https://github.com/postcss/postcss-loader)

By default it will skip css-modules compilation when SSR is true.


## ~~proxy~~

This block only uses for development purposes. 
By default webpack will run [dev-server](https://webpack.js.org/configuration/dev-server/) on http://localhost:3000, so that to avoid cross origin errors you can simply proxy your backend server to same destination as webpack dev-server.

To configure this block u can use env variables:


#### ~~BACKEND_URL~~ **[URL]** 

Specify the url where your backend server is runing. It could be for example http://localhost:8000 or remote url https://your.domain.com.

:::caution

Please, pay attantion that **BACKEND_URL** should not contain trailing slash

:::


#### ~~API_URL~~ **[String]** 

Specify ngnix configuration for REST API url, for example `/api/v1/`. With this configuration all HTTP request from http://localhost:3000/api/v1/* will proxy to 
```javascript 
`${BACKEND_URL}+${API_URL}` => http://localhost:8000/api/v1/
```

:::caution

Please, pay attantion that **API_URL** should contain trailing slash

:::


#### ~~PROXY~~ **[Array<String\>]** 
Array of andpoints to proxy default:
```javascript
["${API_URL}", "/static/", "/media/"]
```
Please pay attantion that API_URL included automatically to proxy. If you need more urls to proxy u can easy add url to this array, or remove unnecessary.


#### ~~SSR~~ **[Boolean]**  
This flag mostly can be used to develop MPA (multi-page applications), when you have backend with some of templates langugages, so that all content is served from backend and from front-end part you need just to add styles and small user iteractions using javascript.

Please pay attantion that this is not SSR like next.js. This is just proxy configuration, that means that all api request will be served from backend except frontend assets.


#### ~~DEV_SERVER_PORT~~ **[Integer]** 
Port to run webpack dev-server [default 3000].

:::tip

As a good practice in your javascript code it is better to use relative url path instead of absolute.

_Bad:_ 
```javascript
fetch('https://localhost:3000/api/v1/users')
```
~~Good:~~
```javascript
fetch('/api/v1/users')
```

:::

## ~~react~~

Block to handle [JSX](https://reactjs.org/docs/introducing-jsx.html) syntax.
This block will add [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) and [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow) presets.

Additionally, this block will add [babel-plugin-react-require](https://www.npmjs.com/package/babel-plugin-react-require) plugin. So that it is not required anymore to write

```javascript
import React from 'react'
```

## ~~spa~~

block that will be mostly use in pair with [react](/bones/docs/skeleton/webpack#react) preset.

This block uses [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) to inject links to compiled javascript and css files into htlm. 

Also this plugin will add a hash in the filename which changes every compilation and help you to distribute your code avoiding browser cache.

:::caution

Please, pay attantion that it is important to use spa and react presets at the same time.

:::

## ~~sentry~~

block to upload [Sentry](https://sentry.io/welcome/) source maps.
To configure this plugin you should use global environment variables. Please read this [docs](https://docs.sentry.io/cli/configuration/) for more information

## ~~Module resolver~~

webpack configuration includes module resolver rule that will find a path relative to `src/app` folder, so that, you can avoid lot of `../../../` in your code and use path relative to `src/app` folder.


For example:

```javascript
import { Link } from 'common/router'  => /src/app/common/router/index.js
```

## ~~Cross browser support~~

We use [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) and [Autoprefixer](https://github.com/postcss/autoprefixer) to support modern syntax in different browsers. To configure this plugins you can use .browserslistrc file.

## ~~Adding new env variable~~

There are several steps how to define env variable in .env file and than use it in your javascript code.

1. Add variable to .env file

```properties
.env

MY_CUSTOM_VARIABLE=TEST
```

2. Add variable in webpack.config.babel.js

```javascript

setEnv([..., 'MY_CUSTOM_VARIABLE'])
```

2. Use variable in your javascript

```javascript
console.log(process.env.MY_CUSTOM_VARIABLE)
```




