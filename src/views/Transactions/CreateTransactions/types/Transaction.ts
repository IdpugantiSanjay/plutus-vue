export type Transaction = {
  amount: number
  category: string
  dateTime: string
  description: string
  id: string
  username: string
  foodOrder?: FoodOrder,
  mutualFund?: MutualFund
}

export type FoodOrder = {
  dishes: Dishes
  restaurant: string
}

export type MutualFund = {
  name: string,
  units: number
}


export type Dishes = { name: string; rating: number }[]