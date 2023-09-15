const createURL = (path) => {
  return window.location.origin + path
}

export const createNewMeal = async () => {
  const res = await fetch(
    new Request(createURL('/api/meal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}