import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import MealPage from '@/app/(dashboard)/meals/[id]/page'

vi.mock('@/utils/auth', () => {
  return {
    getUserByClerkId: () => 'testClerkId'
  }
})

describe(MealPage, () => {
  test.todo('meal page tests')
})