<script setup lang='ts'>
import { RouterView } from 'vue-router'
import TheSimpleNotification from '@/components/TheSimpleNotification.vue'
import { useEventBus } from '@vueuse/core'
import { ref } from 'vue'

let showSimpleNotification = ref<boolean>(false)
const bus = useEventBus<{ title: string, description: string }>('SIMPLE_NOTIFICATION')
const notificationTitle = ref<string>('')
const notificationDescription = ref<string>('')

bus.on(payload => {
  showSimpleNotification.value = true
  notificationTitle.value = payload.title
  notificationDescription.value = payload.description
  setTimeout(() => showSimpleNotification.value = false, 2_000)
})

</script>

<template>
  <router-view v-slot='{ Component }'>
    <transition name='route' mode='out-in'>
      <component :is='Component'></component>
    </transition>
  </router-view>

  <teleport to='#modals'>
    <div class='w-full flex flex-col items-center space-y-4 sm:items-end'>
      <the-simple-notification :title='notificationTitle'
                               :description='notificationDescription'
                               :show='showSimpleNotification'
                               @onCloseClick='showSimpleNotification = false'>
      </the-simple-notification>
    </div>



  </teleport>
</template>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
