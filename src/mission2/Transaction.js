class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transactions = { inputUTXOs, outputUTXOs };
  }
  execute() {
    const isDoubleSpend = this.transactions.inputUTXOs.findIndex(
      (utxo) => utxo.spent === true
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    const prevInputUTXOs = [...this.transactions.inputUTXOs];
    const prevOutputUTXOs = [...this.transactions.outputUTXOs];

    const totalInputAmount = prevInputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    const totalOutputAmount = prevOutputUTXOs.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );

    if (totalInputAmount < totalOutputAmount) {
      throw new Error(
        "insufficient amount: total value of the inputs is less than the total value of the outputs!"
      );
    }

    const newInputUTXOs = prevInputUTXOs.map((utxo) => (utxo.spent = true));

    this.transactions.inputUTXOs = newInputUTXOs;
  }
}

module.exports = Transaction;
