import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import Icon from '@/components/typography/Icon'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import React from 'react'

/**
 * Props for `Steps`.
 */
export type StepsProps = SliceComponentProps<Content.StepsSlice>

/**
 * Component for "Steps" Slices.
 */
const Steps = ({ slice }: StepsProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="2xl"
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => {
              return (
                <Heading
                  as="h2"
                  size="2xl"
                  className="text-foreground lg:text-center"
                >
                  {children}
                </Heading>
              )
            },
          }}
        />
      )}
      {isFilled.richText(slice.primary.sub_heading) && (
        <PrismicRichText
          field={slice.primary.sub_heading}
          components={{
            heading3: ({ children }) => {
              return (
                <Heading
                  as="h3"
                  size="6xl"
                  className="my-4 lg:my-8 lg:text-center"
                >
                  {children}
                </Heading>
              )
            },
          }}
        />
      )}
      {slice.items.length > 0 && (
        <div
          className={cn(
            'flex flex-col flex-wrap justify-evenly lg:flex-row lg:gap-x-8',
          )}
        >
          {slice.items.map((item, index) => {
            return (
              <div
                key={slice.id + index}
                className="flex max-w-md shrink flex-col items-center"
              >
                <Icon
                  name={item.icon || 'star'}
                  className="h-32 w-32 text-primary"
                />
                <PrismicRichText field={item.step_name} />
                <PrismicRichText field={item.step_description} />
              </div>
            )
          })}
        </div>
      )}
    </Section>
  )
}

export default Steps
