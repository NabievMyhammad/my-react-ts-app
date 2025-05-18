import React from 'react';
import { Card, Button, Row, Col, Badge } from 'react-bootstrap';

const accounts = [
  { id: 1, name: 'Основной счёт', balance: 3500 },
  { id: 2, name: 'Копилка', balance: 12500 },
  { id: 3, name: 'Карта банка', balance: 8400 },
];

const Accounts: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4 text-success fw-bold">💳 Счета</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {accounts.map((account) => (
          <Col key={account.id}>
            <Card border="success" className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {account.name}
                  <Badge bg="success">{account.balance} сомони</Badge>
                </Card.Title>
                <Card.Text className="text-muted">
                  ID: {account.id}
                </Card.Text>
                <Button variant="outline-success" size="sm">Подробнее</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Accounts;
