import  { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Coming from './coming/Coming';
import Consumption from './consumption/Consumption';
import Report from './report/Report';
import Setting from './setting/Setting';
import Accounts from './accounts/Accounts';
import ExpenseTargets from './expensetargets/ExpenseTarget';
import { BudgetManager } from './budgetmanager/BudgetManager';

// Типы с полем item, чтобы соответствовать ожиданиям компонента
type ComingItem = {
  id: number;
  item: string;
  amount: number;
  date: string;
  currency: string;
};

type ConsumptionItem = {
  id: number;
  item: string;
  amount: number;
  date: string;
  
};

function PageCash() {
  const [comingData, setComingData] = useState<ComingItem[]>([]);
  const [consumptionData, setConsumptionData] = useState<ConsumptionItem[]>([]);

  return (
    <Tab.Container defaultActiveKey="coming">
      <div className="d-flex" style={{ minHeight: '400px' }}>
        <Nav
          variant="pills"
          className="flex-column me-3"
          style={{
            minWidth: '150px',
            backgroundColor: '#e6f4ea',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="coming" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Приход
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="consumption" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Расход
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="report" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Отчёт
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="accounts" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Счета
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="expenseTargets" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Цели расходов
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="budget" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Бюджет
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="setting" style={{ fontWeight: '600', color: '#2f7a2f' }}>
              Настройки
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div
          style={{
            width: '1px',
            backgroundColor: '#4caf50',
            marginRight: '1rem',
            marginLeft: '1rem',
            alignSelf: 'stretch',
          }}
        />

        <Tab.Content style={{ flex: 1 }}>
          <Tab.Pane eventKey="coming">
            <Coming data={comingData} setData={setComingData} />
          </Tab.Pane>

          <Tab.Pane eventKey="consumption">
            <Consumption data={consumptionData} setData={setConsumptionData} />
          </Tab.Pane>

          <Tab.Pane eventKey="report">
            <Report comings={comingData} consumptions={consumptionData} />
          </Tab.Pane>
          
          <Tab.Pane eventKey="accounts">
            <Accounts />
          </Tab.Pane>

          <Tab.Pane eventKey="expenseTargets">
            <ExpenseTargets />
          </Tab.Pane>

          <Tab.Pane eventKey="budget">
            <BudgetManager />
          </Tab.Pane>

          <Tab.Pane eventKey="setting">
            <Setting />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
}

export default PageCash;
