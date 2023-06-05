## Take Home Task: React and OpenLayers

Your task is to implement a minimal mapping application in React using OpenLayers (openlayers.org/) and the Nominatim reverse geocoder (https://nominatim.org/release-docs/latest/api/Reverse/).

A geocoder is a program that turns a string (e.g. an address or the name of a place) into the coordinates that represent the location of that address/place. Turning coordinates into the name of the place/address is called reverse geocoding.

The web app should consist of a full screen map with an OpenStreetMap background map. Whenever a user clicks on the map canvas, the name of the place most likely associated with the coordinates where the user clicked should be displayed in a popup that appears on top of the map, covering a part of the map canvas. This user interaction should be repeatable (meaning the user should not have to refresh the page to repeat this process).

Some more things to consider:

please use TypeScript for this task
you can use the publicly available Nominatim instance at https://nominatim.openstreetmap.org/
the popup showing the most likely place name can be anywhere on top of the map (e.g. simply in the middle of the screen); we'll give you bonus points though if the popup is anchored at the location where the user clicked
keep it simple, don't overthink the file/folder structure too much, and simply use Vite or any other way to quickly set up a React App from scratch
focus on the functionality, the UI design can be completely disregarded

## UI

![Screenshot 2023-06-05 at 12 23 31 PM](https://github.com/wilsonTheRacketBall/react-and-openlayers/assets/130399849/318c8bf3-24d8-4172-bccd-c9c0b5641f15)

## Scripts

```
npm install
npm run start
```

For testing

```
npm run test
npm run e2e
```

![ezgif com-video-to-gif](https://github.com/wilsonTheRacketBall/react-and-openlayers/assets/130399849/ca9fd55f-30da-4f08-960e-2e2fc039bf7c)


