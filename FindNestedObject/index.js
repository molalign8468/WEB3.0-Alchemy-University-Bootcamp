let obj = {
  prop: {
    prop: {
      prop: 3,
    },
  },
};

function getDeeplyNestedValue(obj) {
  if (typeof obj.prop === "object" && obj.prop !== null) {
    return getDeeplyNestedValue(obj.prop);
  } else {
    return obj.prop;
  }
}

console.log(getDeeplyNestedValue(obj));
