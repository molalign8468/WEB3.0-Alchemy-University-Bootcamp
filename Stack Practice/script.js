const MAX_STACK_SIZE = 10;
class Stack {
  constructor() {
    this.items = [];
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack UnderFlow");
    } else {
      return this.items.pop();
    }
  }
  push(item) {
    if (this.items.length >= MAX_STACK_SIZE) {
      throw new Error("Stack OverFlow");
    } else {
      this.items.push(item);
    }
  }
  isEmpty() {
    if (this.items.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }
}

class OperationManager {
  constructor() {
    this.operations = new Stack();
    this.undos = new Stack();
  }
  addOperations(operation) {
    this.operations.push(operation);
  }
  undo() {
    const result = this.operations.pop();
    this.undos.push(result);
  }
  redo() {
    const result = this.undos.pop();
    this.operations.push(result);
  }
  redoAll() {
    while (!this.undos.isEmpty()) {
      this.redo();
    }
  }
}
