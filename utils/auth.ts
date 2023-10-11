import { auth } from "@clerk/nextjs"
import { prisma } from "./db"
import { User } from "@prisma/client"

export const getUserByClerkId = async (): Promise<User>=> {
  const { userId } = auth()

	if (!userId) {
		throw new Error('Unauthorized')
	}

	if(userId) {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
					clerkId: userId,
			},
		})
		
		return user
	}
}