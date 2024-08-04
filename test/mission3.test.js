const { assert } = require("chai");

const Transaction = require("../src/mission3/Transaction");
const TXO = require("../src/mission3/TXO");

describe("Mission 3: 채굴자 보상 설정", function () {
  const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
  const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

  describe("남는 돈이 없는 경우", () => {
    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const outputTXO1 = new TXO(toAddress, 7);
    const outputTXO2 = new TXO(fromAddress, 3);

    const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);

    tx.execute();

    it("fee는 0이어야 함", () => {
      assert.equal(tx.fee, 0);
    });
  });

  describe("남는 돈이 있는 경우", () => {
    const txo1 = new TXO(fromAddress, 15);
    const outputTXO1 = new TXO(toAddress, 7);
    const outputTXO2 = new TXO(fromAddress, 6);

    const tx = new Transaction([txo1], [outputTXO1, outputTXO2]);

    tx.execute();

    it("나머지는 fee로 받아야 함", () => {
      assert.equal(tx.fee, 2);
    });
  });
});
