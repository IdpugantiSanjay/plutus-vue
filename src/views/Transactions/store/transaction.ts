import { defineStore } from 'pinia'
import type { Transaction } from '@/views/Transactions/CreateTransactions/types/Transaction'
import type { TransactionForm } from '@/views/Transactions/CreateTransactions/types/TransactionForm'
import axios from 'axios'

import type { AxiosResponse } from 'axios'

import { useAuthStore } from '@/views/Auth/Login/store/auth'
import { useCategoryStore } from '@/stores/category'
import { isIncome } from '@/utils/isIncome'


type TransactionStoreState = {
  transactions: Transaction[]
}


export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionStoreState => ({ transactions: [] }),
  getters: {
    transactionsGroupedByMonth() {
      const transactions = this.transactions
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
      const transactions = this.transactions
      return !transactions || !transactions.length
    }
  },
  actions: {
    fetchTransactions() {
      const auth = useAuthStore()
      const category = useCategoryStore()
      return axios.get(`https://localhost:7020/api/users/${auth.username}/transactions`)
        .then((resp: AxiosResponse<{ entities: Transaction[] }>) => {
          this.transactions = resp.data.entities.map(e => ({ ...e, isIncome: isIncome(e)  }))
        })
    },
    createTransaction(transaction: TransactionForm): Promise<void> {
      const auth = useAuthStore()
      return axios.post(`https://localhost:7020/api/users/${auth.username}/transactions`, {
        ...transaction,
        dateTime: new Date(`${transaction.date} ${transaction.time}`).toISOString()
      })
    },
    deleteTransaction(id: string) {
      const auth = useAuthStore()
      return axios.delete(`https://localhost:7020/api/users/${auth.username}/transactions/${id}`).then(resp => {
        const idToDelete = this.transactions.findIndex(t => t.id === id)
        return this.transactions.splice(idToDelete)
      })
    }
  }
})