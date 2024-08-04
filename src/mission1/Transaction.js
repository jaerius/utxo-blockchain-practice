class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.transaction = { inputUTXOs, outputUTXOs };
  }
  execute() {
    const isDoubleSpend = this.transaction.inputUTXOs.findIndex(
      (utxo) => utxo.spent == true,
    );

    if (isDoubleSpend !== -1) {
      throw new Error("input TXO is already spent.");
    }

    /**
     * 📚 Mission 1.
     * 입력 UTXO의 총값이 출력 UTXO의 총값을 커버할 만큼 충분한지 확인합니다.
     * 입력의 총값이 출력의 총값보다 작으면 execute 함수에서 에러를 던집니다.
     */
  }
}

module.exports = Transaction;
