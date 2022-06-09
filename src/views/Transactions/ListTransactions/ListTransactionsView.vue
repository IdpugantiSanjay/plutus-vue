<template>
  <div>
    <div class='flex items-center justify-between shadow-sm bg-white p-2'>
      <div>
      <span class='text-amber-500 cursor-pointer'>
      <svg @click='back' xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
           stroke='currentColor'
           stroke-width='2'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
      </svg>
      </span>
      </div>
      <div>
        <span class='text-xl'> Transactions </span>
      </div>
      <div>
      <span class='text-amber-500 cursor-pointer' @click='navigateToNewTransactionPage'>
        <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
             stroke='currentColor' stroke-width='2'>
              <path stroke-linecap='round' stroke-linejoin='round' d='M12 4v16m8-8H4' />
        </svg>
      </span>
      </div>
    </div>

    <div v-if='!loading && store.noTransactions' class='w-full h-full flex items-center justify-center'>
      <the-no-transactions class='shadow bg-white p-12 rounded-xl'></the-no-transactions>
    </div>
    <div class='overflow-hidden' v-else>
      <div v-for='(trxs, group) of transactions()'>
        <div class='flex justify-center mt-8'><span class='text-sm opacity-60 '> {{ monthYear(group) }} </span></div>
        <div class='w-full shadow-sm  bg-white mt-2 p-2 px-4'>
          <div v-for='(trx, index) of trxs' :key='trx.id'>
            <div class='relative' :data-id.attr='trx.id'>
              <div class='deleteButton text-pink-500 border-2 p-1 bg-gray-200' @click='() => deleteTransaction(trx.id)'>
                <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
                     stroke='currentColor'
                     stroke-width='2'>
                  <title> Delete Transaction </title>
                  <path stroke-linecap='round' stroke-linejoin='round'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                </svg>
              </div>
              <div class='items-center flex gap-3 relative overflow-hidden'
                   v-v-on-long-press='() => onLongPress(trx.id)'
                   v-v-on-click-outside='() => resetLongPress()'>
                <div class='flex flex-col basis-8 items-center'>
                  <div class='text-xs opacity-60'>
                    {{ month(trx.dateTime) }}
                  </div>
                  <div class='opacity-60'>
                    {{ day(trx.dateTime) }}
                  </div>
                </div>
                <div class='flex flex-col flex-1 min-w-0'>
                  <div class='truncate'>
                    {{ trx.category === 'Salary' ? 'SALARY FOR THE MONTH OF ' + month(trx.dateTime) : trx.foodOrder?.restaurant || trx.description
                    }}
                  </div>
                  <div class='text-xs opacity-60'>
                    {{ trx.category }}
                  </div>
                </div>
                <div class='text-xl shrink-0' :class=" { 'text-emerald-700': isIncome(trx) } ">
                  {{ isIncome(trx) ? '' : '-' }}₹{{ trx.amount }}
                </div>
              </div>

            </div>
            <div class='separator mb-2 mt-2' v-if='index != trxs.length - 1'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { useTransactionStore } from '@/views/Transactions/store/transaction'
import { vOnLongPress, vOnClickOutside } from '@vueuse/components'
import { gsap } from 'gsap'
import TheNoTransactions from '@/views/Transactions/ListTransactions/TheNoTransactions.vue'
import { useAuthStore } from '@/views/Auth/Login/store/auth'
import { isIncome } from '@/utils/isIncome'


import { PlusIcon } from '@heroicons/vue/solid'
import router from '@/router'

export default defineComponent({
  name: 'ListTransactionsView',
  components: { TheNoTransactions, PlusIcon },
  directives: { vOnLongPress, vOnClickOutside },
  setup() {
    const store = useTransactionStore()
    const loading = ref(true)
    onMounted(() => {
      store.fetchTransactions().then(() => loading.value = false)
    })

    let tl: gsap.core.Timeline

    const onLongPress = (id: string) => {
      tl = gsap.timeline({})

      tl
        .to(`[data-id="${id}"] > .relative`, {
          opacity: 0.2,
          duration: 0.2
        })
        .to(`[data-id="${id}"] > .deleteButton`, {
          transform: 'translate(-50%, -50%) scale(1)',
          duration: 0.2
        })
    }

    const resetLongPress = () => {
      if (tl) tl.reverse()
    }

    return { store, onLongPress, resetLongPress, loading, isIncome }
  },
  methods: {
    transactions() {
      return this.store.transactionsGroupedByMonth
    },
    month(dateString: string) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      return monthNames[new Date(dateString).getMonth()].slice(0, 3).toUpperCase()
    },
    day(dateString: string) {
      return new Date(dateString).getDate()
    },
    monthYear(monthYearString: string) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      const [month, year] = monthYearString.split(' ')
      return (monthNames[Number(month) - 1] + ' ' + year).toUpperCase()
    },
    deleteTransaction(id: string) {
      const tl = gsap.timeline({})

      tl.to(`[data-id="${id}"] > .deleteButton`, { scale: '0', duration: 0.2 })
        .to(`[data-id="${id}"]`, { translateX: '100%', scale: 0, duration: 0.5 })
        .then(() => {
          this.store.deleteTransaction(id)
        })
    },
    back() {

      if (window.history.length > 2) {
        router.go(-1)
      } else {
        router.push('/')
      }

    },
    navigateToNewTransactionPage() {
      router.push({ name: 'Create Transaction' })
    }
  }
})
</script>

<style scoped lang='scss'>
.separator {
  margin-inline: auto;
  width: 90%;
  background: #000;
  height: 1px;
  @apply bg-gray-100;
}


.deleteButton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  cursor: pointer;
  border-radius: 9999px;
  background-color: rgb(236 72 153 / 0.2);
  z-index: 1;

  &:hover {
    border-width: 2px;
    border-color: rgb(236 72 153 / 1);
  }
}

</style>