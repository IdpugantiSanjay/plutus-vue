<template>
  <div class='flex gap-4'>
    <div class='flex-1'>
      <div class='flex justify-between items-center'>
        <label for='dish'> Dish </label>
        <span><the-rating v-model='dish.rating' /></span>
      </div>
      <div class='mt-1 flex gap-4'>
        <input type='text' required v-model='dish.name' />
      </div>
    </div>
    <div class='self-center justify-self-center text-pink-500'>
      <svg
        @click='remove'
        xmlns='http://www.w3.org/2000/svg'
        class='h-6 w-6 cursor-pointer'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        stroke-width='2'>
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
      </svg>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import TheRating from '@/components/TheRating.vue'

export default defineComponent({
  name: 'Dish',
  props: ['dish'],
  emits: ['remove'],
  components: { TheRating },
  methods: {
    remove() {
      this.$emit('remove')
    }
  }
})
</script>

<style scoped>

</style>