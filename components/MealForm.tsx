"use client";

import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import type { Ingredient } from "@prisma/client";
import { MealWithIngredients } from "@/utils/types";

import { createNewMeal, updateMeal, deleteMeal } from "@/utils/api";
import { update } from "@/utils/actions";

const MealForm = ({
  ingredientOptions,
  meal,
}: {
  ingredientOptions: Ingredient[];
  meal?: MealWithIngredients;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name };
  });

  const getIngredientOptions = () => {
    if (!meal) return [];

    const optionIds = ingredientOptions.map((ingredient) => ingredient.id);
    const selectedIds = meal.ingredients.map((ingredient) => ingredient.id);

    const indices: number[] = [];
    optionIds.forEach((id, i) => selectedIds.includes(id) && indices.push(i));
    return indices.map((i) => ingredientsSelectOptions[i]);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: meal?.name ?? "",
      ingredients: getIngredientOptions(),
      date: meal?.eatenAt ?? new Date(),
    },
  });

  const submitForm = async (formValues: {
    name: string;
    ingredients: { value: string }[];
    date: Date;
  }) => {
    setLoading(true);

    const mealData = {
      name: formValues.name,
      ingredientIds: formValues.ingredients.map(
        (ingredient: { value: string }) => ingredient.value,
      ),
      date: new Date(formValues.date),
    };

    if (meal) {
      await updateMeal({ ...mealData, id: meal.id });
    } else {
      await createNewMeal(mealData);
    }

    setLoading(false);
    update(["/diary"]);
    router.push("/diary");
  };

  const handleDelete = async () => {
    setLoading(true);

    if (meal) {
      await deleteMeal(meal.id);
    }

    setLoading(false);
    router.replace("/diary");
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <form
        aria-label={"meal form"}
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-6"
      >
        <div>
          <label htmlFor="name" className="block">
            Meal Name:
          </label>
          <input
            className="rounded border-2 w-full h-9 border-gray-200 px-2"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="date" className="block">
            Date Eaten:
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="rounded border-2 h-9 border-gray-200 px-2 w-32"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <Controller
            name="ingredients"
            control={control}
            rules={{ required: "Ingredients are required" }}
            render={({ field }) => (
              <Select
                {...field}
                // unstyled
                isMulti={true}
                options={ingredientsSelectOptions}
                closeMenuOnSelect={false}
              />
            )}
          />
          <p>{errors.ingredients?.message}</p>
        </div>

        <div className="flex gap-6 mx-auto">
          <button
            className="bg-[var(--green)] text-[var(--ivory)] rounded-lg p-2 w-28 my-2"
            type="submit"
          >
            Save
          </button>
          {meal && (
            <button
              className="bg-red-600 text-[var(--ivory)] rounded-lg p-2 w-28 my-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MealForm;
