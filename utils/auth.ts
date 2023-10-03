import { auth } from "@clerk/nextjs"
import { prisma } from "./db"
import { User } from "@prisma/client"

export const getUserByClerkId = async (): Promise<User | undefined>=> {
  const { userId } = auth()

	if(userId) {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
					clerkId: userId,
			},
		})

		return user
	}
}