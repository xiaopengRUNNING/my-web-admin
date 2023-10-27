/**
 * 数据类型检测
 * @param {Any} data
 *
 * @return {String}
 */
export function typeOf(data: any) {
  return Object.prototype.toString.call(data).slice(8, -1);
}
