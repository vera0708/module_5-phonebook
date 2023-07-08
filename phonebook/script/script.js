import { deleteContol, formControl, modalContol } from "./control.js";
import { renderContacts, renderPhoneBook } from "./renders.js";
import * as sortModule from "./sorting.js";
import { getData } from './data.js';
import hoverRow from "./hover.js";

{
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const { list, logo, btnAdd, formOverlay, form, btnDel, thead } = renderPhoneBook(app, title);

        const allRow = renderContacts(list, getData());
        const { closeModal } = modalContol(btnAdd, formOverlay);
        hoverRow(allRow, logo);

        deleteContol(btnDel, list);
        formControl(form, list, closeModal);

        sortModule.sortRows(thead, list);
        sortModule.makeSort(list);
    };

    window.phoneBookInit = init;
};

window.addEventListener('storage', e => {
    console.log(e);
    init()
})