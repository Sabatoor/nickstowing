import React from 'react'
import { Content, asImageSrc, asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicRichText } from './typography/PrismicRichText'
import { cn } from '@/lib/utils'
import { badgeVariants } from './ui/badge'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { PrismicNextImage } from '@prismicio/next'
type ContentListProps = {
  content: Content.ServiceDocument[] | Content.PortfolioDocument[]
  ctaText: Content.ContentIndexSlice['primary']['content_cta_text']
  fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image']
}

const ContentList = ({
  content,
  ctaText,
  fallbackItemImage,
}: ContentListProps) => {
  return (
    <ul>
      {content.length > 0 &&
        content.map(item => {
          return (
            <li key={item.id}>
              <Link
                href={item.url || '#'}
                className="flex flex-col justify-between border-t border-t-secondary py-10 md:items-start"
                aria-label={asText(item.data.title) || 'View the content'}
              >
                <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
                  <div className="flex flex-col gap-y-3">
                    <PrismicRichText field={item.data.title} />
                    <div className="flex gap-3">
                      {item.tags.length > 0 &&
                        item.tags.map(tag => (
                          <span
                            key={item.id + tag}
                            className={cn(
                              'block',
                              badgeVariants({ variant: 'secondary' }),
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'my-6 md:my-0',
                      buttonVariants({ variant: 'outline' }),
                    )}
                  >
                    {ctaText}
                    <ArrowRight />
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                  {isFilled.richText(item.data.excerpt) ? (
                    <div className="prose my-4 shrink-0 lg:prose-lg">
                      <PrismicRichText field={item.data.excerpt} />
                    </div>
                  ) : null}
                  <PrismicNextImage
                    field={
                      item.data.featured_image.url
                        ? item.data.featured_image
                        : fallbackItemImage
                    }
                    imgixParams={{ ar: '1:1', fit: 'crop' }}
                    quality={75}
                    width={300}
                    className="hidden rounded-lg shadow lg:inline"
                  />
                </div>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default ContentList
