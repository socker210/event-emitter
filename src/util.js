/**
 * @param {any} value
 * @return {boolean}
 */
export const isNullOrUndefined = (value) => {
  return typeof value === 'undefined' || value === null
}