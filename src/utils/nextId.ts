function* generateId() {
  let id = 1
  while (true) {
    yield id
    id++
  }
}

export const idGen = generateId()


