'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createNewMeal } from '@/utils/api';
import { useRouter } from 'next/navigation';


const MealForm = ({ ingredientOptions }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    date: new Date()
  })
  
  const router = useRouter()

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, ingredients, date } = formData

    await createNewMeal({
      name,
      ingredientIds: ingredients.map(ingredient => ingredient.value),
      date
    })
    setLoading(false)

    router.push('/diary')
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      <form className="p-4" onSubmit={submitForm}>
        <DatePicker
          selected={formData.date}
          onChange={value => setFormData(prev => ({...prev, date: value}))}
        />

        <input
          name="meal"
          type="text"
          placeholder="Meal Name"
          value={formData.name}
          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
        />

        <Select
          onChange={value => setFormData(prev => ({...prev, ingredients: value}))}
          isMulti={true}
          options={ingredientsSelectOptions}
          closeMenuOnSelect={false}
        />
        
        <input type="submit" />
      </form>
    </div>
  )
}

export default MealForm