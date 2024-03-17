'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { PhoneCallIcon } from 'lucide-react'
import { KeyTextField, LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'

type FooterCallNowProps = {
  label: KeyTextField
  link: LinkField
}

const FooterCallNow = ({ label, link }: FooterCallNowProps): JSX.Element => {
  const container = useRef(null)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', latest => {
    const previous: number = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(false)
    } else if (latest === 0) {
      setHidden(true)
    } else {
      setHidden(true)
    }
  })
  return (
    <motion.div
      ref={container}
      variants={{ visible: { y: 0 }, hidden: { y: '+300%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn(
        'fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-foreground bg-primary lg:bottom-12 lg:right-12 lg:h-24 lg:w-24',
      )}
    >
      <PrismicNextLink field={link} className="p-5 lg:p-8">
        <PhoneCallIcon className="text-primary-foreground lg:h-10 lg:w-10" />
        <span className="sr-only">
          Call Nick&apos;s Green Auto Towing for a Quote
        </span>
      </PrismicNextLink>
    </motion.div>
  )
}

export default FooterCallNow
