'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form'
import type { Ingredient } from '@prisma/client';
import { MealWithIngredients } from '@/utils/types';

import { createNewMeal, updateMeal, deleteMeal } from '@/utils/api';
import { update } from '@/utils/actions';

const MealForm = ({ ingredientOptions, meal }: { ingredientOptions: Ingredient[], meal?: MealWithIngredients }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const getIngredientOptions = () => {
    if (!meal) return []

    const optionIds = ingredientOptions.map(ingredient => ingredient.id)
    const selectedIds = meal.ingredients.map(ingredient => ingredient.id)

    const indices: number[] = []
    optionIds.forEach((id, i) => selectedIds.includes(id) && indices.push(i))
    return indices.map(i => ingredientsSelectOptions[i])
  }

  const { register, control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: meal?.name ?? "",
      ingredients: getIngredientOptions(),
      date: meal?.eatenAt ?? new Date()
    }
  })

  const submitForm = async (formValues: {name: string, ingredients: {value: string}[], date: Date}) => {
    setLoading(true)

    const mealData = {
      name: formValues.name,
      ingredientIds: formValues.ingredients.map((ingredient: {value: string}) => ingredient.value),
      date: new Date(formValues.date)
    }

    if (meal) {
      await updateMeal({...mealData, id: meal.id})
    } else {
      await createNewMeal(mealData)
    }

    setLoading(false)
    update(['/diary'])
    router.push('/diary')
  }

  const handleDelete = async () => {
    setLoading(true)

    if (meal) {
      await deleteMeal(meal.id)
    }
    
    setLoading(false)
    router.replace('/diary')
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      <form aria-label={"meal form"} className="p-4" onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <label>
              Date Eaten: 
              <DatePicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
             </label>
          )}
        />
        <label>
          Meal Name:
          <input
            type="text"
            {...register("name", { required: 'Name is required'})}
          />
        </label>
        <p>{errors.name?.message}</p>

        <Controller
          name="ingredients"
          control={control}
          rules={{ required: 'Ingredients are required' }}
          render={({ field }) => (
            <label>
              Ingredients:
              <Select
                {...field}
                isMulti={true}
                options={ingredientsSelectOptions}
                closeMenuOnSelect={false}
              />
            </label>
          )}
        />
        <p>{errors.ingredients?.message}</p>

        <button className="bg-green-300 rounded-lg p-2" type="submit">Save</button>
        {meal && <button className="bg-red-300 rounded-lg p-2" onClick={handleDelete}>Delete</button>}
      </form>
    </div>
  )
}

export default MealForm