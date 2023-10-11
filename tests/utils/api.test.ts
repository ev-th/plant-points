import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';

import { createNewMeal, updateMeal, deleteMeal } from "@/utils/api";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();


describe(createNewMeal, () => {
  test('sends a POST request to /api/meal with params in the body', async () => {
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']

    fetchMocker.mockResponseOnce(JSON.stringify({status: 200}))

    const expectedRequest = new Request('http://localhost:3000/api/meal', {
      method: 'POST',
      body: JSON.stringify({
        name,
        ingredientIds,
        date
      })
    })

    await createNewMeal({name, ingredientIds, date})

    expect(fetchMocker).toHaveBeenCalledWith(expectedRequest)
  })
  
  test('returns the data when status is 200', async () => {
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({
      status: 200,
      data: {
        name, date, ingredientIds
      }
    }))
  
    const newMeal = await createNewMeal({name, ingredientIds, date})
  
    expect(newMeal).toStrictEqual({
      name, date: date.toISOString(), ingredientIds
    })
  })
  
  test('throws error when status is 400', async () => {
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 400 })
    
    await expect(async() => {
      await createNewMeal({name, ingredientIds, date})
    }).rejects.toThrowError('Bad Request')
  })

  test('throws error when status is 500', async () => {
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 500 })
    
    await expect(async() => {
      await createNewMeal({name, ingredientIds, date})
    }).rejects.toThrowError('Internal Server Error')
  })
})

describe(updateMeal, () => {
  test('sends a PATCH request to /api/meal/:id with remaining params in the body', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']

    fetchMocker.mockResponseOnce(JSON.stringify({status: 200}))

    const expectedRequest = new Request('http://localhost:3000/api/meal/1234', {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        ingredientIds,
        date
      })
    })

    await updateMeal({ id, name, ingredientIds, date })

    expect(fetchMocker).toHaveBeenCalledWith(expectedRequest)
  })
  
  test('returns the data when status is 200', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({
      status: 200,
      data: {
        id, name, date, ingredientIds
      }
    }))
  
    const updatedMeal = await updateMeal({ id, name, ingredientIds, date })
  
    expect(updatedMeal).toStrictEqual({
      id, name, date: date.toISOString(), ingredientIds
    })
  })
  
  test('throws error when status is 400', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 400 })
    
    await expect(async() => {
      await updateMeal({id, name, ingredientIds, date})
    }).rejects.toThrowError('Bad Request')
  })

  test('throws error when status is 401', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 401 })
    
    await expect(async() => {
      await updateMeal({id, name, ingredientIds, date})
    }).rejects.toThrowError('Unauthorized')
  })

  test('throws error when status is 500', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 500 })
    
    await expect(async() => {
      await updateMeal({id, name, ingredientIds, date})
    }).rejects.toThrowError('Internal Server Error')
  })
})
describe(deleteMeal, () => {
  test('sends a DELETE request to /api/meal/:id', async () => {
    const id = '1234'

    fetchMocker.mockResponseOnce(JSON.stringify({status: 200}))

    const expectedRequest = new Request('http://localhost:3000/api/meal/1234', {
      method: 'DELETE'
    })

    await deleteMeal(id)

    expect(fetchMocker).toHaveBeenCalledWith(expectedRequest)
  })
  
  test('returns the data when status is 200', async () => {
    const id = '1234'
    const name = 'mealName'
    const date = new Date('2023-10-11')
    const ingredientIds = ['1', '2', '3']
  
    fetchMocker.mockResponseOnce(JSON.stringify({
      status: 200,
      data: {
        id,
        name,
        date,
        ingredientIds
      }
    }))
  
    const deletedMeal = await deleteMeal(id)
  
    expect(deletedMeal).toStrictEqual({
      id, name, date: date.toISOString(), ingredientIds
    })
  })
  
  test('throws error when status is 400', async () => {
    const id = '1234'
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 400 })
    
    await expect(async() => {
      await deleteMeal(id)
    }).rejects.toThrowError('Bad Request')
  })

  test('throws error when status is 401', async () => {
    const id = '1234'
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 401 })
    
    await expect(async() => {
      await deleteMeal(id)
    }).rejects.toThrowError('Unauthorized')
  })

  test('throws error when status is 500', async () => {
    const id = '1234'
  
    fetchMocker.mockResponseOnce(JSON.stringify({}), { status: 500 })
    
    await expect(async() => {
      await deleteMeal(id)
    }).rejects.toThrowError('Internal Server Error')
  })
})

