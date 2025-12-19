export interface Balance {
  current: number;
  income: number;
  expenses: number;
}

export interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface Budget {
  category: string;
  spent: number;
  maximum: number;
  theme: string;
}

export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface Bill {
  name: string;
  amount: number;
  numberOfBills: number;
}

export interface FinanceState {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
  bills: Bill[];
}
