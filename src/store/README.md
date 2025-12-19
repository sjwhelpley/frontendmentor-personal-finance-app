# Redux Store Setup

This store is initialized with data from `src/data.json`.

## Usage

### Accessing State

```tsx
"use client";

import { useAppSelector } from "@/store/hooks";

export default function MyComponent() {
  const balance = useAppSelector((state) => state.finance.balance);
  const transactions = useAppSelector((state) => state.finance.transactions);
  const pots = useAppSelector((state) => state.finance.pots);
  const budgets = useAppSelector((state) => state.finance.budgets);
  const bills = useAppSelector((state) => state.finance.bills);

  return (
    <div>
      <p>Current Balance: ${balance.current}</p>
      {/* ... */}
    </div>
  );
}
```

### Dispatching Actions

When you add actions to `financeSlice.ts`, you can dispatch them like this:

```tsx
"use client";

import { useAppDispatch } from "@/store/hooks";
import { updateBalance } from "@/store/financeSlice";

export default function MyComponent() {
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    dispatch(updateBalance({ current: 5000 }));
  };

  return <button onClick={handleUpdate}>Update Balance</button>;
}
```

## Structure

- `store.ts` - Main store configuration
- `financeSlice.ts` - Finance state slice with reducers
- `StoreProvider.tsx` - Redux Provider component (client component)
- `hooks.ts` - Typed hooks for accessing state and dispatching actions
- `types/finance.ts` - TypeScript types for the finance state

