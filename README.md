# googlemaps-dataflex

A DataFlex custom component wrapper for Google Maps.

## Demo

[Available here](https://www.kruse-net.dk/googlemaps/)

## Getting started

Install [DataFlex](https://www.dataaccess.com/download/dfstudio/). This workspace is setup for version 19.1, but should be easy to migrate.

Install [Node.js](https://nodejs.org/). Version 10 or later will do nicely.

Install dependencies - from your googlemaps-dataflex folder run:

    > npm install

Build the component client-side files (will be placed in `AppHtml/Custom/`):

    > npm run build

## To run the demo application

Start the DataFlex Studio and open the GoogleMaps workspace inside your googlemaps-dataflex folder. The studio will copy themes and the JavaScript engine into the `AppHtml` folder.

Register the web application from the studio menu "Tools > Register WebApp...".

Change the Google Maps API key in `AppHtml/Index.html` (see [Get an API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)).

Hit F5 to run the application.

## To use to component in another application

Copy client-side files into your application (you need to build these first, see Getting started above):

    > xcopy AppHtml\Custom <path to your application>\AppHtml\Custom /e /i

Either copy `AppSrc/cWebGoogleMaps.pkg` to your application AppSrc folder, or add the GoogleMaps workspace as a library ("Tools > Maintain Libraries... > Add Library...").

Add script includes for CoreJS, the Google Maps API and index.js from this workspace to your `Index.html`.