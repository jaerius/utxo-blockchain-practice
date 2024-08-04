const { assert } = require("chai");

const Transaction = require("../src/mission1/Transaction");
const TXO = require("../src/mission1/TXO");

describe("Mission 1: 금액과 잔고", function () {
  const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
  const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

  describe("충분한 경우", () => {
    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 10);
    const tx = new Transaction([txo1, txo2], [outputTXO1]);

    it("제대로 실행되어야 함", () => {
      try {
        tx.execute();
      } catch (ex) {
        assert.fail(ex.message);
        console.log(ex);
      }
    });
  });

  describe("충분하지 않은 경우", () => {
    const txo1 = new TXO(fromAddress, 3);
    const txo2 = new TXO(fromAddress, 3);
    const txo3 = new TXO(fromAddress, 3);
    const outputTXO1 = new TXO(toAddress, 10);

    const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

    it("에러를 반환해야 함", () => {
      let ex;
      try {
        tx.execute();
      } catch (_ex) {
        ex = _ex;
      }
      assert(ex, "Did not throw an exception for a lack of UTXO funds!");
    });
  });
});
