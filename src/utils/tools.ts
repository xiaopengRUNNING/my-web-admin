/**
 * 数据类型检测
 * @param {Any} data
 *
 * @return {String}
 */
export function typeOf(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

/**
 * 过滤对象中为空的属性
 * @param {Object} obj
 *
 * @return {Object}
 */
export function filterObj(obj: Record<string, any>) {
  if (typeOf(obj) !== 'Object') {
    return {};
  }
  const result = obj;
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete result[key];
    }
  });
  return result;
}
