import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Statistic`.
 */
export type StatisticProps = SliceComponentProps<Content.StatisticSlice>

/**
 * Component for "Statistic" Slices.
 */
const Statistic = ({ slice }: StatisticProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary"
    >
      <div className="mx-auto my-6 flex max-w-screen-sm flex-col items-center justify-center rounded-lg border bg-background px-4 shadow-lg lg:my-12 lg:px-8">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => {
              return (
                <h2 className="mt-12 text-[5.5rem] font-bold text-primary lg:mt-24">
                  {children}
                </h2>
              )
            },
          }}
        />
        <PrismicRichText field={slice.primary.description} />
      </div>
    </Section>
  )
}

export default Statistic
