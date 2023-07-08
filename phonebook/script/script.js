import { deleteContol, formControl, modalContol } from "./control.js";
import { renderContacts, renderPhoneBook } from "./renders.js";
import { makeSort, sortRows } from "./sorting.js";
import { getData } from './data.js';
import hoverRow from "./hover.js";

// export let data = [];

// export const setData = (value) => {
//     data = value;
// };

// export const getData = () => {
//     return data;
// };

{
    // const hoverRow = (allRow, logo) => {
    //     const text = logo.textContent;
    //     allRow.forEach(contact => {
    //         contact.addEventListener('mouseenter', () => {
    //             logo.textContent = contact.phoneLink.textContent;
    //         });
    //         contact.addEventListener('mouseleave', () => {
    //             logo.textContent = text;
    //         });
    //     });
    // };

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const { list, logo, btnAdd, formOverlay, form, btnDel, thead } = renderPhoneBook(app, title);

        const allRow = renderContacts(list, getData());
        const { closeModal } = modalContol(btnAdd, formOverlay);
        hoverRow(allRow, logo);

        deleteContol(btnDel, list);
        formControl(form, list, closeModal);

        sortRows(thead, list);
        makeSort(list);

        /* setTimeout(() => {
             const contact = createRow({
                 name: 'Вера',
                 surname: 'Деева',
                 phone: '+79836503133',
             });
             list.append(contact);
         }, 1000);*/
    };

    window.phoneBookInit = init;
};

window.addEventListener('storage', e => {
    console.log(e);
    init()
})