// 验证类
export function isnull(str) {
  // 是否为空
  return str.trim().length > 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
