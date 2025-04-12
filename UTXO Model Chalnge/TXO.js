class TXO {
  constructor(owner, amount) {
    this.amount = amount;
    this.owner = owner;
    this.spent = false;
  }
  spend() {
    this.spent = true;
    return this.spent;
  }
}

module.exports = TXO;
