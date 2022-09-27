# ECommerce-BackEnd

## Table of Contents

- [Description](#description)
- [Acceptance Criteria](#acceptancecriteria)
- [Refrences](#references)
- [Videos](#videos)
- [Licenses](#license)
- [Author Info](#license)

![badge](https://img.shields.io/badge/license-MIT-brightorange)



## Description
This applications purpose is to display inventory of the site on the backend with the ability to add, update and delete specific endpoints.

## AcceptanceCriteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```


## Install Instructions
none

## Credits
N/a

## Instructions/How to use

Link to Github Repo: https://github.com/Korbynd23/ECommerce-BackEnd

Start by creating the db through mysql in the command terminal, next the data in the 'seeds' folder will need to be seeded inorder to pull up current inventory and associations. Once seeded run 'npm start' to run the server on a local host. The user will now be able to pull up insomnia and using CRUD operations and the endpoints detailed in the routes folder the user can view all categories/products/tags or specific categories/products/tags. The user will also be able to create, update and delete categories/products/tags.

## Videos:


Invoking the App -  https://drive.google.com/file/d/1mrMqwbrya5wa5wbfehi8zD_txHKNnxfU/view




## License
Permission to use this application is granted under the MIT license. https://choosealicense.com/licenses/mit/

## Created By
[github link: korbynd23](https://github.com/korbynd23)

#### If you have any further questions on this application please feel free to contact me at kdicari24@gmail.com
