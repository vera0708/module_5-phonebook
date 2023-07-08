'use strict';

const {
    setStorageToItem,
    getStorageFromItem,
    setStorage,
    removeStorage,
} = require('./serviceStirage');

const {
    createRow,
} = require('./createElements');

const addContactData = (contact) => {
    data.push(contact);
    setStorage('phonebook', data);
    console.log(data);
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

const modalContol = (btnAdd, formOverlay) => {
    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', () => {
        openModal();
    });

    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if (target === formOverlay ||
            target.closest('.close')) {
            closeModal();
        };
    });

    return {
        closeModal,
    }
};

const deleteContol = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        });
    });

    list.addEventListener('click', (e) => {
        const target = e.target;
        const delIcon = target.closest('.del-icon');
        if (delIcon) {
            const contact = delIcon.closest('.contact');
            const phone = contact.phoneLink.textContent;
            console.log(phone);
            removeStorage(phone);
            target.closest('.contact').remove();
        };
    });
};

const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        // Передаем данные из формы:
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        addContactPage(newContact, list);
        addContactData(newContact);
        // Очищаем форму для следующего заполненияЖ
        form.reset();
        closeModal();
    })
};

const getSorted = (thname, list) => {
    if (thname === 'Имя') {
        let sortedRows = Array.from(list.rows).sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);
        list.append(...sortedRows);

    }
    if (thname === 'Фамилия') {
        let sortedRows = Array.from(list.rows).sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1);
        list.append(...sortedRows);
    };
    setStorageToItem('sort', thname);
};

const sortRows = (thead, list) => {
    thead.addEventListener('click', e => {
        const target = e.target;
        getSorted(target.textContent, list);
    });
};

const makeSort = (list) => {
    const sortThname = getStorageFromItem('sort');
    if (sortThname) {
        getSorted(sortThname, list);
    }
};

module.exports = {
    hoverRow,
    modalContol,
    deleteContol,
    formControl,
    getSorted,
    sortRows,
    makeSort,
};