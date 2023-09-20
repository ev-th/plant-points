'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { updateMeal } from '@/utils/api';


const MealEditor = ({ ingredientOptions, meal }) => {
  const [name, setName] = useState(meal.name)
  const [ingredients, setIngredients] = useState(meal.ingredients)
  const [date, setDate] = useState(meal.eatenAt)
  const [loading, setLoading] = useState(false)

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

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

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
        <Select onChange={setIngredients} isMulti={true} options={ingredientsSelectOptions}/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default MealEditor