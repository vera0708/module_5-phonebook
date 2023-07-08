'use strict';

const boom = () => {
    alert('БУ_У_УМ');
};

const btnOne = document.querySelector('.btn-one');
btnOne.addEventListener('click', () => {
    alert('ТЫДЫЩЬ');
});
btnOne.addEventListener('click', boom);
btnOne.removeEventListener('click', boom);

// btnOne.onclick = boom;
const btnTwo = document.querySelector('.btn-two');

btnTwo.onclick = () => {
    alert('ТЫДЫЩЬ');
}


const link = document.querySelector('.link');

link.addEventListener('click', event => {
    event.preventDefault();
    console.log(link.textContent);
});

const objEvent = {
    a: 1,
    b: 10,
    handleEvent(event) {
        if (event.ctrlKey) {
            this.bar();
        } else {
            this.foo();
        }
    },
    bar() {
        document.body.style.backgroundColor = 'red';
    },
    foo() {
        document.body.style.backgroundColor = 'green';
        // formOverlay.classList.add('is-visible');
    },
}

// btnAdd.addEventListener('click', objEvent);