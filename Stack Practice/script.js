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

const operationManager = new OperationManager();

const addItem = document.getElementById("addItem");
const undo = document.getElementById("Undo");
const redo = document.getElementById("Redo");
const redoAll = document.getElementById("reDoAll");

function updateUI() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const tempStack = new Stack();

  while (!operationManager.operations.isEmpty()) {
    tempStack.push(operationManager.operations.pop());
  }

  while (!tempStack.isEmpty()) {
    const item = tempStack.pop();
    operationManager.operations.push(item);

    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}

addItem.addEventListener("click", () => {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();

  if (value) {
    try {
      operationManager.addOperations(value);
      input.value = "";
      updateUI();
    } catch (error) {
      alert(error.message);
    }
  }
});
undo.addEventListener("click", () => {
  try {
    operationManager.undo();
    updateUI();
  } catch (error) {
    alert("Nothing to undo!");
  }
});
redo.addEventListener("click", () => {
  try {
    operationManager.redo();
    updateUI();
  } catch (error) {
    alert("Nothing to redo!");
  }
});
redoAll.addEventListener("click", () => {
  try {
    operationManager.redoAll();
    updateUI();
  } catch (error) {
    alert("Nothing to redo!");
  }
});

operationManager.addOperations("First Item");
operationManager.addOperations("Second Item");
updateUI();
