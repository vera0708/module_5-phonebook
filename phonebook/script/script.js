'use strict';

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
                className: 'btn btn-primary mr-4',
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
    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
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

        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroupe.btnWrapper, table, form.overlay);

        app.append(header, main)


    };


    window.phoneBookInit = init;
}