import GalleryImage from '@/components/GalleryImage'
import Section from '@/components/layout/Section'
import addBlurredDataUrls from '@/lib/getBase64'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { createClient } from '@/prismicio'
import * as prismic from '@prismicio/client'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { GalleryItemDocument } from '../../../prismicio-types'
import { Suspense } from 'react'
import GalleryList from './GalleryList'
import { LoaderCircle } from 'lucide-react'

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
  if (slice.variation === 'paginated') {
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
        <Suspense
          fallback={
            <div className="grid min-h-[calc(100vh-140px)] place-content-center">
              <LoaderCircle
                className="animate-spin text-primary"
                height={120}
                width={120}
              />
            </div>
          }
        >
          <GalleryList page={page} type="paginated" />
        </Suspense>
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
                    index={index}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </Section>
    )
  } else {
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
        <Suspense
          fallback={
            <div className="grid min-h-[calc(100vh-140px)] place-content-center">
              <LoaderCircle
                className="animate-spin text-primary"
                height={120}
                width={120}
              />
            </div>
          }
        >
          <GalleryList page={page} tag={slice.primary.tag} type="default" />
        </Suspense>
      </Section>
    )
  }
}

export default Gallery
