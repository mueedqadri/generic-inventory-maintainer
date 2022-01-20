# generic-inventory-maintainer
# Live Application Demo

```
https://inventory-management-generic.herokuapp.com/
```
# API routes 
## GET all items (GET)
/
## UPDATE item (PUT)
/inventory/update/:id

sample body
```
{
	"name": "mango", 
	"quantity": "30",
	"date_added": "14-11-2021"
}
```
## ADD new item (POST)
/inventory/add/
sample body
```
{
	"name": "onion", 
	"quantity": "3",
	"date_added": "11-11-2021"
}
```
## DOWNLOAD csv (GET)
/download
## DELETE item (DELETE)
/delete/:id



# Run application
To run the application : 
* Clone the repo.
* Open a terminal at the location of the repo.
* Run the following command to install the npm packages
```
npm i 
```
* To start start the project do
```
npm start
```
* A browser window will show up with the application running in the local host.