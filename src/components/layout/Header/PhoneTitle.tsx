import { cn } from '@/lib/utils'
import { KeyTextField, LinkField, isFilled } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
type PhoneTitleProps = {
  call_link: LinkField
  phone: KeyTextField
  site_title: KeyTextField
}
const PhoneTitle = ({
  call_link,
  phone,
  site_title,
}: PhoneTitleProps): JSX.Element => {
  return (
    <div className="flex-1 text-primary-foreground">
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
  )
}

export default PhoneTitle
