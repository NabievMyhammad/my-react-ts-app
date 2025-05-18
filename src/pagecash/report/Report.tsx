import React from 'react';
import { Card } from 'react-bootstrap';

interface Entry {
  id: number;
  item: string;
  amount: number;
  date: string;
}

interface Props {
  comings: Entry[];
  consumptions: Entry[];
}

const Report: React.FC<Props> = ({ comings, consumptions }) => {
  const totalComing = comings.reduce((sum, entry) => sum + entry.amount, 0);
  const totalConsumption = consumptions.reduce((sum, entry) => sum + entry.amount, 0);
  const balance = totalComing - totalConsumption;

  return (
    <Card className="border-success mt-4">
      <Card.Header style={{ backgroundColor: '#4caf50', color: 'white', fontWeight: '600' }}>
        Финансовый отчет
      </Card.Header>
      <Card.Body>
        <p>Общий приход: <b>{totalComing}</b></p>
        <p>Общий расход: <b>{totalConsumption}</b></p>
        <p>Баланс: <b>{balance}</b></p>
      </Card.Body>
    </Card>
  );
};

export default Report;
