var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    products();

});

function products() {
    console.log("Selecting all products..\n");
    connection.query("SELECT * FROM products   ", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //connection.end();
        start();
    });
}

function start() {
    inquirer
        .prompt({
            name: "idOrStock_quantity",
            type: "list",
            message: "Would you like to buy [id] a product or how many [Stock_quantiy] on a product?",
            choices: ["ID", "STOCK_QUANTITY", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.idOrStock_quantity === "ID") {
                id();
            } else if (answer.idOrStock_quantity === "STOCK_QUANTITY") {
                Stock_quantity();
            } else {
                connection.end();
            }
        });
};


// function to handle posting new items up for auction
function id() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the item you would like to buy?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to place your order in?"
            },
            {
                name: "price",
                type: "input",
                message: "The amount is?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.products,
                    department_name: answer.department,
                    price: answer.price || 0,
                    //highest_bid: answer.startingBid || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was selected successfully!");
                    // re-prompt the user for they want to bid or post
                    start();
                }
            );
        });
}

function Stock_quantity() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "How many quantities of this product would you like to purchase?"
                },
                {
                    name: "Stock_quantity",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if bid was high enough
                if (chosenItem.price < parseInt(answer.Stock_quantity)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                price: answer.id
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("stock_quantity placed successfully!");
                            start();
                        }
                    );
                } else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Insufficient quantity Try again...");
                    start();
                    connection.end();
                }
            });
    });
}