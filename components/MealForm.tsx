'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createNewMeal } from '@/utils/api';

const MealForm = ({ ingredientOptions }) => {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [date, setDate] = useState(new Date())

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const submitForm = (e) => {
    createNewMeal({
      name,
      ingredientIds: ingredients.map(ingredient => ingredient.value),
      date
    })
  }

  return (
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
  )
}

export default MealForm