import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
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
      className="flex justify-center"
    >
      <PrismicNextImage
        field={slice.primary.image}
        imgixParams={{ ar: '1:1', fit: 'crop' }}
        width={360}
        height={360}
        quality={80}
        className="rounded-lg shadow-md"
      />
    </section>
  )
}

export default FooterImage
