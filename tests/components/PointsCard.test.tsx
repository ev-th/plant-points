import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MealWithIngredients } from '@/utils/types'
import PointsCard from '@/components/PointsCard'

vi.mock('@/utils/points', () => {
  return {
    getUniqueIngredients: () => [
      { id: '1', name: 'mockIngredient1', points: 1 },
      { id: '2', name: 'mockIngredient2', points: 2 },
      { id: '3', name: 'mockIngredient3', points: 3 },
      { id: '4', name: 'mockIngredient4', points: 4 },
    ],
    calculatePoints: () => 32
  }
})

describe(PointsCard, () => {
  test('displays the total number of plant points for the week', () => {    
    const meals = [
      {ingredients: [{id:'1', points: 1}, {id:'2', points: 1}]},
      {ingredients: [{id:'3', points: 1}, {id:'4', points: 0.25}]},
      {ingredients: [{id:'1', points: 1}, {id:'4', points: 0.25}]},
    ] as MealWithIngredients[]

    render(PointsCard({meals}))
    expect(screen.getByRole('region')).toHaveTextContent('Your plant points over the last 7 days: 32')
  })
  
  test('displays the ingredients and their points', () => {    
    const meals = [
      {ingredients: [{id:'1', points: 1}, {id:'2', points: 1}]},
      {ingredients: [{id:'3', points: 1}, {id:'4', points: 0.25}]},
      {ingredients: [{id:'1', points: 1}, {id:'4', points: 0.25}]},
    ] as MealWithIngredients[]
  
    render(PointsCard({meals}))
    expect(screen.getByRole('list').children.length).toBe(4)
    expect(screen.getByRole('list').children[0]).toHaveTextContent(
      '- mockIngredient1, points: 1'
    )
    expect(screen.getByRole('list').children[2]).toHaveTextContent(
      '- mockIngredient3, points: 3'
    )
  })
})