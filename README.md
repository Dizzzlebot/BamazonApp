# BamazonApp

Bamazon
Description
This application implements a simple command line based storefront using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents an interface: customer selection.

MySQL Database Setup
In order to run this application, you should have the MySQL database already set up on your machine. Once you have MySQL isntalled, you will be able to create the Bamazon database and the products table with the SQL code found in Bamazon.sql. Run this code inside your MySQL client like Sql  to populate the database, then you will be ready to proceed with running the Bamazon customer interface.

Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

![](images/pic1.PNG)




![](images/pic2.PNG)



To run the customer interface please follow the steps below:

DEMO:

https://drive.google.com/file/d/1t7YGA1qPh3wgt4JquB1WdQrCoWlGsNes/view
