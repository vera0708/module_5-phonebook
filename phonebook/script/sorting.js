
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

export const sortRows = (thead, list) => {
    thead.addEventListener('click', e => {
        const target = e.target;
        getSorted(target.textContent, list);
    });
};

export const makeSort = (list) => {
    const sortThname = getStorageFromItem('sort');
    if (sortThname) {
        getSorted(sortThname, list);
    }
};

const setStorageToItem = (key, value) => {
    localStorage.setItem(key, value);
};

const getStorageFromItem = (key) => {
    return localStorage.getItem(key);
}