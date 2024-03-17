import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FooterImage`.
 */
export type FooterImageProps = SliceComponentProps<Content.FooterImageSlice>

/**
 * Component for "FooterImage" Slices.
 */
const FooterImage = ({ slice }: FooterImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_image (variation: {slice.variation})
      Slices
    </section>
  )
}

export default FooterImage
