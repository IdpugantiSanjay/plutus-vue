<template>
  <div>


    <div class='sm:mx-auto sm:w-full sm:max-w-md'>
      <h2
        class='mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600'>
        Enter your Income/Expenses
      </h2>
    </div>

    <div class='mt-8 mx-auto sm:max-w-md max-w-sm plutus-transaction-form-wrapper'>
      <div class='bg-white py-8 px-6 shadow rounded-lg'>
        <create-transaction-form @formSubmit='onFormSubmit' />
      </div>
    </div>



  </div>
</template>

<script lang='ts'>
import TheSimpleNotification from '@/components/TheSimpleNotification.vue'
import { defineComponent } from 'vue'
import CreateTransactionForm from '@/views/Transactions/CreateTransactions/ui/Form.vue'
import { useTransactionStore } from '@/views/Transactions/store/transaction'
import type { TransactionForm } from '@/views/Transactions/CreateTransactions/types/TransactionForm'
import { mapActions } from 'pinia'
import { useEventBus } from '@vueuse/core'

export default defineComponent({
  name: 'CreateTransactionsView',
  components: { CreateTransactionForm, TheSimpleNotification },
  data() {
    return {
      showSuccessNotification: false
    }
  },
  methods: {
    ...mapActions(useTransactionStore, ['createTransaction']),
    onFormSubmit(form: TransactionForm) {
      this.createTransaction(form).then(() => {
        const bus = useEventBus<{ title: string, description: string }>('SIMPLE_NOTIFICATION')
        this.$router.push({ name: 'View Transactions' })
        bus.emit({ title: 'Transaction Created Successfully', description: `Transaction with amount: ${form.amount} created` })
      })
    }
  }
})

</script>

<style scoped>
.plutus-transaction-form-wrapper {
  width: MIN(95%, 400px);
}
</style>
