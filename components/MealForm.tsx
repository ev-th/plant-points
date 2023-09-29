'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form'

import { createNewMeal, updateMeal, deleteMeal } from '@/utils/api';

const MealForm = ({ ingredientOptions, meal }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const getIngredientOptions = () => {
    if (!meal) return []

    const optionIds = ingredientOptions.map(ingredient => ingredient.id)
    const selectedIds = meal.ingredients.map(ingredient => ingredient.id)

    const indices = []
    optionIds.forEach((id, i) => selectedIds.includes(id) && indices.push(i))
    return indices.map(i => ingredientsSelectOptions[i])
  }

  const { register, control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: meal?.name ?? "",
      ingredients: getIngredientOptions(),
      date: meal?.date ?? new Date()
    }
  })

  const submitForm = async (formValues) => {
    setLoading(true)

    const mealData = {
      name: formValues.name,
      ingredientIds: formValues.ingredients.map(ingredient => ingredient.value),
      date: formValues.date
    }

    if (meal) {
      await updateMeal({...mealData, id: meal.id})
    } else {
      await createNewMeal(mealData)
    }

    setLoading(false)
    router.push('/diary')
  }

  const handleDelete = async () => {
    setLoading(true)
    
    await deleteMeal(meal.id)
    
    setLoading(false)
    router.replace('/diary')
  }
  return (
    <div>
      {loading && <div>Loading...</div>}
      <form className="p-4" onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
            />
          )}
        />

        <input
          type="text"
          placeholder="Meal Name"
          {...register("name", { required: 'This is required'})}
        />
        <p>{errors.name?.message}</p>

        <Controller
          name="ingredients"
          control={control}
          rules={{ required: 'This is also required' }}
          render={({ field }) => (
            <Select
            {...field}
            isMulti={true}
            options={ingredientsSelectOptions}
            closeMenuOnSelect={false}
            />
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