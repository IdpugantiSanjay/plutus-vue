<template>
  <div class='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
    <div class='sm:mx-auto sm:w-full sm:max-w-md'>
      <h2 class='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
    </div>

    <div class='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div class='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <form class='space-y-6' @submit.prevent='onLogin'>
          <div>
            <label for='username' class='block text-sm font-medium text-gray-700'> Username </label>
            <div class='mt-1'>
              <input v-model='username' id='username' name='username' type='text' autocomplete='username' required
                     class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm' />
            </div>
          </div>

          <div>
            <label for='password' class='block text-sm font-medium text-gray-700'> Password </label>
            <div class='mt-1'>
              <input v-model='password' id='password' name='password' type='password' autocomplete='current-password'
                     required
                     class='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm' />
            </div>
          </div>

          <div class='flex items-center justify-between'>
            <div class='flex items-center'>
              <input id='remember-me' name='remember-me' type='checkbox'
                     class='h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded' />
              <label for='remember-me' class='ml-2 block text-sm text-gray-900'> Remember me </label>
            </div>

            <div class='text-sm'>
              <a href='#' class='font-medium text-amber-600 hover:text-amber-500'> Forgot your password? </a>
            </div>
          </div>

          <div>
            <button type='submit'
                    class='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { mapActions } from 'pinia'
import { useAuthStore } from './store/auth'
import router from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    onLogin() {
      this.login({ username: this.username, password: this.password }).then(() => router.push({name: 'View Transactions'}))
    }
  }
})
</script>

<style scoped>

</style>