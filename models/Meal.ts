import { prisma } from "@/utils/db"

export default class Meal {
  constructor(
    public userId: string,
    public name: string,
    public ingredientIds: string[],
    public date: Date,
    public id: string | null = null
  ) {}

  static fromRequest(
    userId: string,
    body: Record<string, any>,
    mealId: string | null = null
  ): Meal | null {
    const { name, ingredientIds, date } = body

    if (typeof name !== "string" || !Array.isArray(ingredientIds)) {
      return null
    }
    if (!ingredientIds.every((id) => typeof id === 'string')) {
      return null
    }
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.valueOf())) {
      return null
    }

    return new Meal(userId, name, ingredientIds, date, mealId)
  }

  createOnDatabase() {
    return prisma.meal.create({
      data: {
        userId: this.userId,
        name: this.name,
        eatenAt: this.date,
        ingredients: {
          connect: this.ingredientIds.map((id) => ({ id }))
        }
      }
    })
  }

  updateDatabase () {
    if (!this.id) {
      throw new Error('Meal instance must have an id property to update.')
    }

    return prisma.meal.update({
      where: {
        userId_id: {
          id: this.id,
          userId: this.userId
        }
      },
      data: {
        name: this.name,
        eatenAt: this.date,
        ingredients: {
          set: this.ingredientIds.map((id) => ({ id }))
        }
      }
    })
  }

  deleteFromDatabase() {
    if (!this.id) {
      throw new Error('Meal instance must have an id property to delete.')
    }

    return prisma.meal.delete({
      where: {
        userId_id: {
          id: this.id,
          userId: this.userId
        }
      }
    })
  }
}