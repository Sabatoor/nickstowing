import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
import { isFilled } from '@prismicio/client'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  FooterItemSliceMultiColumnPrimary,
  FooterLayoutDocument,
} from '../../../prismicio-types'
import { cn } from '@/lib/utils'

/**
 * Props for `FooterItem`.
 */
export type FooterItemProps = SliceComponentProps<Content.FooterItemSlice>

/**
 * Component for "FooterItem" Slices.
 */
const FooterItem = ({ slice }: FooterItemProps): JSX.Element => {
  if (slice.variation === 'default') {
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="5xl"
                className="text-primary-foreground lg:text-center"
              >
                {children}
              </Heading>
            ),
          }}
        />
      </Section>
    )
  } else {
    const footerItemPrimary = slice.primary as FooterItemSliceMultiColumnPrimary
    const multiColumn =
      footerItemPrimary.multi_column_layout as unknown as FooterLayoutDocument
    const cols =
      (multiColumn.data?.slices.length > 0 ? 1 : 0) +
      (multiColumn.data?.slices1.length > 0 ? 1 : 0) +
      (multiColumn.data?.slices2.length > 0 ? 1 : 0)
    return (
      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <Heading
                  as="h2"
                  size="5xl"
                  className="text-primary-foreground lg:text-center"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        {cols > 0 && (
          <div
            className={cn('my-4 grid gap-4 lg:my-8 lg:gap-8', {
              'lg:grid-cols-2': cols === 2,
              'lg:grid-cols-3': cols === 3,
            })}
          >
            {multiColumn.data.slices.length > 0 && (
              <div>
                <SliceZone
                  slices={multiColumn.data.slices}
                  components={components}
                />
              </div>
            )}
            {multiColumn.data.slices1.length > 0 && (
              <div>
                <SliceZone
                  slices={multiColumn.data.slices1}
                  components={components}
                />
              </div>
            )}
            {multiColumn.data.slices2.length > 0 && (
              <div>
                <SliceZone
                  slices={multiColumn.data.slices2}
                  components={components}
                />
              </div>
            )}
          </div>
        )}
      </Section>
    )
  }
}

export default FooterItem
