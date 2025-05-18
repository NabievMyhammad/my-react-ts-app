import { useState } from 'react';

export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;  // исходный лимит
  priority: number; // 1 - самый высокий, 3 - самый низкий
  spent: number;
}

export function useDynamicBudget(initialCategories: BudgetCategory[]) {
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);

  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  function addExpense(categoryId: string, amount: number) {
    setCategories(prev => {
      const updated = prev.map(c => c.id === categoryId ? { ...c, spent: c.spent + amount } : c);
      const currentCat = updated.find(c => c.id === categoryId);
      if (!currentCat) return updated;

      const overSpent = currentCat.spent - currentCat.budget;
      if (overSpent <= 0) return updated;

      let overLeft = overSpent;

      // Категории для перераспределения, сортируем по приоритету (меньше = выше приоритет)
      const others = updated.filter(c => c.id !== categoryId)
        .sort((a, b) => a.priority - b.priority);

      const redistributed = others.map(c => {
        if (overLeft <= 0) return c;
        const available = c.budget - c.spent;
        if (available <= 0) return c;

        const cut = Math.min(available, overLeft);
        overLeft -= cut;
        return { ...c, budget: c.budget - cut };
      });

      const result = updated.map(c => {
        if (c.id === categoryId) return c;
        const redCat = redistributed.find(rc => rc.id === c.id);
        return redCat || c;
      });

      if (overLeft > 0) alert('Внимание! Бюджет перерасходован, перераспределение не покрывает перерасход.');

      return result;
    });
  }

  return { categories, totalBudget, totalSpent, addExpense };
}
