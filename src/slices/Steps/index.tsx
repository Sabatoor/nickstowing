import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
// import Icon from '@/components/typography/Icon'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import React from 'react'
import { FaPhoneVolume, FaHandHoldingDollar } from 'react-icons/fa6'
import { GiTowTruck } from 'react-icons/gi'

/**
 * Props for `Steps`.
 */
export type StepsProps = SliceComponentProps<Content.StepsSlice>

/**
 * Component for "Steps" Slices.
 */
const Steps = ({ slice }: StepsProps): JSX.Element => {
  const icons = {
    phone: FaPhoneVolume,
    payment: FaHandHoldingDollar,
    truck: GiTowTruck,
  }
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
            'mb-4 mt-12 flex flex-col flex-wrap items-center justify-evenly gap-4 divide-y lg:mb-8 lg:mt-24 lg:flex-row lg:gap-8 lg:divide-y-0',
          )}
        >
          {slice.items.map((item, index) => {
            let Icon: React.ElementType | null = null
            if (item.icon && icons[item.icon]) {
              Icon = icons[item.icon] as React.ElementType
            }
            return (
              <div
                key={slice.id + index}
                className="flex max-w-md shrink flex-col items-center pt-6 lg:pt-0"
              >
                {Icon && (
                  <Icon className="mb-4 h-24 w-24 text-primary lg:mb-8 lg:h-32 lg:w-32" />
                )}
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
