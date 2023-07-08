'use strict';

const setStorageToItem = (key, value) => {
    localStorage.setItem(key, value);
};

const getStorageFromItem = (key) => {
    return localStorage.getItem(key);
};

const getStorage = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return [];
};

const setStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};

const removeStorage = (phone) => {
    const filteredData = data.filter(contact => contact.phone !== phone)
    setStorage('phonebook', filteredData);
};

module.exports = {
    setStorageToItem,
    getStorageFromItem,
    getStorage,
    setStorage,
    removeStorage,
};