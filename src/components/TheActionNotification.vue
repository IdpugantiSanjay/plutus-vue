<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <transition enter-active-class='transform ease-out duration-300 transition'
                enter-from-class='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                enter-to-class='translate-y-0 opacity-100 sm:translate-x-0'
                leave-active-class='transition ease-in duration-100' leave-from-class='opacity-100'
                leave-to-class='opacity-0'>
      <div v-if='show'
           class='max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden'>
        <div class='p-4'>
          <div class='flex items-center'>
            <div class='w-0 flex-1 flex justify-between'>
              <p class='w-0 flex-1 text-sm font-medium text-gray-900'>Discussion archived</p>
              <button type='button' @click='$emit("onActionClick")'
                      class='ml-3 flex-shrink-0 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Undo
              </button>
            </div>
            <div class='ml-4 flex-shrink-0 flex'>
              <button @click='$emit("onCloseClick")'
                      class='bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <span class='sr-only'>Close</span>
                <XIcon class='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { XIcon } from '@heroicons/vue/solid'

export default {
  components: {
    XIcon
  },
  props: ['show'],
  emits: ['onActionClick', 'onCloseClick'],
}
</script>