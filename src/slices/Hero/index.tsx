import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary lg:h-[calc(100vh-108px)] lg:min-h-[750px]"
    >
      <div className="mx-auto my-8 flex max-w-screen-2xl flex-col items-center justify-center">
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="5xl" className="text-primary-foreground">
                  {children}
                </Heading>
              ),
              heading2: ({ children }) => (
                <Heading as="h2" size="5xl" className="text-primary-foreground">
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            className="my-4 lg:my-8"
            quality={80}
            height={400}
            priority
          />
        )}
        {isFilled.richText(slice.primary.sub_heading) && (
          <PrismicRichText
            field={slice.primary.sub_heading}
            components={{
              heading2: ({ children }) => (
                <Heading as="h2" size="4xl" className="text-primary-foreground">
                  {children}
                </Heading>
              ),
              heading3: ({ children }) => (
                <Heading as="h3" size="4xl" className="text-primary-foreground">
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        {isFilled.richText(slice.primary.tag_line) && (
          <PrismicRichText
            field={slice.primary.tag_line}
            components={{
              paragraph: ({ children }) => (
                <p className="my-4 text-2xl font-bold text-primary-foreground lg:my-8">
                  {children}
                </p>
              ),
            }}
          />
        )}
        {isFilled.link(slice.primary.link) &&
          isFilled.keyText(slice.primary.label) && (
            <Button asChild variant={'outline'}>
              <PrismicNextLink field={slice.primary.link}>
                {slice.primary.label}
              </PrismicNextLink>
            </Button>
          )}
      </div>
    </Section>
  )
}

export default Hero
