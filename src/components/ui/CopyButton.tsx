import Button from '@/ui/Button'
import { Copy } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'
import { toast } from './Toast'

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy)
        toast({
          title: 'Copied!',
          message: 'api key copied to clipboard',
          type: 'success',
        })
      }}
      variant='ghost'
      className={className}
    >
      <Copy className='h-5 w-5' />
    </Button>
  )
}

export default CopyButton
