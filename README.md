# SpaceApp

This is simulation of space operation application. 
Two types of users: Operator, Cosmonaut.
Operator can register to the system using his email address. Next he can create/edit cosmonauts, spacecrafts and spaceflights.
He can see all needed information in his main dashboard, as ongoing spaceflights, or destruction warnings...

Cosmonauts can see their spaceflights and they can use chat on ongoing one. They can as well start auto destruction their current spacecraft.

You can see deployed demo at [Heroku](https://space-app-backend.herokuapp.com/)

This project was made in my free time. As a way to learn new technologies.
Redux pattern implemented with ngrx store. For websocket implementations was used Socket.io

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build and start

1. `npm install`
2. `ng build` or `ng build --prod`
3. `npm run start:server`
4. Navigate to `http://localhost:3000/`
