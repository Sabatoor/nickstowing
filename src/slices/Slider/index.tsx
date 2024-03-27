'use client'
import Section from '@/components/layout/Section'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { MapPin } from 'lucide-react'

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>

/**
 * Component for "Slider" Slices.
 */
const Slider = ({ slice }: SliderProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center rounded-lg py-4 lg:py-8">
        <div className="mb-4 lg:mb-8">
          <PrismicRichText field={slice.primary.header} />
        </div>
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full max-w-[280px] lg:max-w-sm"
        >
          <CarouselContent>
            {slice.items.length > 0 && (
              <>
                {slice.items.map((item, index) => {
                  return (
                    <CarouselItem key={slice.id + index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="aspect-square flex flex-col items-center justify-center p-6">
                            {isFilled.keyText(item.town) && (
                              <>
                                <MapPin
                                  size={60}
                                  className="text-primary"
                                  fill="lightgray"
                                />
                                <span className="text-3xl font-extrabold">
                                  {item.town}
                                </span>
                              </>
                            )}
                            {isFilled.keyText(item.value) && (
                              <p className="py-4 text-5xl font-bold text-primary lg:py-8">
                                {item.value}
                              </p>
                            )}
                            {isFilled.keyText(item.make_and_model) && (
                              <p className="py-4 text-2xl font-medium lg:py-8">
                                {item.make_and_model}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  )
                })}
              </>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  )
}

export default Slider
