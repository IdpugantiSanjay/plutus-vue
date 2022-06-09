import type { Transaction } from '@/views/Transactions/CreateTransactions/types/Transaction'
import { Categories } from '@/stores/category'

export function isIncome(transaction: Transaction) {
  return Categories['Income'].includes(transaction.category as any)
}