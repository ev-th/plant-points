/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'
import resetDb from './resetDb'
import { beforeEach } from 'vitest'

beforeEach(async () => {
  await resetDb()
})