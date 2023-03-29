import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export function withMethods(methods: string[], handler: NextApiHandler) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    if (!request.method || !methods.includes(request.method)) {
      return response.status(405).end()
    }
    return handler(request, response)
  }
}
