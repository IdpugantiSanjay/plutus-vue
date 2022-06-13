<template>
  <div>
    <div class='flex items-center justify-between shadow-sm bg-white p-2'>
      <div>
      <span class='text-amber-500 cursor-pointer'>
        <svg class='h-9 w-9 hover:opacity-60' @click='back' xmlns='http://www.w3.org/2000/svg' fill='none'
             viewBox='0 0 24 24'>
<g transform='matrix(0.5,0,0,0.5,0,0)'><circle r='20' fill='#fde68a' transform='matrix(-1 0 0 1 24 24)'></circle><path
  fill='#f59e0b'
  d='M20.0989 14.5345C21.6193 13.3907 23.4626 14.175 23.5825 16.0093C23.6524 17.0789 23.7146 18.4454 23.7526 20.1782C28.3482 20.239 32.6929 20.41 34.8837 20.5369C36.2918 20.6184 36.827 21.4444 36.951 22.774C36.9814 23.0989 37 23.4633 37 23.8681C37 24.317 36.9771 24.7162 36.9407 25.0671C36.809 26.3384 36.3444 27.1457 35 27.2638C32.8238 27.4549 28.4306 27.719 23.7528 27.8119C23.7149 29.5492 23.6526 30.9187 23.5825 31.9904C23.4626 33.825 21.6188 34.6094 20.0981 33.4654C19.0725 32.6939 17.7736 31.6605 16.1772 30.2925C13.7284 28.1941 12.3296 26.6205 11.5432 25.5718C10.8189 24.6059 10.819 23.395 11.5433 22.4291C12.3298 21.3805 13.7285 19.8069 16.1772 17.7083C17.774 16.3397 19.0731 15.3061 20.0989 14.5345Z'></path></g></svg>
      </span>
      </div>
      <div>
        <span class='text-xl'> Transactions </span>
      </div>
      <div class='flex'>
        <div>
          <span class='text-amber-500 cursor-pointer' @click='navigateToNewTransactionPage'>
        <svg class='h-9 w-9 hover:opacity-60' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
<g transform='matrix(0.5,0,0,0.5,0,0)'><circle cx='24' cy='24' r='20' fill='#fde68a'></circle><path fill='#f59e0b'
                                                                                                    d='M22.638 34.9111C21.696 34.7777 21.1509 33.9427 21.1168 32.9919C21.0756 31.8464 21.0288 29.9516 21.0093 26.9907C18.0484 26.9712 16.1536 26.9244 15.0081 26.8832C14.0573 26.8491 13.2223 26.304 13.0889 25.362C13.0361 24.989 13 24.5375 13 24C13 23.4625 13.0361 23.011 13.0889 22.638C13.2223 21.696 14.0573 21.1509 15.0081 21.1168C16.1536 21.0756 18.0484 21.0288 21.0093 21.0093C21.0288 18.0484 21.0756 16.1536 21.1168 15.0081C21.1509 14.0573 21.696 13.2223 22.638 13.0889C23.011 13.0361 23.4625 13 24 13C24.5375 13 24.989 13.0361 25.362 13.0889C26.304 13.2223 26.8491 14.0573 26.8832 15.0081C26.9244 16.1536 26.9712 18.0484 26.9907 21.0093C29.9516 21.0288 31.8464 21.0756 32.9919 21.1168C33.9427 21.1509 34.7777 21.696 34.9111 22.638C34.9639 23.011 35 23.4625 35 24C35 24.5375 34.9639 24.989 34.9111 25.362C34.7777 26.304 33.9427 26.8491 32.9919 26.8832C31.8464 26.9244 29.9516 26.9712 26.9907 26.9907C26.9712 29.9516 26.9244 31.8464 26.8832 32.9919C26.8491 33.9427 26.304 34.7777 25.362 34.9111C24.989 34.9639 24.5375 35 24 35C23.4625 35 23.011 34.9639 22.638 34.9111Z'></path></g></svg>
      </span>
        </div>
      </div>
    </div>

    <Transition name='fade'>
      <div class='mt-4 w-3/4 m-auto flex' v-show='showSearch'>
        <div class='relative flex-1'>
          <input v-model='q' id='q' name='q' type='text' required=''
                 class='appearance-none block w-full pl-10 shadow-sm placeholder-gray-400 text-sm'
                 ref='searchBox' placeholder='Search...' />
          <svg @click='$refs.searchBox.focus()' class='h-6 w-6 absolute left-2 top-1.5 opacity-40'
               xmlns='http://www.w3.org/2000/svg' fill='none'
               viewBox='0 0 24 24'>
            <g transform='matrix(0.5,0,0,0.5,0,0)'>
              <path fill='#f59e0b' fill-rule='evenodd'
                    d='M37.388 31.3437C39.0454 28.62 40 25.4215 40 22C40 12.0589 31.9411 4 22 4C12.0589 4 4 12.0589 4 22C4 31.9411 12.0589 40 22 40C25.4215 40 28.62 39.0454 31.3437 37.388C31.5081 37.586 31.6719 37.7837 31.8355 37.981C33.5263 40.0209 35.1874 42.0249 37.0998 43.9982C38.2598 45.1951 39.9911 45.3681 41.23 44.2531C41.6689 43.8581 42.1824 43.3728 42.7776 42.7776C43.3728 42.1824 43.8581 41.6689 44.2531 41.23C45.3681 39.9911 45.1951 38.2598 43.9982 37.0998C42.0249 35.1874 40.0209 33.5263 37.981 31.8355C37.7837 31.6719 37.586 31.5081 37.388 31.3437Z'
                    clip-rule='evenodd'></path>
              <circle cx='22' cy='22' r='12' fill='#fde68a'></circle>
            </g>
          </svg>
        </div>
      </div>
    </Transition>


    <div v-if='!loading() && store.noTransactions' class='w-full h-full flex items-center justify-center'>
      <the-no-transactions class='shadow bg-white p-12 rounded-xl'></the-no-transactions>
    </div>
    <div class='overflow-hidden' v-else>
      <div v-for='(trxs, group) of transactions()'>
        <div class='flex justify-center mt-8'><span class='text-sm opacity-60 '> {{ monthYear(group) }} </span></div>
        <div class='w-full shadow-sm  bg-white mt-2 p-2 px-4'>
          <div v-for='(trx, index) of trxs' :key='trx.id'>
            <on-click-outside class='relative' :data-id.attr='trx.id' @trigger='() => resetLongPress(trx.id)'
                              v-v-on-long-press='[() => onLongPress(trx.id), { delay: 600 }]'>
              <div class='deleteButton text-pink-500 border-2 p-1 bg-gray-200'
                   @click='() => deleteTransaction(trx.id)'>
                <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24'
                     stroke='currentColor'
                     stroke-width='2'>
                  <title> Delete Transaction </title>
                  <path stroke-linecap='round' stroke-linejoin='round'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                </svg>
              </div>

              <div class='items-center flex gap-3 relative overflow-hidden'
              >
                <div class='flex flex-col basis-8 items-center'>
                  <div class='text-xs opacity-60'>
                    {{ month(trx.dateTime) }}
                  </div>
                  <div class='opacity-60'>
                    {{ day(trx.dateTime) }}
                  </div>
                </div>
                <div class='flex flex-col flex-1 min-w-0'>

                  <div v-if='trx.category === "Food Delivery"' class='flex truncate items-center gap-2'>
                    <span> {{ trx.foodOrder.restaurant }} </span>
                    <span>
                      <rating :model-value='avgRating(trx.foodOrder.dishes)' :star-size='20' :read-only='true'></rating>
                    </span>
                  </div>

                  <div class='truncate' v-else>
                    {{ trx.category === 'Salary'
                    ? 'SALARY FOR THE MONTH OF ' + month(trx.dateTime)
                    : trx.category === 'Mutual Fund'
                      ? trx.mutualFund.name + ' [' + trx.mutualFund.units + ' Units]'
                      : trx.category === 'Food Delivery'
                        ? trx.foodOrder.restaurant
                        : trx.description
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
            </on-click-outside>
            <div class='separator mb-2 mt-2' v-if='index !== trxs.length - 1'></div>
          </div>
        </div>
      </div>
    </div>

    <teleport to='#modals'>
      <the-action-notification @onActionClick='undoDelete' v-bind='notification' @onCloseClick='notification.show = false'></the-action-notification>
    </teleport>
  </div>


</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { useTransactionStore } from '@/views/Transactions/store/transaction'
import { vOnLongPress, OnClickOutside } from '@vueuse/components'
import { gsap } from 'gsap'
import TheNoTransactions from '@/views/Transactions/ListTransactions/TheNoTransactions.vue'
import { isIncome } from '@/utils/isIncome'
import type { Dishes } from '@/views/Transactions/CreateTransactions/types/Transaction'

import { PlusIcon } from '@heroicons/vue/solid'
import router from '@/router'
import { mapState } from 'pinia'
import Rating from '@/components/TheRating.vue'
import TheSimpleNotification from '@/components/TheSimpleNotification.vue'
import TheActionNotification from '@/components/TheActionNotification.vue'

export default defineComponent({
  name: 'ListTransactionsView',
  components: { TheActionNotification, Rating, TheNoTransactions, PlusIcon, OnClickOutside, TheSimpleNotification },
  directives: { vOnLongPress },
  setup() {
    const store = useTransactionStore()
    onMounted(() => {
      store.fetchTransactions()
    })

    const timeLines: Record<string, gsap.core.Timeline> = {}

    const resetLongPress = (id: string) => {
      if (!(id in timeLines)) return

      if (Object.values(timeLines).length) {
        for (const [prevId, tl] of Object.entries(timeLines)) {
          tl.reverse().then(() => tl.kill()).then(() => {
            (timeLines as any)[prevId] = null
            delete timeLines[prevId]
          })
        }
      }
    }

    const onLongPress = async (id: string) => {
      if (Object.values(timeLines).length) {
        for (const [prevId, tl] of Object.entries(timeLines)) {
          tl.reverse().then(() => tl.kill()).then(() => {
            (timeLines as any)[prevId] = null
            delete timeLines[prevId]
          })
        }
      }

      timeLines[id] = gsap.timeline()
      timeLines[id].to(`[data-id="${id}"] > .relative`, {
        opacity: 0.2,
        duration: 0.1
      }).to(`[data-id="${id}"] > .deleteButton`, {
        transform: 'translate(-50%, -50%) scale(1)',
        duration: 0.1
      })
    }

    const notification = ref({ title: '', show: false, description: '' });
    let stopDelete = false

    const deleteWithDelay = (id: string) => {
      store.removeFromStore(id)
      stopDelete = false

      notification.value.show = true
      notification.value.title = 'Transaction Deleted'
      setTimeout(() => {
        notification.value.show = false
        if (!stopDelete) {
          store.deleteTransaction(id)
        }
      }, 2_000)
    }

    const undoDelete = () => {
      stopDelete = true
      notification.value.show = false
    }

    return { store, isIncome, onLongPress, resetLongPress, notification, deleteWithDelay, undoDelete }
  },
  data() {
    return {
      q: '',
      showSearch: true
    }
  },
  methods: {
    ...mapState(useTransactionStore, ['loading']),
    avgRating(dishes: Dishes) {
      return Math.floor(dishes.reduce((acc, d) => acc + d.rating, 0) / dishes.length)
    },
    toggleSearchBox() {
      this.showSearch = !this.showSearch
      if (!this.showSearch) this.q = ''
      if (this.showSearch) {
        const searchBox = this.$refs.searchBox as HTMLInputElement
        setTimeout(() => searchBox.focus(), 50)
      }
    },
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
          this.deleteWithDelay(id)
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
    },
  },
  watch: {
    q(value) {
      this.store.setQ(value)
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

</style>