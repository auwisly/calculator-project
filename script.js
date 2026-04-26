// Получаем элементы со страницы
let firstNumberInput = document.getElementById('firstNumber');
let secondNumberInput = document.getElementById('secondNumber');
let operationSelect = document.getElementById('operation');
let calculateBtn = document.getElementById('calculateBtn');
let currentResultDiv = document.getElementById('currentResult');
let historyList = document.getElementById('historyList');
let clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Массив для хранения истории
let history = [];

// Функция вычисления
function calculate(num1, num2, operation) {
    if (operation === '+') {
        return num1 + num2;
    } else if (operation === '-') {
        return num1 - num2;
    } else if (operation === '*') {
        return num1 * num2;
    } else if (operation === '/') {
        if (num2 === 0) {
            return 'Ошибка: деление на ноль';
        }
        return num1 / num2;
    }
    return 'Ошибка';
}

// Функция добавления в историю
function addToHistory(num1, num2, operation, result) {
    let historyItem = `${num1} ${operation} ${num2} = ${result}`;
    history.push(historyItem);
    updateHistoryDisplay();
}

// Функция отображения истории
function updateHistoryDisplay() {
    historyList.innerHTML = '';
    for (let i = 0; i < history.length; i++) {
        let li = document.createElement('li');
        li.textContent = history[i];
        historyList.appendChild(li);
    }
}

// Главная функция - обрабатывает нажатие кнопки
function onCalculate() {
    // Получаем значения
    let num1 = Number(firstNumberInput.value);
    let num2 = Number(secondNumberInput.value);
    let operation = operationSelect.value;
    
    // Проверка на пустые поля
    if (firstNumberInput.value === '' || secondNumberInput.value === '') {
        currentResultDiv.textContent = 'Введите оба числа';
        return;
    }
    
    // Вычисляем
    let result = calculate(num1, num2, operation);
    
    // Показываем результат
    currentResultDiv.textContent = result;
    
    // Добавляем в историю
    addToHistory(num1, num2, operation, result);
}

// Очистка истории
function clearHistory() {
    history = [];
    updateHistoryDisplay();
    currentResultDiv.textContent = '—';
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ (все здесь, снаружи) =====

// Нажатие на кнопку "Посчитать"
calculateBtn.addEventListener('click', onCalculate);

// Нажатие на кнопку "Очистить историю"
clearHistoryBtn.addEventListener('click', clearHistory);

// Нажатие клавиши Enter (где угодно на странице)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateBtn.click();  // просто имитируем нажатие кнопки
    }
});
