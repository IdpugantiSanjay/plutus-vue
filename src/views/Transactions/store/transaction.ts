import { defineStore } from 'pinia'
import type { Transaction } from '@/views/Transactions/CreateTransactions/types/Transaction'
import type { TransactionForm } from '@/views/Transactions/CreateTransactions/types/TransactionForm'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '@/views/Auth/Login/store/auth'
import { isIncome } from '@/utils/isIncome'


type ListTransactionVm =
  Omit<Transaction, 'foodOrder' | 'mutualFund'>
  & { 'foodOrder': ListTransactionFoodOrderVm }
  & { 'mutualFund': ListTransactionMutualFundVm }
  & { isIncome: boolean, monthYear: string, month: string, date: number, searchTags: Array<string>, title: string }


type ListTransactionFoodOrderVm = Transaction['foodOrder'] & { rating: number }
type ListTransactionMutualFundVm = Transaction['mutualFund'] & { unitPrice: number }

type TransactionStoreState = {
  transactions: ListTransactionVm[],
  q: string
  loading: boolean
}

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionStoreState => ({ transactions: [], q: '', loading: false }),
  getters: {
    transactionsGroupedByMonth() {
      let transactions = this.transactions

      if (this.q) {
        transactions = transactions.filter(t => t.searchTags.some(s => s.toLowerCase().includes(this.q.toLowerCase())))
      }

      const groups: Record<string, ListTransactionVm[]> = {}
      for (const transaction of transactions) {
        const transactionDate = new Date(transaction.dateTime)
        const monthYear = transaction.month + ' ' + transactionDate.getFullYear()
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
    },
    endpoint() {
      const auth = useAuthStore()
      const username = auth.username
      return `/users/${username}/transactions`
    }
  },
  actions: {
    fetchTransactions() {
      this.loading = true
      return axios.get(this.endpoint, {
        params: { orderBy: 'dateTime desc' }
      }).then((resp: AxiosResponse<{ entities: ListTransactionVm[] }>) => {
        this.transactions = resp.data.entities.map(e => ({ ...e, isIncome: isIncome(e) }))
        this.loading = false
      })
    },
    createTransaction(transaction: TransactionForm): Promise<void> {
      this.loading = true
      return axios.post(this.endpoint, {
        ...transaction,
        dateTime: new Date(`${transaction.date} ${transaction.time}`).toISOString()
      }).then(() => {
        this.loading = false
      })
    },
    deleteTransaction(id: string) {
      this.loading = true
      return axios.delete(`${this.endpoint}/${id}`).then(() => {
        this.loading = false
      })
    },
    removeFromStore(id: string) {
      const index = this.transactions.findIndex(t => t.id === id)
      this.transactions.splice(index, 1)
    },

    setQ(value: string) {
      this.q = value
    }
  }
})