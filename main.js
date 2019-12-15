var SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timeStamp, data, previousHash = "") {
    this.index = index;
    this.data = data;
    this.timeStamp = timeStamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timeStamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.cerateGenesisBlock()];
  }

  cerateGenesisBlock() {
    return new Block(0, Date.now(), "Genesis Block", "0");
  }

  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLastestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let x = 1; x < this.chain.length; x++) {
      const currentBlock = this.chain[x];
      const previousBlock = this.chain[x - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }
    return true;
  }
}

var generateId = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
let bc = new BlockChain();

bc.addBlock(new Block(generateId(), Date.now(), { data: "A" }));
bc.addBlock(new Block(generateId(), Date.now(), { data: "B" }));
bc.addBlock(new Block(generateId(), Date.now(), { data: "C" }));
bc.addBlock(new Block(generateId(), Date.now(), { data: "D" }));

console.log(JSON.stringify(bc));
console.log(bc.isChainValid());
