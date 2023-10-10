import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('Could not add new user to the database')
  }
  
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    }
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress
      }
    })
  }
  revalidatePath('/diary')
  redirect('/diary')
}


const NewUser = async () => {
  await createNewUser()
  return (
    <div>...loading</div>
  )
}

export default NewUser