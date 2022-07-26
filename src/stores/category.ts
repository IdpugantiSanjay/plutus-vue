import { defineStore } from 'pinia'


export const Categories = {
  Income: ['Salary', 'Rent', 'Transfer In', 'Internet Reimbursement', 'Mutual Fund Redemption', 'Stock Dividend'],
  Entertainment: ['Movies'],
  Education: ['Books'],
  'Health & Fitness': ['Doctor', 'Pharmacy', 'Gym', 'Health Insurance'],
  'Gifts & Donations': ['Gift', 'Charity'],
  Investments: ['Mutual Fund', 'Stocks'],
  'Auto & Transport': ['Fuel', 'Public Transport'],
  Shopping: ['Clothing'],
  'Food & Dining': ['Restaurants', 'Drinks', 'Food Delivery'],
  'Bills & Utilities': ['Mobile Phone', 'Internet', 'Electricity'],
  Subscriptions: ['Amazon', 'Spotify', 'Aha', 'Zee5', 'Disney+']
} as const

export const useCategoryStore = defineStore('category', {
  state: () => ({ categories: Object.keys(Categories) as Array<keyof typeof Categories> }),
  getters: {
    subCategories: () => {
      return (categorySection: keyof typeof Categories) => Categories[categorySection]
    }
  }
})

