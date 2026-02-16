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

export interface BillSummary {
  name: string;
  amount: number;
  numberOfBills: number;
}

export interface Bill {
  title: string;
  status: string;
  frequency: string;
  dueDate: number;
  amount: number;
}

export interface FinanceState {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
  billsSummary: BillSummary[];
  bills: Bill[];
}
