import { addContactData, addContactPage, removeContact } from "./data.js";
import { removeStorage } from "./serviceStorage.js";

export const modalContol = (btnAdd, formOverlay) => {
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

export const deleteContol = (btnDel, list) => {
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
            removeContact(phone);
            removeStorage(phone);
            target.closest('.contact').remove();
        };
    });
};

export const formControl = (form, list, closeModal) => {
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

