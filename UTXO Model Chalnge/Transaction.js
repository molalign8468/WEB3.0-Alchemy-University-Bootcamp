class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
  }
  execute() {
    this.inputUTXOs.map((itm) => {
      if (itm.spent == true) {
        throw new Error("this trnsaction is used", inputUTXOs);
      }
    });
  }
}

module.exports = Transaction;
