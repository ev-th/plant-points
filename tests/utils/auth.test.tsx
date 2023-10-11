import { vi } from 'vitest'
import { getUserByClerkId } from '@/utils/auth'
import prisma from '../helpers/prisma'

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn()
  }
})

vi.mock('@clerk/nextjs', () => {
  return {
    auth: mocks.auth,
    ClerkProvider: ({children}: {children: React.ReactNode}) => <div>{ children }</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'testClerkId',
        fullName: 'Fake Name'
      }
    }),
  }
})

describe(getUserByClerkId, () => {
  test('returns the Promise resolving to user from the database if it exists', async () => {
    mocks.auth.mockReturnValue({userId: 'testClerkId'})

    const newUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        clerkId: 'testClerkId'
      }
    })

    const user = await getUserByClerkId()

    expect(user).toStrictEqual(newUser)
  })

  test('throw error if user does not exist in database', async () => {
    mocks.auth.mockReturnValue({userId: 'nonExistentId'})

    const newUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        clerkId: 'testClerkId'
      }
    })

    expect( async () =>  await getUserByClerkId()).rejects.toThrow()
  })

  test('throws error if user is not logged in', async () => {
    mocks.auth.mockReturnValue({ userId: null })

    const newUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        clerkId: 'testClerkId'
      }
    })

    expect( async () =>  await getUserByClerkId()).rejects.toThrowError('Unauthorized')
  })
})