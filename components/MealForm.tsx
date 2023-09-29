'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { string, z } from 'zod'

import { createNewMeal } from '@/utils/api';

// const schema = z.object

const MealForm = ({ ingredientOptions }) => {
  const [loading, setLoading] = useState(false)

  const { register, control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: "",
      ingredients: [],
      date: new Date()
    }
  })

  const router = useRouter()

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const submitForm = async (formValues) => {
    setLoading(true)

    await createNewMeal({
      name: formValues.name,
      ingredientIds: formValues.ingredients.map(ingredient => ingredient.value),
      date: formValues.date
    })

    setLoading(false)
    router.push('/diary')
  }

  console.log("errors", errors)

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

        <input type="submit" />
      </form>
    </div>
  )
}

export default MealForm