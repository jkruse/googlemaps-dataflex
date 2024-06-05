# googlemaps-dataflex

A DataFlex custom component wrapper for Google Maps.

## Demo

[Available here](https://www.kruse-net.dk/googlemaps/).

## Quickstart

Download either the demo workspace including prebuilt component (GoogleMapsDemo.zip) or just the prebuilt custom component (GoogleMapsComponent.zip) from the [Release page](https://github.com/jkruse/googlemaps-dataflex/releases/latest).

### Demo workspace

If you downloaded the demo workspace, unzip to new folder and open workspace in DataFlex Studio. The studio will copy themes and the JavaScript engine into the `AppHtml` folder.

Register the web application from the studio menu "Tools > Register WebApp...".

Change the Google Maps API key in `AppHtml/Index.html` (see [Get an API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)). The API key already in the file only works on the demo site.

Hit F5 to run the application.

### Custom component

If you downloaded just the custom component, unzip to your existing workspace, add the script includes for CoreJS, the Google Maps API and Custom/GoogleMaps/index.js from [this project](AppHtml/Index.html) to your Index.html, changing the Google API key, `Use cWebGoogleMaps.pkg` from one of your views and add the component to your page.

## Using the source

Clone or download ZIP file of the repository to your computer.

Install [DataFlex](https://www.dataaccess.com/download/dfstudio/). This workspace is setup for version 20.1, but should be easy to migrate.

Install [Node.js](https://nodejs.org/). Latest LTS version recommended. At least v18.12 required.

Install dependencies - from the folder where you cloned or extracted the repository run:

    npm ci

Build the component client-side files (will be placed in `AppHtml/Custom/`):

    npm run build

The component consists of a [DataFlex class](AppSrc/cWebGoogleMaps.pkg) and an [EcmaScript class](src/index.js). If you change the EcmaScript class you need to rebuild the component client-side files. Or to automatically rebuild a non-minifed version whenever you save it, run:

    npm run watch