# Travel plan by Haley

Udacity FrontEnd Nanodegree Final Project

## Introduction

User needs to input itinerary information of travel plan.

- City, Start Date, End Date

API will get the weather of 16days from today and the picture of the city.
Minimal decoration is applied.
Function works fine.

## File Structure

- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - src folder
    - server folder
      - `server.js`
    - client folder
      - `app.js`
      - html/views folder
        - `index.html`
      - js folder
        - `formHandler.js`
        - `dateChecker.js`
      - styles folder
        - `style.scss`

## Project Steps

Branches are named by each step.

#### main

- Git repository was created

#### 0-init-structure-setup

- Initial file directory structure was created

#### 1-npm-webpack-install

- Install npm and webpack

#### 2-webpack-build

- Setup Dev/Prod mode in webpack

#### 3-sass-loader-dev-fix

- Install loaders /plugins (babel, sass , html-webpack-plugin, clean-webpack-plugin)
- Fix dev (npm i -D webpack-cli@3)

#### 4-geonames-setup

- Setup API to get coordinate of the city

#### 5-weather-date-setup

- Get 16 days of forecast weather from weatherBit
- Limit start date within the forecast 16 days (Date type, min-max setting)
- Validate end date is later than start date (checkDate)

#### 6-pixabay-api-setup

- Get photos from pixabay
- Display at most 8 photos to the browser

#### 7-ui-update-jest-setup

- Render weather data and photo data to information section
- Test environment setup with Jest

#### 8-travel-summary-style-setup

- Calculate duration and departing date from input date values
- Style improve for information section

#### 9-service-worker-setup

- Setup service worker
- Cache issue still remains. Any advice will be welcomed.
