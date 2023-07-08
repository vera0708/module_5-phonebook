import { setData, getData } from './data.js';
import { getStorage } from "./serviceStorage.js";
import {
    createButtonGroupe,
    createFooter,
    createHeader,
    createLogo,
    createMain,
    createRights,
    createRow,
    createTable,
    createForm
} from "./createElements.js";

export const renderContacts = (elem, data) => {
    const allRow = getData().map(createRow);
    elem.append(...allRow);
    return allRow;
};

export const renderPhoneBook = (app, title) => {
    setData(getStorage('phonebook'));

    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroupe = createButtonGroupe([
        {
            className: 'btn btn-primary mr-4',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'button',
            text: 'Удалить',
        },
    ]);

    const table = createTable();
    const footer = createFooter();
    const p = createRights(title);
    const { form, overlay } = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroupe.btnWrapper, table, overlay);
    footer.footerContainer.append(p);
    app.append(header, main, footer);

    return {
        thead: table.thead,
        list: table.tbody,
        logo,
        btnAdd: buttonGroupe.btns[0],
        btnDel: buttonGroupe.btns[1],
        formOverlay: overlay,
        form,
    };
};