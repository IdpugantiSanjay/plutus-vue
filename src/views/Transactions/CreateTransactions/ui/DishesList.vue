<template>
  <transition-group tag='ul' name='list'>
      <dish v-for='(d, index) in dishes' class='mb-2' @remove='() => removeDish(index)' :dish='d' :key='d.id'></dish>
  </transition-group>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import TheRating from '@/components/TheRating.vue'
import Dish from '@/views/Transactions/CreateTransactions/ui/Dish.vue'

export default defineComponent({
  name: 'DishesList',
  props: ['dishes'],
  emits: ['removeDish'],
  components: { Dish, TheRating },
  methods: {
    removeDish(index: number) {
      this.$emit('removeDish', index)
    }
  }
})
</script>

<style scoped>
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}

/* .list-enter-to {
  opacity: 1;
  transform: scale(1);
} */
.list-enter-active {
  transition: all 0.4s ease;
}

/* .list-leave-from {
  opacity: 1;
  transform: scale(1);
} */
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-leave-active {
  transition: all 0.4s ease;
}

.list-move {
  transition: all 0.3s ease;
}

</style>