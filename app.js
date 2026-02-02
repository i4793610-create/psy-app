// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем приложение на весь экран
tg.MainButton.setText('Готово!').hide(); // Прячем кнопку, она понадобится позже

// Элементы DOM
const startBtn = document.getElementById('startBtn');
const topicButtons = document.querySelectorAll('.topic-btn');
const principleCards = document.querySelectorAll('.principle-card');

// Обработчик для кнопки "Начать беседу"
startBtn.addEventListener('click', () => {
    // 1. Можно открыть форму для ввода данных
    // 2. Или отправить событие в бота, что пользователь хочет начать
    tg.showPopup({
        title: 'Начать консультацию',
        message: 'Связываем вас с доступным психологом. Первые 15 минут - бесплатно. Продолжим?',
        buttons: [
            {id: 'yes', type: 'default', text: 'Да, начать'},
            {id: 'no', type: 'destructive', text: 'Отмена'}
        ]
    }, (buttonId) => {
        if (buttonId === 'yes') {
            // Отправляем данные в бота (например, команду /start_session)
            tg.sendData(JSON.stringify({action: 'start_session'}));
            // Или закрываем мини-апп, если дальше диалог в чате с ботом
            tg.close();
        }
    });
});

// Обработчики для кнопок тем
topicButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const topic = this.getAttribute('data-topic');
        
        // Визуальная обратная связь
        topicButtons.forEach(b => b.style.opacity = '0.6');
        this.style.opacity = '1';
        this.style.border = '2px solid #6c63ff';

        // Показываем кнопку подтверждения выбора темы
        tg.MainButton.setText(`Обсудить "${this.textContent.trim()}"`);
        tg.MainButton.onClick(() => {
            tg.sendData(JSON.stringify({
                action: 'select_topic',
                topic: topic,
                topicName: this.textContent.trim()
            }));
            tg.close();
        });
        tg.MainButton.show();

        // Можно сразу отправить данные или показать попап
        tg.showAlert(`Вы выбрали тему: "${this.textContent.trim()}". Теперь нажмите кнопку внизу экрана.`);
    });
});

// Анимация для карточек принципов (дополнительный интерактив)
principleCards.forEach(card => {
    card.addEventListener('click', function() {
        const principleId = this.id;
        tg.showAlert(`Принцип "${this.querySelector('h3').textContent}" - это основа нашей работы.`);
    });
});

// Инициализация темы Telegram (опционально)
tg.ready();
