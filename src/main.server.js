import path from 'path';
import express from 'express';
import compression from 'compression';
import nodalytics from 'nodalytics';
import ReactDOMServer from 'react-dom/server';

import Document from './components/document';
import subreddits from './data/subreddits';
import fetchSubreddit from './services/fetch-subreddit.js';

if (process.env.NODE_ENV === 'production') {
  require('../.public/parcel-manifest.json')['main.client.js'];
}

// // // Init express app
require('dotenv').config();

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy');
  app.use(compression({
    threshold: false,
  }));
  app.use(nodalytics(process.env.GA_CODE_SERVER));
} else {
  app.use(express.static(path.join(__dirname, '../.public')));
}

// // // Caching
// TODO Put in another module
// TODO Cache all SSR requests
const hotVideos = {};
const fiveMinutes = 300000;
function refreshVids() {
  for (const subreddit of subreddits) {
    fetchSubreddit(subreddit, 'hot')
      .then(videos => {
        hotVideos[subreddit.toLowerCase()] = videos;
      })
      .catch(err => console.log(err));
  }
  setTimeout(refreshVids, fiveMinutes);
}
refreshVids();

// // // Endpoints
app.get('/api/videos/:subreddit/:sort/:timeRange', (req, res) => {
  const subreddit = req.params.subreddit.toLowerCase();
  const sort = req.params.sort.toLowerCase();
  const timeRange = req.params.timeRange.toLowerCase();
  if (subreddit in hotVideos && sort === 'hot') {
    res.json(hotVideos[subreddit]);
  } else {
    fetchSubreddit(subreddit, sort, timeRange)
      .then(videos => res.json(videos))
      .catch(err => console.log(err));
  }
});

app.use((req, res) => {
  if (process.env.NODE_ENV === 'production') {
    let subreddit = location.pathname
      .replace(/\/{2,}/g, '/')
      .replace(/^\/|\/$/g, '')
      .split('/')[1];

    if (subreddit === undefined) {
      subreddit = 'videos';
    }

    const script = '/main.client.js';
    // TODO Map preload resources?
    res.write(`
    <!doctype html><html lang="en">
    <title>vose.tv - /r/${subreddit}</title>
    <link rel="preload" href="${script}" as="script">
    `);
    res.write(`<div id='content'>`);
    const reactStream = ReactDOMServe.renderToNodeStream(<MyPage/>);
    reactStream.pipe(res, { end: false });
    reactStream.on('end', () => {
      // TODO write script with manifest
      res.write(`</div>
        <script src="${script}"></script>
      `);
      res.end();
    });
    // ReactDOMServer.renderToNodeStream(<Document />).pipe(res);
    // res.status(200).send(`
// <!doctype html>
// <html lang="en">
// <meta charset="utf-8">
// <meta http-equiv="x-ua-compatible" content="ie=edge">
// <title>vose.tv - /r/videos</title>
// <meta name="description" content="Watch the top videos on vose.tv">
// <meta name="viewport" content="width=device-width, initial-scale=1">
// <meta id="theme-color" name="theme-color" content="#20262b">
// <link rel="stylesheet" href="/main.css">

// <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png">
// <meta name="twitter:card" content="summary">
// <meta name="twitter:site" content="@simonmlaroche">
// <meta name="twitter:creator" content="@simonmlaroche">
// <meta property="og:url" content="https://vose.tv">
// <meta property="og:title" content="vose.tv">
// <meta property="og:description" content="Watch the top videos on vose.tv">
// <meta property="og:image" content="https://vose.tv/vose-card.png">
// <meta property="og:type" content="website">
// <meta property="fb:app_id" content="1725542221039137">

// <meta name="apple-mobile-web-app-capable" content="yes">
// <meta name="apple-mobile-web-app-status-bar-style" content="black">
// <meta name="apple-mobile-web-app-title" content="vose.tv">
// <!-- <link rel="apple-touch-startup-image" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" href="/img/startup-retina.png"> -->

// <body>
// <div id="root" class="app">${reactHtml}</div>
// <div id="modal"></div>
// <script src="/bundle.js"></script>
// `);
  } else {
    res.status(200).send(`
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>vose.tv - /r/videos</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta id="theme-color" name="theme-color" content="#20262b">
<link rel="stylesheet" href="/main.client.css">
<body>
<div id="root" class="app"></div>
<div id="modal"></div>
<script src="/main.client.js"></script>
`);
  }
});

/**
 * Start server
 */
app.listen(port, () => console.log(`listening at http://localhost:${port}`));