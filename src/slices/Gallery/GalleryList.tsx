import { createClient } from '@/prismicio'
import addBlurredDataUrls from '@/lib/getBase64'
import * as prismic from '@prismicio/client'
import React from 'react'
import GalleryImage from '@/components/GalleryImage'
import Pagination from '@/components/Pagination'

type GalleryListProps = {
  page?: number
  type?: 'default' | 'paginated'
  tag?: string
}

const GalleryList = async ({
  page = 1,
  type = 'default',
  tag = 'Car',
}: GalleryListProps): Promise<JSX.Element> => {
  const client = createClient()
  if (type === 'paginated') {
    const gallery_items = await client.getByType('gallery_item', {
      page: page,
      pageSize: 12,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
    const PrismicImages = gallery_items.results.map(
      item => item.data.image,
    ) as prismic.FilledImageFieldImage[]
    const photosWithBlur = await addBlurredDataUrls(PrismicImages)
    return (
      <>
        {photosWithBlur.length > 0 && (
          <ul className="grid grid-cols-gallery gap-2">
            {photosWithBlur.map((photo, index) => {
              return (
                <li
                  key={photo.id}
                  className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
                >
                  <GalleryImage
                    image={photo}
                    blurDataURL={photosWithBlur[index].blurredDataUrl || ''}
                    index={index}
                  />
                </li>
              )
            })}
          </ul>
        )}
        {gallery_items.total_pages > 1 && (
          <Pagination
            hasNextPage={gallery_items?.next_page !== null}
            hasPrevPage={gallery_items?.prev_page !== null}
            totalPages={gallery_items?.total_pages}
          />
        )}
      </>
    )
  } else {
    const photos = await client.getByType('gallery_item', {
      page: 1,
      pageSize: 24,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      filters: [prismic.filter.any('document.tags', [tag])],
    })
    const PrismicImages = photos.results.map(
      photo => photo.data.image,
    ) as prismic.FilledImageFieldImage[]
    const photosWithBlur = await addBlurredDataUrls(PrismicImages)
    return (
      <>
        {photosWithBlur.length > 0 && (
          <ul className="grid grid-cols-gallery gap-2">
            {photosWithBlur.map((photo, index) => {
              return (
                <li
                  key={photo.id}
                  className="group relative h-64 overflow-hidden rounded-lg bg-secondary"
                >
                  <GalleryImage
                    image={photo}
                    blurDataURL={photosWithBlur[index].blurredDataUrl || ''}
                    index={index}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </>
    )
  }
}

export default GalleryList
