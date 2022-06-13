<template>
  <form class='mb-0' @submit.prevent='onSubmit' ref='form'>
    <fieldset class='space-y-6'>
      <div>
        <label for='amount'>
          Amount
          <div class='mt-1'>
            <input id='amount' type='number' required min='1' step=".1" v-model='form.amount' autofocus />
          </div>
        </label>
      </div>

      <div>
        <div class='mt-1'>
          <label for='category'>
            Category
            <select name='category' id='category' required v-model='form.category'>
              <option disabled value=''>Please select a category</option>
              <optgroup :label='section' v-for='section in categories'>
                <option :value='child' v-for='child in subCategories(section)'>
                  {{ child }}
                </option>
              </optgroup>
            </select>
          </label>
        </div>
      </div>

      <div v-if='form.category === "Mutual Fund"' class='space-y-6' >
        <div>
          <Combobox v-model='fundName'>
            <ComboboxLabel>Fund Name:</ComboboxLabel>

            <div class='relative mt-1'>
              <div
                class='relative w-full  cursor-default overflow-hidden rounded-sm bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-300 sm:text-sm'
              >

                <ComboboxInput
                  class='w-full border-gray-300 py-2 pl-3 pr-10 text-sm leading-[22px]'
                  :displayValue='(fund) => fund'
                  @change='query = $event.target.value'
                />

                <ComboboxButton
                  class='absolute inset-y-0 right-0 flex items-center pr-2'
                >
                  <SelectorIcon class='h-5 w-5 text-gray-400' aria-hidden='true' />
                </ComboboxButton>

              </div>
              <TransitionRoot
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  class='absolute mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'
                >
                  <div
                    v-if="filteredFunds.length === 0 && query !== ''"
                    class='relative cursor-default select-none py-2 px-4 text-gray-700 shadow'
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for='fund in filteredFunds'
                    as='template'
                    :key='fund'
                    :value='fund'
                    v-slot='{ selected, active }'
                  >
                    <li
                      class='relative cursor-default select-none py-2 pl-10 pr-4'
                      :class="{
                  'bg-amber-600 text-white': active,
                  'text-gray-900': !active,
                }"
                    >
                <span
                  class='block truncate'
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ fund }}
                </span>
                      <span
                        v-if='selected'
                        class='absolute inset-y-0 left-0 flex items-center pl-3'
                        :class="{ 'text-white': active, 'text-amber-600': !active }"
                      >
                  <CheckIcon class='h-5 w-5' aria-hidden='true' />
                </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>


        <div>
          <label for='units'>
            Units
            <div class='mt-1'>
              <input id='units' type='number' required min='1' v-model='units' step=".01" />
            </div>
          </label>
        </div>

      </div>

      <div>
        <label for='date'>Date & Time
          <div class='mt-1 flex gap-1'>
            <div class='flex-1 w-4/6'>
              <input id='date' name='date' type='date' required v-model='form.date' />
            </div>
            <div class='w-2/6'>
              <input id='time' name='time' type='time' required v-model='form.time' />
            </div>
          </div>
        </label>
      </div>

      <div>
        <label for='description'>
          Description
          <div class='mt-1'>
            <textarea id='description' v-model='form.description'></textarea>
          </div>
        </label>
      </div>

      <div v-if='form.category === "Food Delivery"'>
        <form>
          <fieldset>
            <div class='space-y-6'>
              <div>
                <label for='restaurant'>
                  Restaurant
                  <div class='mt-1 flex gap-4'>
                    <div class='flex-1'>
                      <input
                        id='restaurant'
                        name='restaurant'
                        type='text'
                        required
                        min='0'
                        v-model='restaurant'
                        autofocus />
                    </div>
                  </div>
                </label>
              </div>
              <dishes-list :dishes='dishes' @removeDish='removeDish'></dishes-list>
              <div class='flex justify-center'>
                <button
                  @click='addDish'
                  class='disabled:opacity-40 disabled:cursor-not-allowed flex text-amber-800 items-center gap-2 background-transparent font-bold uppercase px-3 py-1 text-xs focus:ring-amber-500 mr-1 mb-1'
                  type='button'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'>
                    <title>Add Dish</title>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </span>
                  <span> Add Dish </span>
                </button>
              </div>
            </div>
          </fieldset>
        </form>

      </div>


      <div class='mt-4 flex justify-center gap-2'>
        <button class='w-full btn btn-secondary' type='button' @click='resetForm'>Clear</button>
        <button class='btn btn-primary w-full transition-colors'>
          Save
        </button>
      </div>
    </fieldset>
  </form>

</template>

<script lang='ts'>
import { useCategoryStore } from '@/stores/category'
import type { TransactionForm } from '@/views/Transactions/CreateTransactions/types/TransactionForm'
import { getRoundedMinutes } from '@/utils/roundedMinutes'
import { computed, defineComponent, ref } from 'vue'
import type { Dishes } from '@/views/Transactions/CreateTransactions/types/Transaction'
import Rating from '@/components/TheRating.vue'
import DishesList from '@/views/Transactions/CreateTransactions/ui/DishesList.vue'
import { idGen } from '@/utils/nextId'

import { CheckIcon, SelectorIcon } from '@heroicons/vue/outline'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot
} from '@headlessui/vue'

export default defineComponent({
  name: 'CreateTransactionForm',
  components: {
    DishesList,
    Rating,
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    SelectorIcon,
    CheckIcon,
    TransitionRoot,
    ComboboxButton,
    ComboboxLabel
  },
  emits: ['formSubmit'],
  setup: function() {
    const categoryStore = useCategoryStore()

    const funds = [
      'UTI Nifty Index Fund',
      'UTI Nifty Next 50 Index Fund',
      'Nippon India Tax Saver (ELSS) Fund',
      'Aditya Birla Sun Life Tax Relief 96',
      'Tata India Tax Savings Fund',
      'Axis Midcap Fund',
      'Mirae Asset Healthcare Fund',
    ]
    const selectedPerson = ref(funds[0])
    const query = ref('')

    const filteredFunds = computed(() => {
      return query.value === ''
        ? funds
        : funds.filter((fund) => {
          return fund.toLowerCase().includes(query.value.toLowerCase())
        })
    })

    return {
      categories: categoryStore.categories,
      subCategories: categoryStore.subCategories,
      filteredFunds,
      query,
      selectedPerson,
      funds: funds
    }
  },
  data(): { form: TransactionForm } {
    return {
      form: {
        amount: 0,
        date: new Date().toLocaleDateString('en-CA'),
        time: `${new Date().getHours().toString().padStart(2, '0')}:${getRoundedMinutes(new Date())}`,
        category: '',
        description: '',
        foodOrder: {
          dishes: [],
          restaurant: ''
        }
      }
    }
  },
  watch: {
    category(value) {
      if (value === 'Food Order') {
        this.form = {
          ...this.form, foodOrder: {
            restaurant: '',
            dishes: []
          }
        }
      } else {
        this.form = { ...this.form, foodOrder: undefined }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('formSubmit', this.form)
    },
    addDish() {
      if (!this.form.foodOrder) return
      this.form.foodOrder.dishes.push({ rating: 0, name: '', id: idGen.next().value } as any)
    },
    removeDish(index: number) {
      if (!this.form.foodOrder) return
      this.form.foodOrder.dishes.splice(index, 1)
    },
    resetForm() {
      this.form = {
        amount: 0,
        date: new Date().toLocaleDateString('en-CA'),
        time: `${new Date().getHours().toString().padStart(2, '0')}:${getRoundedMinutes(new Date())}`,
        category: '',
        description: '',
        foodOrder: {
          dishes: [],
          restaurant: ''
        }
      }
    }

  },
  computed: {
    category() {
      return this.form.category
    },
    restaurant: {
      get() {
        return this.form.foodOrder?.restaurant || ''
      },
      set(value: string) {
        if (!this.form.foodOrder) this.form.foodOrder = { restaurant: '', dishes: [] }
        this.form.foodOrder.restaurant = value
      }
    },
    dishes: {
      get() {
        if (!this.form.foodOrder) this.form.foodOrder = { restaurant: '', dishes: [] }
        return this.form.foodOrder.dishes || []
      },
      set(_: Dishes[number]) {
      }
    },
    units: {
      get() {
        return this.form?.mutualFund?.units ?? 0
      },
      set(value: number) {
        if (!this.form.mutualFund) this.form.mutualFund = { name: '', units: 0 }
        this.form.mutualFund.units = value
      }
    },
    fundName: {
      get() {
        return this.form?.mutualFund?.name ?? ''
      },
      set(value: string) {
        if (!this.form.mutualFund) this.form.mutualFund = { name: '', units: 0 }
        this.form.mutualFund.name = value
      }
    }
  }
})
</script>

<style scoped>

</style>