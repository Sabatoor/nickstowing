import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Section from '@/components/layout/Section'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import Heading from '@/components/typography/Heading'
import addBlurredDataUrls from '@/lib/getBase64'
import GalleryImage from '@/components/GalleryImage'
import { GalleryItemDocument } from '../../../prismicio-types'
import Pagination from '@/components/Pagination'

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

type contextProps = {
  page?: number
}

/**
 * Component for "Gallery" Slices.
 */
const Gallery = async ({
  slice,
  context,
}: GalleryProps): Promise<JSX.Element> => {
  const { page } = context as contextProps
  const client = createClient()
  if (slice.variation === 'paginated') {
    const gallery_items = await client.getByType('gallery_item', {
      page: page || 1,
      pageSize: 24,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
    const PrismicImages = gallery_items.results.map(
      item => item.data.image,
    ) as prismic.FilledImageFieldImage[]
    const photosWithBlur = await addBlurredDataUrls(PrismicImages)

    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
      >
        {prismic.isFilled.richText(slice.primary.heading) && (
          <div className="mx-auto my-4 max-w-screen-lg lg:my-8">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading as="h2" size="4xl" className="lg:text-center">
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
        )}
        {prismic.isFilled.richText(slice.primary.description) && (
          <div className="mx-auto my-4 max-w-screen-xl lg:my-8">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        {photosWithBlur.length > 0 && (
          <ul className="grid grid-cols-gallery gap-2">
            {photosWithBlur.map((photo, index) => {
              return (
                <li
                  key={photo.id}
                  className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
                >
                  <GalleryImage
                    image={photo}
                    blurDataURL={photosWithBlur[index].blurredDataUrl || ''}
                  />
                </li>
              )
            })}
          </ul>
        )}
        <Pagination
          hasNextPage={gallery_items?.next_page !== null}
          hasPrevPage={gallery_items?.prev_page !== null}
          totalPages={gallery_items?.total_pages}
        />
      </Section>
    )
  } else if (slice.variation === 'manual') {
    const gallery_items = slice.items.map(
      item => item.image,
    ) as unknown as GalleryItemDocument[]

    const PrismicImages = [] as prismic.FilledImageFieldImage[]

    gallery_items.forEach(item => {
      if (item.data !== undefined && prismic.isFilled.image(item.data.image)) {
        PrismicImages.push(item.data.image)
      }
    })

    const photosWithBlur = await addBlurredDataUrls(PrismicImages)
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
      >
        {prismic.isFilled.richText(slice.primary.heading) && (
          <div className="mx-auto my-4 max-w-screen-lg lg:my-8">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading as="h2" size="4xl" className="lg:text-center">
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
        )}
        {prismic.isFilled.richText(slice.primary.description) && (
          <div className="mx-auto my-4 max-w-screen-xl lg:my-8">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        {photosWithBlur.length > 0 && (
          <ul className="grid grid-cols-gallery gap-2">
            {photosWithBlur.map((photo, index) => {
              return (
                <li
                  key={photo.id}
                  className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
                >
                  <GalleryImage
                    image={photo}
                    blurDataURL={photosWithBlur[index].blurredDataUrl || ''}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </Section>
    )
  } else {
    const photos = await client.getByType('gallery_item', {
      page: 1,
      pageSize: 24,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      filters: [
        prismic.filter.any('document.tags', [slice.primary.tag || 'Car']),
      ],
    })
    const PrismicImages = photos.results.map(
      photo => photo.data.image,
    ) as prismic.FilledImageFieldImage[]
    const photosWithBlur = await addBlurredDataUrls(PrismicImages)

    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        width="xl"
      >
        {prismic.isFilled.richText(slice.primary.heading) && (
          <div className="mx-auto my-4 max-w-screen-lg lg:my-8">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading as="h2" size="4xl" className="lg:text-center">
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
        )}
        {prismic.isFilled.richText(slice.primary.description) && (
          <div className="mx-auto my-4 max-w-screen-xl lg:my-8">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        {photosWithBlur.length > 0 && (
          <ul className="grid grid-cols-gallery gap-2">
            {photosWithBlur.map((photo, index) => {
              return (
                <li
                  key={photo.id}
                  className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
                >
                  <GalleryImage
                    image={photo}
                    blurDataURL={photosWithBlur[index].blurredDataUrl || ''}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </Section>
    )
  }
}

export default Gallery
