import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Similarity Text API | Home Page',
  description: 'It is a free for use text similarity application',
}

export default function Home() {
  return (
    <div className='relative h-screen flex items-center justify-center overflow-x-hidden'>
      <div className='container pt-32 max-w-7xl w-full mx-auto h-full'>
        <div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
          <LargeHeading
            size='lg'
            className='three-d text-black dark:text-light-gold z-50'
          >
            easy to determine <br /> the similarity of the text
          </LargeHeading>
          <Paragraph className='max-w-xl lg:text-left'>
            with the Text Similarity API, you can easily determine the
            similarity between two pieces of text with a free{' '}
            <Link
              href='/login'
              className='underline underline-offset-2 text-black dark:text-light-gold'
            >
              api key
            </Link>
            .
          </Paragraph>
        </div>
      </div>
    </div>
  )
}
