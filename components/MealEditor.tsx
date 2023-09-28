'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { updateMeal, deleteMeal } from '@/utils/api';
import { useRouter } from 'next/navigation';

const MealEditor = ({ ingredientOptions, meal }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: meal.name,
    ingredients: [],
    date: meal.eatenAt
  })

  const router = useRouter()

  const getPreselectedIngredients = () => {
    const optionIds = ingredientOptions.map(ingredient => ingredient.id)
    const preselectedIds = meal.ingredients.map(ingredient => ingredient.id)
    const indices = []
    optionIds.forEach((id, index) => {
      preselectedIds.includes(id) && indices.push(index)
    })
    return indices.map(i => ingredientsSelectOptions[i])
  }
  
  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })
  
  const preselectedIngredients = getPreselectedIngredients()

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, ingredients, date } = formData

    await updateMeal({
      id: meal.id,
      name,
      ingredientIds: ingredients.map(ingredient => ingredient.value),
      date
    })
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    
    await deleteMeal(meal.id)
    
    setLoading(false)
    router.replace('/diary')

  }

  useEffect(() => {
    setFormData(prev => ({...prev, ingredients: preselectedIngredients}))
  }, [])

  return (
    <div>
      {loading && <div>Loading...</div>}
      <form className="p-4" onSubmit={submitForm}>
        <DatePicker
          selected={formData.date}
          onChange={value => setFormData(prev => ({...prev, date: value}))}
        />

        <input
          type="text"
          placeholder="Meal Name"
          value={formData.name}
          onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
        />

        <Select
          onChange={value => setFormData(prev => ({...prev, ingredients: value}))}
          closeMenuOnSelect={false}
          isMulti={true}
          options={ingredientsSelectOptions}
          defaultValue={preselectedIngredients}
        />

        <input type="submit" />
      </form>
      <button className="bg-red-300 rounded-lg p-2" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default MealEditor