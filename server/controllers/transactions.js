const db = require("../models");
const Transaction = db.Transaction;

exports.addTransactions = (req, res) => {
    // Validate request
    if (!req.body.text) {
      res.status(400).send({
        error: "Content can not be empty!"
      });
      return;
    }else if (!req.body.amount){
        res.status(400).send({
            error: "Content can not be empty!"
        });
        return;
    }
  
    // Create a Transaction
    const transaction = {
      text: req.body.text,
      amount: req.body.amount
    };
  
    // Save Transaction in the database
    Transaction.create(transaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:
            err.message || "Some error occurred while creating the Transaction."
        });
      });
  };


exports.deleteTransactions = (req, res) => {
const id = req.params.id;

Transaction.destroy({
    where: { id: id }
})
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Transaction was deleted successfully!"
        });
    } else {
        res.send({
        error: `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        error: "Could not delete Transaction with id=" + id
    });
    });
};  


exports.getTransactions = (req, res) => {
  
    Transaction.findAll()
      .then(data => {
        return res.status(200).json({
                        success : true,
                        count: data.length,
                        data: data
        })
      })
      .catch(err => {
        res.status(500).send({
          error:
            err.message || "Server error"
        });
      });
};