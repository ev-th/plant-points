import { vi } from 'vitest'
import { getMeals } from '@/utils/getMeals'
import prisma from '../helpers/prisma'

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn()
  }
})

vi.mock('@clerk/nextjs', () => {
  return {
    auth: mocks.auth,
    ClerkProvider: ({children}: {children: React.ReactNode}) => <div>{ children }</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'fake_id',
        fullName: 'Fake Name'
      }
    }),
  }
})

describe(getMeals, () => {
  test('gets all the meals of the user from the database', async () => {
    mocks.auth.mockReturnValue({userId: 'thisUserClerkId'})

    const user1 = await prisma.user.create({
      data: {
        email: 'thisUser@example.com',
        clerkId: 'thisUserClerkId'
      }
    })

    const user2 = await prisma.user.create({
      data: {
        email: 'otherUser@example.com',
        clerkId: 'otherUserClerkId'
      }
    })
    
    const ingredient1 = await prisma.ingredient.create({
      data: {name: 'testIngredient1', points: 1}
    })
    const ingredient2 = await prisma.ingredient.create({
      data: {name: 'testIngredient2', points: 2}
    })
    const ingredient3 = await prisma.ingredient.create({
      data: {name: 'testIngredient3', points: 3}
    })

    const meal1 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: 'testMeal1',
        ingredients: {connect: [ingredient1, ingredient2]},
        eatenAt: new Date('2023-10-09')
      },
      include: {
        ingredients: true
      }
    })
    const meal2 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: 'testMeal2',
        ingredients: {connect: [ingredient3]},
        eatenAt: new Date('2023-10-04')

      },
      include: {
        ingredients: true
      }
    })
    // Meal from before dateFrom should not show up in the results
    const meal3 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: 'testMeal1',
        ingredients: {connect: [ingredient1, ingredient2]},
        eatenAt: new Date('2023-10-03')
      },
      include: {
        ingredients: true
      }
    })
    // Meal from after dateTo should not show up in the results
    const meal4 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: 'testMeal2',
        ingredients: {connect: [ingredient3]},
        eatenAt: new Date('2023-10-10')

      }
    })
    // Meal associated with a different user should not show up in results
    const meal5 = await prisma.meal.create({
      data: {
        userId: user2.id,
        name: 'testMeal2',
        ingredients: {connect: [ingredient2, ingredient3]},
        eatenAt: new Date('2023-10-09')
      }
    })

    const meals = await getMeals(new Date('2023-10-04'), new Date('2023-10-09'))

    meals.sort((a, b) => +b.eatenAt - +a.eatenAt)

    expect(meals).toStrictEqual([meal1, meal2])
  })
})