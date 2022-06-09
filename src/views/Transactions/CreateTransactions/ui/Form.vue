<template>
  <form class='mb-0' @submit.prevent='onSubmit' ref='form'>
    <fieldset class='space-y-6'>
      <div>
        <label for='amount'>
          Amount
          <div class='mt-1'>
            <input id='amount' type='number' required min='1' v-model='form.amount' autofocus />
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
import { defineComponent } from 'vue'
import type { Dishes } from '@/views/Transactions/CreateTransactions/types/Transaction'
import Rating from '@/components/TheRating.vue'
import DishesList from '@/views/Transactions/CreateTransactions/ui/DishesList.vue'
import { idGen } from '@/utils/nextId'

export default defineComponent({
  name: 'CreateTransactionForm',
  components: { DishesList, Rating },
  emits: ['formSubmit'],
  setup() {
    const categoryStore = useCategoryStore()
    return {
      categories: categoryStore.categories,
      subCategories: categoryStore.subCategories
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
      this.form.foodOrder.dishes.splice(index, 1);
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
    }
  }
})
</script>

<style scoped>

</style>