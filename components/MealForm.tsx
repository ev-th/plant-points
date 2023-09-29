'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createNewMeal } from '@/utils/api';
import { useRouter } from 'next/navigation';

import { useForm, useController, Controller } from 'react-hook-form'


const MealForm = ({ ingredientOptions }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    date: new Date()
  })
  const { register, control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: "",
      ingredients: [],
      date: new Date()
    }
  })

  // const { field } = useController({ name: "ingredients", control })
  const router = useRouter()

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  console.log(errors)

  const submitForm = async (formValues) => {
    // e.preventDefault()
    setLoading(true)
    console.log("ingredients", formValues.ingredients)

    await createNewMeal({
      name: formValues.name,
      ingredientIds: formValues.ingredients.map(ingredient => ingredient.value),
      date: formValues.date
    })
    setLoading(false)
    console.log("formData111111111", formData)
    console.log("formValues", formValues)

    router.push('/diary')
  }




  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prev => ({...prev, [name]: value}))
  }
  const handleIngredientsChange = (option) => {
    console.log("option", option)
    field.onChange(option)
    // setFormData(prev => ({...prev, ingredients: option}))
  }
  const handleDateChange = (option) => {
    setFormData(prev => ({...prev, date: option}))
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
          {...register("name", { required: 'This is required', minLength: 4 })}
        />
        <Controller
          name="ingredients"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti={true}
              options={ingredientsSelectOptions}
              closeMenuOnSelect={false}
              // value={field.value}
              // onChange={handleIngredientsChange}
            />

          )}
        
        />

        <input type="submit" />
      </form>
    </div>
  )
}

export default MealForm