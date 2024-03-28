import { cn } from '@/lib/utils'
import {
  ImageField,
  KeyTextField,
  LinkField,
  isFilled,
} from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Recycle } from 'lucide-react'
type PhoneTitleProps = {
  call_link: LinkField
  phone: KeyTextField
  site_title: KeyTextField
  logo?: ImageField
}
const PhoneTitle = ({
  logo,
  call_link,
  phone,
  site_title,
}: PhoneTitleProps): JSX.Element => {
  return (
    <div className="flex-1 text-primary-foreground">
      <div className="flex items-center gap-2">
        {isFilled.image(logo) ? (
          <PrismicNextImage field={logo} width={80} />
        ) : (
          <Recycle className="h-12 w-12 text-primary-foreground" />
        )}
        <div>
          {isFilled.link(call_link) ? (
            <PrismicNextLink field={call_link}>
              {isFilled.keyText(phone) && (
                <p className="text-2xl font-black lg:text-3xl">{phone}</p>
              )}
              {isFilled.keyText(site_title) && (
                <h1 className={cn('text-sm font-black lg:text-base')}>
                  {site_title}
                </h1>
              )}
            </PrismicNextLink>
          ) : (
            <>
              {isFilled.keyText(phone) && (
                <p className="text-2xl font-black lg:text-3xl">{phone}</p>
              )}
              {isFilled.keyText(site_title) && (
                <h1 className={cn('font-black')}>{site_title}</h1>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhoneTitle
