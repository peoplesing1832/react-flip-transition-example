export const isFunc = (fn: unknown): fn is Function => {
  return Object.prototype.toString.call(fn) === '[object Function]';
};

export const isObj = (obj: unknown): obj is object => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isNum = (num: unknown): num is number => {
  return Object.prototype.toString.call(num) === '[object Number]';
};

export const isNull = (data: unknown): data is null => {
  return Object.prototype.toString.call(data) === '[object Null]';
};

export const isUnd = (data: unknown): data is undefined => {
  return Object.prototype.toString.call(data) === '[object Undefined]';
};
