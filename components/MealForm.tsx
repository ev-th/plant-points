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
import LoadingSpinner from "./LoadingSpinner";

const MealForm = ({
  ingredientOptions,
  meal,
}: {
  ingredientOptions: Ingredient[];
  meal?: MealWithIngredients;
}) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
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
    setLoadingSave(true);

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

    update(["/diary"]);
    router.push("/diary");
  };

  const handleDelete = async () => {
    setLoadingDelete(true);

    if (meal) {
      await deleteMeal(meal.id);
    }

    update(["/diary"]);
    router.replace("/diary");
  };

  return (
    <div className="flex flex-col">
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
          {errors.name && (
            <p className="text-xs bg-red-200 rounded py-1 px-3 mt-1 w-fit">
              {errors.name.message}
            </p>
          )}
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
                dateFormat="dd/MM/yyyy"
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
                isMulti={true}
                options={ingredientsSelectOptions}
                closeMenuOnSelect={false}
              />
            )}
          />
          {errors.ingredients && (
            <p className="text-xs bg-red-200 rounded py-1 px-3 mt-1 w-fit">
              {errors.ingredients.message}
            </p>
          )}
        </div>

        <button
          className="bg-[var(--green)] text-slate-50 rounded-lg p-2 w-52 my-2 mx-auto"
          type="submit"
        >
          {loadingSave ? <LoadingSpinner /> : "Save"}
        </button>
      </form>

      {meal && (
        <button
          className="bg-red-600 text-slate-50 rounded-lg p-2 w-52 mb-4 mx-auto"
          onClick={handleDelete}
        >
          {loadingDelete ? <LoadingSpinner /> : "Delete"}
        </button>
      )}
    </div>
  );
};

export default MealForm;
