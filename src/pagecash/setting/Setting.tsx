import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Setting: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert(`Настройки сохранены:\nТема: ${theme}\nЯзык: ${language}\nУведомления: ${notifications ? 'Включены' : 'Отключены'}`);
    // Здесь можно добавить сохранение в localStorage или отправку на backend
  };

  return (
    <div>
      <h4 style={{ color: '#2f7a2f' }}>Настройки</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formTheme">
          <Form.Label>Тема</Form.Label>
          <Form.Select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')}>
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLanguage">
          <Form.Label>Язык</Form.Label>
          <Form.Select value={language} onChange={e => setLanguage(e.target.value as 'ru' | 'en')}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotifications">
          <Form.Check 
            type="checkbox" 
            label="Включить уведомления" 
            checked={notifications} 
            onChange={e => setNotifications(e.target.checked)} 
          />
        </Form.Group>

        <Button variant="success" onClick={handleSave}>Сохранить настройки</Button>
      </Form>
    </div>
  );
};

export default Setting;
