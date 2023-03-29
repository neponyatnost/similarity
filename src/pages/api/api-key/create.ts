import { withMethods } from '@/lib/api-middlewares/with-methods'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { CreateApiData } from '@/types/api'
import { nanoid } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<CreateApiData>
) => {
  try {
    const user = await getServerSession(request, response, authOptions).then(
      (response) => response?.user
    )

    if (!user) {
      return response.status(401).json({
        error: 'You need to be authorized to perform this action!',
        createdApiKey: null,
      })
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    })

    if (existingApiKey) {
      return response.status(400).json({
        error: 'You already have a valid api key!',
        createdApiKey: null,
      })
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    })

    return response.status(200).json({
      error: '',
      createdApiKey,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response.status(400).json({
        error: error.issues,
        createdApiKey: null,
      })
    }
    return response.status(500).json({
      error: 'Internal server error',
      createdApiKey: null,
    })
  }
}

export default withMethods(['GET'], handler)
