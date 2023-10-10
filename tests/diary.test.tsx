import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import DiaryPage, { getMeals, getDateFromSixDaysAgo } from '../app/(dashboard)/diary/page'

// vi.mock('@/utils/auth', () => {
//   return "fake_clerk_id"
// })

describe(getMeals, () => {

})

describe(getDateFromSixDaysAgo, () => {
  test('takes a date and returns a date from six days ago at 12am', () => {
    const date = new Date('2023-10-02T11:22:45')
    const expected = new Date('2023-09-26T00:00:00')

    const result = getDateFromSixDaysAgo(date)

    expect(result).toStrictEqual(expected)
  })
})

// describe(DiaryPage, () => {

// })