# Bible Map Project

## First setup

- Download QGIS (https://www.qgis.org)

![Alt text](assets/Screenshot%202022-12-29%20at%2012.59.54.png)

- Download Github Desktop (https://desktop.github.com)

![Alt text](assets/Screenshot%202022-12-29%20at%2014.35.26.png)

- Download Node.js (https://nodejs.org)

![Alt text](assets/Screenshot%202022-12-29%20at%2012.53.52.png)

- Open the terminal, navigate into the project with `cd`, then install the dependencies with `npm install`

![Alt text](assets/Screenshot%202022-12-29%20at%2013.00.00.png)


## Preview the project

- In the terminal, start the preview with `npm run develop`

![Alt text](assets/Screenshot%202022-12-29%20at%2013.05.32.png)

- Open http://localhost:8000 in a browser

![Alt text](assets/Screenshot%202022-12-29%20at%2013.06.35.png)


## Add data points

- Open the .csv file, make sure the columns are named (`name_english`, `name_arabic`, `x`, `y`, `reference`, `description_english`, `priority`)

![Alt text](assets/Screenshot%202022-12-29%20at%2013.40.27.png)

- Move the .csv file inside the `/data` folder, add it into the QGIS project

![Alt text](assets/Screenshot%202022-12-29%20at%2013.41.24.png)

- Preview the changes, update the `priority` fields if needed (ex: 6, default: 12)

![Alt text](assets/Screenshot%202022-12-29%20at%2013.46.05.png)


## Add data paths

- Open the .shp file in QGIS, right-click on the layer, then `Export` and `Save Features As`

![Alt text](assets/Screenshot%202022-12-29%20at%2013.59.29.png)

- Delete the original layer in QGIS, click on `Toggle Editing` (pencil) and `Open Attribute Table` (spreadsheet)

![Alt text](assets/Screenshot%202022-12-29%20at%2014.11.03.png)

- Add new `color` and `weight` fields

![Alt text](assets/Screenshot%202022-12-29%20at%2014.15.41.png)

- Click `Toggle multi edit mode` (pencil and rows), `Select all` (rows), add the `color` (ex: #FF0000, default: black) and `weight` (ex: 4, default: 2), and click `apply changes`

![Alt text](assets/Screenshot%202022-12-29%20at%2014.19.04.png)

- Click `Save Layer Edits` (disk and pencil) and `Save Project` (disk)

![Alt text](assets/Screenshot%202022-12-29%20at%2014.27.55.png)

- Preview the changes

![Alt text](assets/Screenshot%202022-12-29%20at%2014.29.52.png)


## Upload the changes

- Open Github Desktop, write a summary and click `Commit to main`

![Alt text](assets/Screenshot%202022-12-29%20at%2014.33.17.png)

- Click `Push origin`, wait a few minutes, see the changes at https://bible-map-project.github.io/bible-map-project

![Alt text](assets/Screenshot%202022-12-29%20at%2014.38.01.png)