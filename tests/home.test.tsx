import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => ({userId: 'mock_user_id'}),
    ClerkProvider: ({children}: {children: React.ReactNode}) => <div>{ children }</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'fake_id',
        fullName: 'Fake Name'
      }
    }),
  }
})

describe(Home, () => {
  test('has title', async () => {
    render(await Home())
    expect(screen.getByText('Plant Points Tracker')).toBeTruthy()
  })

})