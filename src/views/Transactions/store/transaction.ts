import { defineStore } from 'pinia'
import type { Transaction } from '@/views/Transactions/CreateTransactions/types/Transaction'
import type { TransactionForm } from '@/views/Transactions/CreateTransactions/types/TransactionForm'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '@/views/Auth/Login/store/auth'
import { isIncome } from '@/utils/isIncome'

type TransactionStoreState = {
  transactions: Transaction[],
  q: string
  loading: boolean
}

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionStoreState => ({ transactions: [], q: '', loading: false }),
  getters: {
    transactionsGroupedByMonth() {
      let transactions = this.transactions

      if (this.q) {
        transactions = transactions.filter(t => {
          return t.foodOrder?.restaurant.toLowerCase().includes(this.q.toLowerCase())
            || t.description?.toLowerCase().includes(this.q.toLowerCase())
            || t.amount.toString().includes(this.q)
            || t.dateTime.includes(this.q)
            || t.category.toLowerCase().includes(this.q.toLowerCase())
            || new Date(t.dateTime).toLocaleString('default', { month: 'long' }).toLowerCase().includes(this.q.toLowerCase())
        })
      }

      const groups: Record<string, Transaction[]> = {}
      for (const transaction of transactions) {
        const transactionDate = new Date(transaction.dateTime)
        const monthYear = transactionDate.getMonth() + 1 + ' ' + transactionDate.getFullYear()
        if (monthYear in groups) groups[monthYear].push(transaction)
        else groups[monthYear] = [transaction]
      }
      return groups
    },
    noTransactions(): boolean {
      return !this.transactions || !this.transactions.length
    },
    getQ(): string {
      return this.q
    }
  },
  actions: {
    fetchTransactions() {
      const auth = useAuthStore()
      this.loading = true
      return axios.get(`https://localhost:7020/api/users/${auth.username}/transactions`, {
        params: { orderBy: 'dateTime desc' }
      }).then((resp: AxiosResponse<{ entities: Transaction[] }>) => {
        this.transactions = resp.data.entities.map(e => ({ ...e, isIncome: isIncome(e) }))
        this.loading = false
      })
    },
    createTransaction(transaction: TransactionForm): Promise<void> {
      const auth = useAuthStore()
      this.loading = true
      return axios.post(`https://localhost:7020/api/users/${auth.username}/transactions`, {
        ...transaction,
        dateTime: new Date(`${transaction.date} ${transaction.time}`).toISOString()
      }).then(() => {
        this.loading = false
      })
    },
    deleteTransaction(id: string) {
      const auth = useAuthStore()
      this.loading = true
      return axios.delete(`https://localhost:7020/api/users/${auth.username}/transactions/${id}`).then(() => {
        const index = this.transactions.findIndex(t => t.id === id)
        this.transactions.splice(index, 1)
        this.loading = false
      })
    },
    setQ(value: string) {
      this.q = value
    }
  }
})