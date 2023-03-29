'use client'

import Code from '@/components/Code'
import { nodejs, python } from '@/helpers/documentation-code'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs'
import { FC } from 'react'
import SimpleBar from 'simplebar-react'

const DocumentationTabs: FC = () => {
  return (
    <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
      <TabsList>
        <TabsTrigger value='nodejs'>Node JS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>
      <TabsContent value='nodejs'>
        <SimpleBar>
          <Code language='javascript' animated code={nodejs} show />
        </SimpleBar>
      </TabsContent>
      <TabsContent value='python'>
        <SimpleBar>
          <Code language='python' animated code={python} show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  )
}

export default DocumentationTabs
