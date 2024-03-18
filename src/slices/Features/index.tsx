import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, asText, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
      className={cn('py-8 lg:pb-24', {
        'bg-secondary': slice.variation === 'secondary',
      })}
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <Heading as="h2" size="4xl" className="py-4 lg:py-8 lg:text-center">
              {children}
            </Heading>
          ),
        }}
      />
      {slice.variation !== 'single' && (
        <div className="flex flex-wrap justify-evenly gap-6 lg:gap-12">
          {slice.items.length > 0 &&
            slice.items.map((item, index) => {
              return (
                <div
                  key={slice.id + index}
                  className={cn('rounded-lg border p-4 shadow-md lg:p-6', {
                    'bg-secondary': slice.variation === 'default',
                    'bg-background': slice.variation === 'secondary',
                  })}
                >
                  <p className="pb-4 text-center text-2xl font-bold text-primary lg:pb-8">
                    {item.feature_heading}
                  </p>
                  <PrismicNextImage
                    field={item.feature_image}
                    imgixParams={{ ar: '1:1', fit: 'crop' }}
                    width={300}
                    className="rounded-lg"
                  />
                  {isFilled.link(item.link) && (
                    <div className="flex justify-center">
                      <Button
                        variant={'default'}
                        asChild
                        className="mt-4 lg:mt-8"
                      >
                        <PrismicNextLink field={item.link}>
                          {item.label || 'Missing Label'}{' '}
                          <span className="sr-only">
                            About {item.feature_heading}
                          </span>
                        </PrismicNextLink>
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      )}
      {slice.variation === 'single' && (
        <div className="flex flex-col items-center justify-center">
          <PrismicNextImage
            field={slice.primary.image}
            imgixParams={{ ar: '16:9', fit: 'crop', q: 80 }}
            className="rounded-lg shadow-md"
            height={600}
          />
          {isFilled.link(slice.primary.link) && (
            <Button variant={'default'} asChild className="mt-4 lg:mt-8">
              <PrismicNextLink field={slice.primary.link}>
                {slice.primary.label || 'Missing Label'}{' '}
                <span className="sr-only">
                  About {asText(slice.primary.heading)}
                </span>
              </PrismicNextLink>
            </Button>
          )}
        </div>
      )}
    </Section>
  )
}

export default Features
