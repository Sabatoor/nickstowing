import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText } from '@prismicio/client'
import { getUrlSegments } from '@/lib/utils'
import PageBreadcrumbs from '@/components/layout/PageBreadcrumbs'
import Heading from '@/components/typography/Heading'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const client = createClient()
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
  const pageNumber = { page: searchParams.page }
  const urlSegments = getUrlSegments(page.url)

  return (
    <>
      <Heading as="h1" size="6xl" className="mt-8 lg:mt-12 lg:text-center">
        {asText(page.data.title)}
      </Heading>
      <PageBreadcrumbs segments={urlSegments} title={page.data.title} />
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={pageNumber}
      />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('page', params.uid).catch(() => notFound())

  return {
    title: asText(page.data.title) || page.data.meta_title,
    description: page.data.meta_description,
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('page')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
