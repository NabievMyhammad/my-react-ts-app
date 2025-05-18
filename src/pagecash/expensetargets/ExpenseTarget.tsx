import React, { useState } from 'react';
import { Button, Form, Table, Card } from 'react-bootstrap';

interface ExpenseTarget {
  id: number;
  name: string;
}

const ExpenseTargets = () => {
  const [targets, setTargets] = useState<ExpenseTarget[]>([]);
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddTarget = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      alert('Введите название цели расхода');
      return;
    }
    // Проверка на дубликаты
    if (targets.some(t => t.name.toLowerCase() === trimmed.toLowerCase())) {
      alert('Такая цель уже есть');
      return;
    }
    const newTarget: ExpenseTarget = {
      id: targets.length ? targets[targets.length - 1].id + 1 : 1,
      name: trimmed,
    };
    setTargets(prev => [...prev, newTarget]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Card className="mt-3">
      <Card.Header style={{ backgroundColor: '#f44336', color: 'white', fontWeight: '600' }}>
        Цели расходов
      </Card.Header>
      <Card.Body>
        <p>Добавьте направления, куда тратятся деньги (зарплаты, аренда, закупки и т.д.).</p>

        <Form className="d-flex mb-3" onSubmit={e => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Новая цель расхода"
            value={input}
            onChange={handleChange}
            className="me-2"
          />
          <Button variant="danger" onClick={handleAddTarget}>
            Добавить
          </Button>
        </Form>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Цель расхода</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {targets.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Нет целей расходов
                </td>
              </tr>
            ) : (
              targets.map(({ id, name }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseTargets;
