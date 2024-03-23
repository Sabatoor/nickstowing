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

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>

/**
 * Component for "Gallery" Slices.
 */
const Gallery = async ({ slice }: GalleryProps): Promise<JSX.Element> => {
  const client = createClient()
  const photos = await client.getByType('gallery_item', {
    page: 1,
    pageSize: 24,
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
      {photos.results.length > 0 && (
        <ul className="grid grid-cols-gallery gap-2">
          {photos.results.map((photo, index) => {
            // console.log('PHOTO MAP -=-- ', photo.data)
            return (
              <li
                key={photo.id}
                className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
              >
                <GalleryImage
                  image={photo.data.image}
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

export default Gallery
