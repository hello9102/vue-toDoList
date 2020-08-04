//存数据
export function setItem(key,value)  {
    localStorage.setItem(key, JSON.stringify(value))
}
//取
export function getItem(key) {
    return JSON.parse(localStorage.getItem(key))
}
//删除
export function removeItem(key) {
    localStorage.removeItem(key);
}