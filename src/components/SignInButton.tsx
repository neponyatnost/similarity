'use client'

import Button from '@/ui/Button'
import { toast } from '@/ui/Toast'
import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again',
        type: 'error',
      })
    }
  }

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign IN
    </Button>
  )
}

export default SignInButton
