import { getUserByClerkId } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import Meal from "@/models/Meal";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ status: 401 });
  }

  try {
    const meal = Meal.fromRequest(user.id, await request.json(), params.id);

    if (!meal) {
      return NextResponse.json({ status: 400 });
    }

    const updatedMeal = await meal.updateDatabase();

    return NextResponse.json({ data: updatedMeal });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  try {
    const deletedRecipe = await prisma.meal.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
    });

    return NextResponse.json({ data: deletedRecipe });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
