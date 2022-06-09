import type { Transaction } from '@/views/Transactions/CreateTransactions/types/Transaction'

export type TransactionForm =
    Omit<Transaction, 'id' | 'username' | 'dateTime' >
    & { date: string, time: string }