import ContentList from '@/components/ContentList'
import Section from '@/components/layout/Section'
import Pagination from '@/components/Pagination'
import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
// import Pagination from '@/components/Pagination'

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>
type contextProps = {
  page?: number
}

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
  context,
}: ContentIndexProps): Promise<JSX.Element> => {
  const { page } = context as contextProps
  const client = createClient()
  let content
  if (slice.primary.content_type === 'service') {
    content = await client.getByType('service', {
      orderings: {
        field: 'my.service.title',
        direction: 'asc',
      },
      page: page || 1,
      pageSize: slice.primary.number_to_display || 5,
    })
  } else if (slice.primary.content_type === 'portfolio')
    content = await client.getByType('portfolio', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page || 1,
      pageSize: slice.primary.number_to_display || 5,
    })
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      {content && (
        <>
          <ContentList
            content={content.results}
            ctaText={
              isFilled.keyText(slice.primary.content_cta_text)
                ? slice.primary.content_cta_text
                : 'Read More'
            }
            fallbackItemImage={slice.primary.fallback_item_image}
          />
          {content?.total_pages > 1 && (
            <Pagination
              hasNextPage={content?.next_page !== null}
              hasPrevPage={content?.prev_page !== null}
              totalPages={content?.total_pages}
            />
          )}
        </>
      )}
    </Section>
  )
}

export default ContentIndex
