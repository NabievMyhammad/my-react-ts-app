import React, { useState, useEffect } from 'react';

export type BudgetCategory = {
  id: number;
  name: string;
  amount: number;
};

const LOCAL_STORAGE_KEY_CATEGORIES = 'budgetCategories';
const LOCAL_STORAGE_KEY_LIMIT = 'budgetLimit';

export function BudgetManager() {
  const [categories, setCategories] = useState<BudgetCategory[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CATEGORIES);
    return saved ? JSON.parse(saved) : [];
  });

  const [limit, setLimit] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LIMIT);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_LIMIT, limit.toString());
  }, [limit]);

  const resetBudget = () => {
    setCategories([]);
  };

  const resetLimit = () => {
    setLimit(0);
  };

  const addCategory = (name: string, amount: number) => {
    const newCategory: BudgetCategory = {
      id: Date.now(),
      name,
      amount,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0);

  // Цвета для дизайна
  const colors = {
    primaryBlue: '#1e90ff',
    primaryGreen: '#2ecc71',
    lightBlue: '#e6f0fa',
    lightGreen: '#d4f0d4',
    dangerRed: '#e74c3c',
    textDark: '#2c3e50',
  };

  return (
    <div
      style={{
        padding: '1.5rem',
        maxWidth: '420px',
        borderRadius: '12px',
        backgroundColor: colors.lightBlue,
        boxShadow: `0 4px 10px rgba(30, 144, 255, 0.3)`,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: colors.textDark,
      }}
    >
      <h2 style={{ borderBottom: `2px solid ${colors.primaryBlue}`, paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        Управление бюджетом
      </h2>

      <div style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ flexGrow: 1, fontWeight: '600' }}>
          Лимит бюджета:{' '}
          <input
            type="number"
            value={limit === 0 ? '' : limit}
            onChange={e => setLimit(Number(e.target.value) || 0)}
            placeholder="Введите лимит"
            style={{
              width: '110px',
              marginLeft: '10px',
              padding: '6px 8px',
              borderRadius: '6px',
              border: `2px solid ${colors.primaryBlue}`,
              fontWeight: '600',
              color: colors.textDark,
            }}
            min={0}
          />
        </label>
        <button
          onClick={resetLimit}
          style={{
            backgroundColor: colors.primaryBlue,
            border: 'none',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.primaryGreen)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primaryBlue)}
          title="Сбросить лимит"
        >
          Сбросить лимит
        </button>
      </div>

      <button
        onClick={resetBudget}
        style={{
          marginBottom: '1.5rem',
          backgroundColor: colors.primaryGreen,
          color: 'white',
          border: 'none',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          width: '100%',
          boxShadow: `0 2px 6px ${colors.primaryGreen}`,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primaryGreen)}
        title="Сбросить все категории"
      >
        Сбросить бюджет
      </button>

      <ul
        style={{
          marginBottom: '1.5rem',
          paddingLeft: '20px',
          color: colors.textDark,
          fontWeight: '600',
          minHeight: '60px',
          borderRadius: '6px',
          backgroundColor: colors.lightGreen,
          boxShadow: `inset 0 0 8px rgba(46, 204, 113, 0.2)`,
        }}
      >
        {categories.length === 0 && <li>Бюджет пуст. Добавьте категории ниже.</li>}
        {categories.map(cat => (
          <li key={cat.id} style={{ padding: '4px 0' }}>
            {cat.name}: <span style={{ color: colors.primaryBlue }}>{cat.amount} сомони</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginBottom: '1.5rem',
          fontWeight: '700',
          fontSize: '1.1rem',
          color: totalAmount > limit && limit > 0 ? colors.dangerRed : colors.primaryGreen,
        }}
      >
        {limit > 0 ? (
          totalAmount > limit ? (
            '⚠️ Внимание! Превышен лимит бюджета!'
          ) : (
            `Остаток лимита: ${limit - totalAmount} сомони`
          )
        ) : (
          `Общая сумма: ${totalAmount} сомони`
        )}
      </div>

      <AddCategoryForm onAdd={addCategory} colors={colors} />
    </div>
  );
}

type AddCategoryFormProps = {
  onAdd: (name: string, amount: number) => void;
  colors: {
    primaryBlue: string;
    primaryGreen: string;
    lightBlue: string;
    lightGreen: string;
    dangerRed: string;
    textDark: string;
  };
};

function AddCategoryForm({ onAdd, colors }: AddCategoryFormProps) {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim()) return;

    const amountNumber = Number(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert('Введите корректное число для суммы');
      return;
    }

    onAdd(name, amountNumber);
    setName('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Категория"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: '8px',
          border: `2px solid ${colors.primaryBlue}`,
          fontWeight: '600',
          color: colors.textDark,
        }}
        required
      />
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{
          width: '120px',
          padding: '8px 12px',
          borderRadius: '8px',
          border: `2px solid ${colors.primaryBlue}`,
          fontWeight: '600',
          color: colors.textDark,
        }}
        required
        min={1}
      />
      <button
        type="submit"
        style={{
          backgroundColor: colors.primaryGreen,
          border: 'none',
          color: 'white',
          padding: '10px 18px',
          borderRadius: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: `0 3px 8px ${colors.primaryGreen}`,
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.primaryGreen)}
      >
        Добавить
      </button>
    </form>
  );
}

