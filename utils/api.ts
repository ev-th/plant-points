const createURL = (path: String) => {
  return window.location.origin + path
}

export const createNewMeal = async ({name, ingredientIds, date}) => {
  const res = await fetch(
    new Request(createURL('/api/meal'), {
      method: 'POST',
      body: JSON.stringify({
        name,
        ingredientIds,
        date
      })
    })
  )
  
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
  
export const updateMeal = async (id, name) => {
  const res = await fetch(
    new Request(createURL(`/api/meal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({
        name
      })
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}