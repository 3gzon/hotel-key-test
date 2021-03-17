//Set localstorage
export const setLocalStorage = (name, content) => {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        return window.localStorage.setItem(name, content)
    }
    //Get localstorage
export const getLocalStorage = (name) => {
        if (!name) return
        return JSON.parse(window.localStorage.getItem(name))
    }
    //clear localstorage
export const clearLocalStorage = (name) => {
    if (!name) return
    return window.localStorage.removeItem(name)
}