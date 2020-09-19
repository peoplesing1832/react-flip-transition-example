export const isFunc = (fn) => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

export const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isNum = (num) => {
  return Object.prototype.toString.call(num) === '[object Number]';
};

export const isNull = (data) => {
  return Object.prototype.toString.call(data) === '[object Null]';
};

export const isUnd = (data) => {
  return Object.prototype.toString.call(data) === '[object Undefined]';
};
