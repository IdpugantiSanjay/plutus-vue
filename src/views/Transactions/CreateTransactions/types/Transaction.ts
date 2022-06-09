export type Transaction = {
  amount: number
  category: string
  dateTime: string
  description: string
  id: string
  username: string
  foodOrder?: FoodOrder
}

export type FoodOrder = {
  dishes: Dishes
  restaurant: string
}


export type Dishes = { name: string; rating: number }[]