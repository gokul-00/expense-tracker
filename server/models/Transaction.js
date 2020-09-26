module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
      text: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.BIGINT
      }
    });
  
    return Transaction;
};