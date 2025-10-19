import React from 'react';

const Goals: React.FC = () => {
    console.log('Goals component is loading...');

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>🏦 Копилка</h1>
            <p>Создавайте копилки для накопления на важные цели</p>
            <div style={{ marginTop: '40px' }}>
                <h2>🏦 Страница копилки работает!</h2>
                <p>Компонент загружен успешно</p>
            </div>
        </div>
    );
};

export default Goals;
