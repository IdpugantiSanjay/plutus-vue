<template>
  <div class='flex'>
    <div v-for='position in readOnly ? modelValue : count'>
      <svg
        @click='() => !readOnly && handleInput(position)'
        tabindex='0'
        class=' outline-none focus:border-amber-600 star '
        xmlns='http://www.w3.org/2000/svg'
        :width='size'
        :height='size'
        :class="{ 'fill-amber-300': (rating || 0) >= position, 'fill-gray-300': (rating || 0) < position, 'mr-2 cursor-pointer' : !readOnly, 'select-none': readOnly }"
        viewBox='0 0 24 24'>
        <path
          d='M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z'></path>
      </svg>
    </div>
  </div>

</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Rating',
  props: {
    modelValue: Number,
    starSize: Number,
    readOnly: Boolean
  },
  data() {
    return {
      count: 5,
      rating: this.modelValue,
      size: this.starSize || 24
    }
  },
  methods: {
    handleInput(rating: number) {
      this.rating = rating
      this.$emit('update:modelValue', this.rating)
    }
  }
})
</script>

<style scoped>

</style>