'use client'

import { useState } from 'react'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { createNewMeal } from '@/utils/api';
import { useRouter } from 'next/navigation';


const MealForm = ({ ingredientOptions }) => {
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

  const ingredientsSelectOptions = ingredientOptions.map((ingredient) => {
    return { value: ingredient.id, label: ingredient.name}
  })

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)

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
        <DatePicker selected={date} onChange={setDate}/>
        <input
          name="meal"
          type="text"
          placeholder="Meal Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Select
          onChange={setIngredients}
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