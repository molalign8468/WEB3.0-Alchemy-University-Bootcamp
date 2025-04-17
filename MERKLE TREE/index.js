class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }
  getRoot(leaves = this.leaves) {
    if (leaves.length === 1) {
      return leaves[0];
    }
    const layer = [];
    for (let i = 0; i < leaves.length; i += 2) {
      const firstPart = leaves[i];
      const nextPart = leaves[i + 1];
      layer.push(this.concat(firstPart, nextPart));
    }
    return this.getRoot(layer);
  }
}

module.exports = MerkleTree;
