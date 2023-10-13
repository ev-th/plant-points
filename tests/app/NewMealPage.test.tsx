import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import NewMealPage from '@/app/(dashboard)/meals/new/page'

const mocks = vi.hoisted(() => {
  return {
    getIngredients: vi.fn()
  }
})

vi.mock('@/components/MealForm', () => {
  return {
    default: ({ ingredientOptions} : {ingredientOptions: string}) => <div>ingredientOptions: {ingredientOptions}</div>
  }
})
vi.mock("@/utils/dbQueries", () => {
  return {
    getIngredients: mocks.getIngredients,
  }
})

describe(NewMealPage, () => {
  test('passes down a meal and ingredient options to the MealPage component', async () => {
    mocks.getIngredients.mockReturnValueOnce('testIngredients')
    render( await NewMealPage())
    expect(screen.getByText('ingredientOptions: testIngredients')).toBeInTheDocument()
  })
  
  test('calls getIngredients', async () => {
    render( await NewMealPage())
    expect(mocks.getIngredients).toHaveBeenCalledOnce()
  })
})