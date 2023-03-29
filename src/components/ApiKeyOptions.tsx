'use client'

import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'
import Button from '@/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/DropdownMenu'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { toast } from './ui/Toast'

interface ApiKeyOptionsProps {
  apiKeyId: string
  apiKeyKey: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
  const [isRevoking, setIsRevoking] = useState<boolean>(false)
  const router = useRouter()

  const createNewApiKey = async () => {
    setIsCreatingNew(true)
    try {
      await revokeApiKey({ keyId: apiKeyId })
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: 'error while creating api key',
        message: 'please try again',
        type: 'error',
      })
    } finally {
      setIsCreatingNew(false)
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true)

    try {
      await revokeApiKey({ keyId: apiKeyId })
      router.refresh()
    } catch (error) {
      toast({
        title: 'error while revoking api key',
        message: 'please try again',
        type: 'error',
      })
    } finally {
      setIsRevoking(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew
              ? 'creating key'
              : isRevoking
              ? 'revoking key'
              : 'options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='animate-spin h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey)
            toast({
              title: 'copied',
              message: 'api key copied to clipboard',
              type: 'success',
            })
          }}
        >
          copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions
