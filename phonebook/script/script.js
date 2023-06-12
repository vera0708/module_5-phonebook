'use strict';

const data = [
    {
        name: 'Иван',
        surname: 'Петров',
        phone: '+79514545454',
    },
    {
        name: 'Игорь',
        surname: 'Семёнов',
        phone: '+79999999999',
    },
    {
        name: 'Семён',
        surname: 'Иванов',
        phone: '+79800252525',
    },
    {
        name: 'Мария',
        surname: 'Попова',
        phone: '+79876543210',
    },
];

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);
        header.headerContainer = headerContainer;

        return header;
    };

    const createLogo = (title) => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;
        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
    };

    const createButtonGroupe = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({ className, type, text }) => {
            const button = document.createElement('button');
            button.className = className;
            button.type = type;
            button.textContent = text;
            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper, btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
        <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        </tr>
        `);
        const tbody = document.createElement('tbody');
        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <h2 class="form-title">Добавить контакт</h2>
        <div class="form-groupe">
            <label class="form-label" for ="name">Имя:</label>
            <input class="form-input" name="name" id="name" type="text" required> 
        </div>
        <div class="form-groupe">
            <label class="form-label" for ="surname">Фамилия:</label>
            <input class="form-input" name="surname" id="surname" type="text" required> 
        </div>
        <div class="form-groupe">
            <label class="form-label" for ="phone">Телефон:</label>
            <input class="form-input" name="phone" id="phone" type="number" required> 
        </div>        
        `);

        const buttonGroupe = createButtonGroupe([
            {
                className: 'btn btn-primary mr-4 js-add',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);

        form.append(...buttonGroupe.btns);
        overlay.append(form);

        return {
            overlay,
            form,
        }
    };

    const createRow = ({ name: firstName, surname, phone }) => {

        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');

        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        const tdEdit = document.createElement('td');
        const tdIcon = document.createElement('img');
        tdIcon.classList.add('row-icon');
        tdEdit.append(tdIcon);

        tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const createFooter = () => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        footer.append(footerContainer);
        footer.footerContainer = footerContainer;

        return footer;
    };

    const createRights = (title) => {
        const p = document.createElement('p');
        p.textContent = `Все права защищены @${title}`;
        return p;
    };

    const renderPhoneBook = (app, title) => {
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
        const form = createForm();
        const footer = createFooter();
        const p = createRights(title);

        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroupe.btnWrapper, table, form.overlay);
        footer.footerContainer.append(p);
        app.append(header, main, footer);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroupe.btns[0],
            btnDel: buttonGroupe.btns[1],
            formOverlay: form.overlay,
            form: form.form,
        };
    };

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const phoneBook = renderPhoneBook(app, title);
        const { list, logo, btnAdd, formOverlay, form, btnDel } = phoneBook;

        const allRow = renderContacts(list, data);

        hoverRow(allRow, logo);

        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible');
        });

        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if (target === formOverlay ||
                target.closest('.close')) {
                formOverlay.classList.remove('is-visible');
            };
        });

        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });
        list.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.del-icon')) {
                target.closest('.contact').remove();
            };
        });

        setTimeout(() => {
            const contact = createRow({
                name: 'Вера',
                surname: 'Деева',
                phone: '+79836503133',
            });
            list.append(contact);
        }, 1000)
    };

    window.phoneBookInit = init;
}