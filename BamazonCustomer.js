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
    connection.query("SELECT * FROM products ", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //connection.end();
        inquirer.prompt([{
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What product would you like to purchase?"
            }])
            .then(function (answer) {
                // when finished prompting, insert a new item into the db with that info
                connection.query("SELECT * FROM products WHERE product_name=?", [answer.choice], function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    inquirer.prompt([{
                        name: "userquantity",
                        type: "number",
                        message: "How much would you like to purchase?"
                    }]).then(function (result) {
                        var newQuantity = parseInt(res[0].stock_quantity - result.userquantity);
                        connection.query(
                            "UPDATE products SET stock_quantity = ? WHERE id = ?", [newQuantity, res[0].id],
                            function (err) {
                                if (err) throw err;
                                console.log("Your product was selected successfully!");
                                // re-prompt the user for thier choice
                                products();

                            }
                        );
                    })

                })
            });
    });
}




function Stock_quantity() {
    // query the database for all items being to be purchased
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to purchase
        inquirer
            .prompt([{
                    name: "choice",
                    type: "input",
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


                if (chosenItem.price < parseInt(answer.Stock_quantity)) {
                    //  update db, let the user know, and start over
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
                    // quanatity isn't available, so apologize and start over
                    console.log("Insufficient quantity Try again...");
                    start();
                    connection.end();
                }
            });
    });
}