import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FooterList`.
 */
export type FooterListProps = SliceComponentProps<Content.FooterListSlice>

/**
 * Component for "FooterList" Slices.
 */
const FooterList = ({ slice }: FooterListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_list (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FooterList
