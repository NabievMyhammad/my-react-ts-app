import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

interface Entry {
  id: number;
  item: string;
  amount: number;
  date: string;
}

interface Props {
  data: Entry[];
  setData: React.Dispatch<React.SetStateAction<Entry[]>>;
}

interface FormData {
  item: string;
  amount: string; // храним как строку для удобной работы с input[type=number]
  date: string;
}

const Consumption: React.FC<Props> = ({ data, setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ item: '', amount: '', date: '' });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setFormData({ item: '', amount: '', date: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!formData.item.trim() || !formData.amount.trim() || !formData.date.trim()) {
      alert('Заполните все поля!');
      return;
    }

    const amountNumber = Number(formData.amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert('Введите корректную сумму больше 0');
      return;
    }

    const newEntry: Entry = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      item: formData.item.trim(),
      amount: amountNumber,
      date: formData.date,
    };

    setData(prev => [...prev, newEntry]);
    handleClose();
  };

  return (
    <div>
      <Button variant="danger" className="mb-3" onClick={handleShow}>
        Добавить расход
      </Button>

      <Table striped bordered hover responsive className="table-danger">
        <thead>
          <tr>
            <th>ID</th>
            <th>Статья расхода</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, item, amount, date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{item}</td>
              <td>{amount}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить расход</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Статья расхода</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите статью расхода"
                name="item"
                value={formData.item}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Сумма</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите сумму"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min={0}
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Дата</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Consumption;
