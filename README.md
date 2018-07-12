# Online Azure IIS log analyzer.

A quick tool to analyze the IIS web server access logs from Azure. Just copy and paste the log, and get some instant stats.

## How to use ##

To quickly analyze the IIS logs that you downloaded from Azure:

1. Go to the https://iis-logs.azurewebsites.net/
2. Copy and paste your IIS log into the webpage.

All done! 

## Deploying to your own server ##

To deploy, download the code and run:

```js
npm run build
```

After that, copy the files from the `dist` folder to your server. 

No backend required, but the files won't work on localhost due to Vue.js being used.

For localhost, use `npm run dev`.

## Feedback ##

Feedback and pull requests are welcome.