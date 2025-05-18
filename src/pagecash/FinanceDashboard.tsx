import  { useState } from 'react';
import Coming from './coming/Coming';
import Consumption from './consumption/Consumption';
import Report from './report/Report';

const FinanceDashboard = () => {
  // Состояния приходов и расходов
  const [comings, setComings] = useState([
    { id: 1, item: 'Доход A', amount: 100, date: '2025-05-01' },
    { id: 2, item: 'Доход B', amount: 50, date: '2025-05-02' },
  ]);

  const [consumptions, setConsumptions] = useState([
    { id: 1, item: 'Расход A', amount: 30, date: '2025-05-05' },
    { id: 2, item: 'Расход B', amount: 20, date: '2025-05-06' },
  ]);

  return (
    <div>
      <Coming data={comings} setData={setComings} />
      <Consumption data={consumptions} setData={setConsumptions} />
      <Report comings={comings} consumptions={consumptions} />
    </div>
  );
};

export default FinanceDashboard;
