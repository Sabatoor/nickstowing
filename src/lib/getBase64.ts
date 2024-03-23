import { getPlaiceholder } from 'plaiceholder'
import type { FilledImageFieldImage } from '@prismicio/client'

interface PrismicImage extends FilledImageFieldImage {
  blurredDataUrl?: string
}

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
    }
    const buffer = await res.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))
    return base64
  } catch (e) {
    if (e instanceof Error) console.log(e.stack)
  }
}

export default async function addBlurredDataUrls(
  images: PrismicImage[],
): Promise<PrismicImage[]> {
  // Make all requests at once (avoid waterfall)
  const base64Promises = images.map(image => getBase64(image.url))
  const base64Results = await Promise.all(base64Promises)
  const photosWithBlur = images.map((image, index) => {
    image.blurredDataUrl = base64Results[index]
    return image
  })
  return photosWithBlur
}
