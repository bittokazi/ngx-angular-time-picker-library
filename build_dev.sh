#!/bin/bash
ng build ngx-angular-time-picker-library
rm -Rf node_modules/ngx-angular-time-picker-library
cp -r dist/ngx-angular-time-picker-library node_modules/ngx-angular-time-picker-library
npm run start