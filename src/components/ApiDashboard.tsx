import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { formatDistance } from 'date-fns'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import ApiKeyOptions from './ApiKeyOptions'
import Table from './Table'
import { Input } from './ui/Input'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions)

  if (!user) notFound()

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id,
    },
  })

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled)

  if (!activeApiKey) notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  })

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }))

  return (
    <div className='container max-w-7xl mx-auto mt-12'>
      <div className='flex flex-col items-center gap-6'>
        <LargeHeading>hello, {user.user.name}</LargeHeading>
        <div className='flex flex-col md:flex-row gap-4 justify-center items-center'>
          <Paragraph>your api key:</Paragraph>
          <Input className='w-fit truncate' readOnly value={activeApiKey.key} />
          <ApiKeyOptions
            apiKeyId={activeApiKey.id}
            apiKeyKey={activeApiKey.key}
          />
        </div>
        <Paragraph className='text-center md:text-left mt-4 -mb-4'>
          your api history:
        </Paragraph>
        <Table userRequests={serializableRequests} />
      </div>
    </div>
  )
}

export default ApiDashboard
