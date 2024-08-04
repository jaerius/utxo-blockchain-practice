const { assert } = require("chai");

const Transaction = require("../src/mission2/Transaction");
const TXO = require("../src/mission2/TXO");

describe("Misson 2: 트랜잭션 성공", function () {
  const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
  const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

  const txo1 = new TXO(fromAddress, 5);
  const txo2 = new TXO(fromAddress, 5);
  const txo3 = new TXO(fromAddress, 3);
  const txo4 = new TXO(fromAddress, 4);
  const outputTXO1 = new TXO(toAddress, 7);
  const outputTXO2 = new TXO(fromAddress, 3);

  it("두 입력을 모두 소비된 것으로 표시해야 함", () => {
    const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);
    tx.execute();
    assert(txo1.spent);
    assert(txo2.spent);
  });

  it("자금을 사용할 수 없는 경우 두 입력을 모두 사용하지 않은 상태로 두어야 함", () => {
    const tx = new Transaction([txo3, txo4], [outputTXO1, outputTXO2]);
    let ex;
    try {
      tx.execute();
    } catch (_ex) {
      ex = _ex;
    }
    assert(ex, "Expected an exception to be thrown!");
    assert(!txo3.spent, "The transaction should be marked as unspent");
    assert(!txo4.spent, "The transaction should be marked as unspent");
  });

  it("이중 지출이 발생하는 경우 유효한 입력을 사용하지 않은 상태로 두어야 함", () => {
    const tx = new Transaction([txo1, txo4], [outputTXO1, outputTXO2]);
    let ex;
    try {
      tx.execute();
    } catch (_ex) {
      ex = _ex;
    }
    assert(ex, "Expected an exception to be thrown!");
    assert(!txo4.spent, "The transaction should be marked as unspent");
  });
});
