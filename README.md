# Resource Wall

Resource wall is a multipage application with single page features.

## Features

It displays learning resources that can be rated, liked and commented on. Users who have registered and logged in can view their liked resources as well as create and edit their created resources. Accounts can be edited, and name, email and password can all be changed. Users can search through the entire database of resources by using the search bar and entering a category. Resources that match that category will be displayed on the main page. There is also an explore feature that shows a random resource.

## Final Product

!["Resource Wall"](https://github.com/oMnotopia/resource-wall/blob/master/docs/resource-wall.png?raw=true)
!["Resource"](https://github.com/oMnotopia/resource-wall/blob/master/docs/resource.png?raw=true)
!["Create Resource"](https://github.com/oMnotopia/resource-wall/blob/master/docs/create-resource.png?raw=true)
!["Profile"](https://github.com/oMnotopia/resource-wall/blob/master/docs/profile.png?raw=true)
!["Profile Edit"](https://github.com/oMnotopia/resource-wall/blob/master/docs/profile-edit.png?raw=true)

## Getting Started

1. Create the .env by using .env.example as a reference: cp .env.example .env
2. Update the .env file with your correct local information
3. Install dependencies: npm i
4. Fix to binaries for sass: npm rebuild node-sass
5. Reset database: npm run db:reset
* Check the db folder to see what gets created and seeded in the SDB
6. Run the server: npm run local
* Note: nodemon is used, so you should not have to restart your server
7. Visit http://localhost:8080/

## Dependencies
- cookie-session
- dotenv
- ejs
- express
- morgan
- pg
- sass
