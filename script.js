const addButton = document.querySelector('.add');
const plus = document.querySelector('.plus');
let optionList = document.querySelector('.option-list');
const sortButton = document.querySelector('.sort');
let sortDown = document.querySelector('.sort-down');
let sortUp = document.querySelector('.sort-up');
let option = document.querySelector('.option');
let deleteButton = document.querySelector('.option__delete');
let inputData = document.querySelector('.option__list-item');

// добавление и удаление
addButton.addEventListener('click', () => {
    
    let newElement = document.createElement('div');
    newElement.innerHTML = option.innerHTML;
    newElement.classList.add('option');
    newElement.draggable = 'true';
    optionList.append(newElement);
    
    let deleteButton = newElement.querySelector('.option__delete');
    deleteButton.addEventListener('click', () => {
        removeElements(newElement);
    });    
});

function removeElements(par) {
    let optionElements = document.querySelectorAll('.option');
    if (optionElements.length > 1) {
        par.remove();
    }
}

deleteButton.addEventListener('click', () => {
    removeElements(option);
})

//сортировка
sortButton.addEventListener('click', (event) => {

    let arrTasks = [];
    let inputs = document.querySelectorAll('.option__list-item');
    for (let i = 0; i < inputs.length; i++) {
        arrTasks.push(inputs[i].value);
    } if (event.target.classList.contains('sorting')) {
            sortDown.style.display = 'none';
            sortUp.style.display = 'block';
            
            arrTasks.sort((a, b) => {
                if (a < b) {
                    return 1;
                }
                if (a > b) {
                    return -1;
                }
                return 0;
            });
            

        for (let j = 0; j < arrTasks.length; j++) {
            inputs[j].value = arrTasks[j];
        } 
        } else {
        sortDown.style.display = 'block';
        sortUp.style.display = 'none';
        
        arrTasks.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });    
        for (let j = 0; j < arrTasks.length; j++) {
            inputs[j].value = arrTasks[j];
        }
    }
});

// перетаскивание элементов
optionList.addEventListener('dragstart', (event) => {
    event.target.style.backgroundColor = '#FFDC40';
    event.target.style.mixBlendMode = 'multiply';
    event.target.classList.add('selected');
});
optionList.addEventListener('drag', (event) => {
    event.target.style.backgroundColor = '#E4E4E4';
});
optionList.addEventListener('dragend', (event) => {
    event.target.style.backgroundColor = 'white';
    event.target.classList.remove('selected');
});

optionList.addEventListener('dragover', (event) => {
    event.preventDefault();

    let activeElement = optionList.querySelector('.selected');
    let currentElement = event.target;

    let isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains('option');

    if (!isMoveable) {
        return;
    }

    let nextElement;
    if (currentElement === activeElement.nextElementSibling) {
        nextElement = currentElement.nextElementSibling;
    } else {
        nextElement = currentElement;
    }
    optionList.insertBefore(activeElement, nextElement);
});