import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ImageFieldImage } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

type GalleryImageProps = {
  image: ImageFieldImage
  blurDataURL: string
  index: number
}

export default function GalleryImage({
  image,
  blurDataURL,
  index,
}: GalleryImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PrismicNextImage
          field={image}
          fill
          className="cursor-pointer object-cover transition-opacity duration-300 ease-out group-hover:opacity-75"
          imgixParams={{ ar: '1:1', fit: 'crop' }}
          sizes="(min-width: 1420px) 314px, (min-width: 1040px) calc(20vw + 34px), (min-width: 800px) calc(33.64vw - 24px), (min-width: 520px) 46.92vw, calc(100vw - 32px)"
          loading={index < 4 ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[768px]">
        <DialogHeader></DialogHeader>
        <div className="flex justify-center">
          <PrismicNextImage
            field={image}
            imgixParams={{ ar: '4:3', fit: 'crop' }}
            placeholder="blur"
            blurDataURL={blurDataURL}
            loading={index < 4 ? 'eager' : 'lazy'}
            className="rounded-lg"
          />
        </div>
        <DialogFooter>
          <Button asChild>
            <DialogClose>Close</DialogClose>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
