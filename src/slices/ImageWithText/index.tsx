import Section from '@/components/layout/Section'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'
import { Suspense } from 'react'

/**
 * Props for `ImageWithText`.
 */
export type ImageWithTextProps = SliceComponentProps<Content.ImageWithTextSlice>

/**
 * Component for "ImageWithText" Slices.
 */
const ImageWithText = ({ slice }: ImageWithTextProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className="py-6 lg:pb-24 lg:pt-12"
    >
      <div className={cn('grid lg:grid-cols-5')}>
        <div
          className={cn(
            'z-10 rounded-lg bg-primary-foreground/80 p-4 shadow-md backdrop-blur lg:col-span-2 lg:p-8',
            {
              'order-1 -mb-4': slice.variation === 'default',
              'order-2 -mt-4': slice.variation === 'leftImage',
            },
          )}
        >
          <PrismicRichText field={slice.primary.text} />
        </div>
        <div
          className={cn('flex items-center lg:col-span-3', {
            'order-1 lg:-mr-16': slice.variation === 'leftImage',
            'order-2 lg:-ml-16': slice.variation === 'default',
          })}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-md shadow"
            imgixParams={{ ar: '16:9', fit: 'crop' }}
          />
        </div>
      </div>
    </Section>
  )
}

export default ImageWithText
