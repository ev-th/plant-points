import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MealPage from '@/app/(dashboard)/meals/[id]/page'

const mocks = vi.hoisted(() => {
  return {
    getMealWithIngredients: vi.fn(),
    getIngredients: vi.fn()
  }
})

vi.mock('@/components/MealForm', () => {
  return {
    default: ({meal, ingredientOptions}: {meal: string, ingredientOptions: string}) => <div>meal: {meal}, ingredientOptions: {ingredientOptions}</div>
  }
})
vi.mock("@/utils/dbQueries", () => {
  return {
    getMealWithIngredients: mocks.getMealWithIngredients,
    getIngredients: mocks.getIngredients,
  }
})

describe(MealPage, () => {
  test('passes down a meal and ingredient options to the MealPage component', async () => {
    mocks.getMealWithIngredients.mockReturnValueOnce('testMeal')
    mocks.getIngredients.mockReturnValueOnce('testIngredients')
    render( await MealPage({params: {id: 'testId'}}))
    expect(screen.getByText('meal: testMeal, ingredientOptions: testIngredients')).toBeInTheDocument()
  })
  
  test('calls getMealWithIngredients with params.id', async () => {
    render( await MealPage({params: {id: 'testId'}}))
    expect(mocks.getMealWithIngredients).toHaveBeenCalledWith('testId')
  })
  
  test('calls getIngredients', async () => {
    render( await MealPage({params: {id: 'testId'}}))
    expect(mocks.getIngredients).toHaveBeenCalledOnce()
  })
})