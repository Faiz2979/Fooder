import Cookies from 'js-cookie';

export const getCookie = (key: string) => {
    return Cookies.get(key);
}

export const setCookie = (key: string, value: string) => {
    Cookies.set(key, value, { expires: 1 });
}

export const removeCookie = (key: string) => {
    Cookies.remove(key);
}