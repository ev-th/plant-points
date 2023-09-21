'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { updateMeal, deleteMeal } from '@/utils/api';
import { useRouter } from 'next/navigation';

const MealEditor = ({ ingredientOptions, meal }) => {
  const [name, setName] = useState(meal.name)
  const [ingredients, setIngredients] = useState([])
  const [date, setDate] = useState(meal.eatenAt)
  const [loading, setLoading] = useState(false)

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
    setIngredients(preselectedIngredients)
  }, [])

  return (
    <div>
      {loading && <div>Loading...</div>}
      <form className="p-4" onSubmit={submitForm}>
        <DatePicker selected={date} onChange={setDate}/>
        <input
          type="text"
          placeholder="Meal Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Select
          onChange={setIngredients}
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