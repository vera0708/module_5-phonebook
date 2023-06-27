'use strict';

const form = document.querySelector('.my-form');

const sentData = data => console.log('отправка: ', data);

form.addEventListener('submit', e => {
    e.preventDefault();

    const checkboxes = new Set();

    [...form.elements].forEach(elem => {
        if (elem.type === 'checkbox') {
            checkboxes.add(elem.name);
        }
    });

    const data = {};

    const formData = new FormData(e.target);

    for (const [name, value] of formData) {
        if (checkboxes.has(name)) {
            if (Array.isArray(data[name])) {
                data[name].push(value);
            } else {
                data[name] = [value];
            }
        } else {
            data[name] = value;
        }
    }

    /* for (const [name, value] of formData) {
         if (Object.keys(data).includes(name)) {
             if (!Array.isArray(data[name])) {
                 data[name] = [data[name]];
             } data[name].push(value);
         } else {
             data[name] = value;
         }
     }  */

    sentData(JSON.stringify(data));
    // такая запись аналогична: sentData(JSON.stringify(Object.fromEntries(formData)));
})