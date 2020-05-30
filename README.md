# AgentPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.6.

## Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# API Keys Required

You require a google api key with following APIs authorized to it

* Maps JavaScript API
* Geocoding API
* Maps Embed API
* Places API

Once the API key is created. Put that in `environment.ts` and `environment.prod.ts`

Normally you would need 2 keys one for `prod` and one for `dev`


# Backend Server

You need to create / run an appropreate backend server to feed data to this.
The address and port for the backend server is found in both `environment.ts` and `environment.prod.ts`
**set them appropriately**

A POC backend server can be found at `https://bitbucket.org/supun_d/agentportalapi/src/master/`