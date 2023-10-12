import DayOfMealsCard from "@/components/DayOfMealsCard";
import { MealWithIngredients } from "@/utils/types";
import { render, screen } from "@testing-library/react";
import { vi } from 'vitest'

// const mockMealCard = vi.fn()

vi.mock("@/components/MealCard", () => {
  return {
    default: ({meal}: {meal: MealWithIngredients}) => <div>mockMealCard{meal.id}</div>
  }
})

// vi.spyOn("./MealCard")

describe(DayOfMealsCard, () => {
  test('displays the date of the first meal', () => {
    const meals = [
      {
        id: '1',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'1', points: 1}, {id:'2', points: 1}]
      },
      {
        id: '2',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'3', points: 1}, {id:'4', points: 0.25}]
      },
      {
        id: '3',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'1', points: 1}, {id:'4', points: 0.25}]
      },
    ] as MealWithIngredients[]

    render(DayOfMealsCard({meals}))
    expect(screen.getByRole('region')).toHaveTextContent('Eaten on Fri Sep 15 2023')
  })

  test('displays meal cards for each meal with a link to the edit page', () => {
    const meals = [
      {
        id: '1',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'1', points: 1}, {id:'2', points: 1}]
      },
      {
        id: '2',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'3', points: 1}, {id:'4', points: 0.25}]
      },
      {
        id: '3',
        eatenAt: new Date('2023-09-15'),
        ingredients: [{id:'1', points: 1}, {id:'4', points: 0.25}]
      },
    ] as MealWithIngredients[]

    render(DayOfMealsCard({meals}))

    const links = screen.getAllByRole('link')

    expect(links[0].getAttribute('href')).toBe('/meals/1')
    expect(links[0].children[0]).toHaveTextContent('mockMealCard1')
    expect(links[2].getAttribute('href')).toBe('/meals/3')
    expect(links[2].children[0]).toHaveTextContent('mockMealCard3')
  })
})