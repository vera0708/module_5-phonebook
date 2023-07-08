import { setStorage } from "./serviceStorage.js";
import { createRow } from "./createElements.js";

let data = [];

export const setData = (value) => {
    data = value;
};

export const getData = () => {
    return data;
};

export const addContactData = (contact) => {
    data.push(contact);
    setStorage('phonebook', data);
    console.log(data);
};

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};