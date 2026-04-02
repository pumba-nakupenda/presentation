import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import PresentationApp from '@/components/PresentationApp'

export default async function Home() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('prime_auth')?.value
  if (auth !== 'PRIMEXLOLLY') redirect('/login')

  return <PresentationApp />
}
