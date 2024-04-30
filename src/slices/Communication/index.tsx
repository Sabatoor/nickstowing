import Section from '@/components/layout/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { asText, Content, isFilled } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Communication`.
 */
export type CommunicationProps = SliceComponentProps<Content.CommunicationSlice>

/**
 * Component for "Communication" Slices.
 */
const Communication = ({ slice }: CommunicationProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-primary"
    >
      {slice.items.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-8">
          {slice.items.map((item, index) => {
            return (
              <Card
                key={asText(item.heading) + index || index}
                className="min-w-[250px]"
              >
                {isFilled.richText(item.heading) && (
                  <CardHeader className="text-center">
                    <CardTitle>{asText(item.heading)}</CardTitle>
                  </CardHeader>
                )}
                {isFilled.richText(item.text) && (
                  <CardContent className="text-center">
                    <PrismicRichText field={item.text} />{' '}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </ul>
      )}
    </Section>
  )
}

export default Communication
