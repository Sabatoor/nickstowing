import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { components } from '@/slices'
import { PrismicNextLink } from '@prismicio/next'
import { SliceZone } from '@prismicio/react'
import {
  SiteLayoutDocumentData,
  MenuItemSliceWithSubMenuPrimary,
  SubMenuDocument,
} from '../../../../prismicio-types'

type MenuProps = {
  data: SiteLayoutDocumentData
  className?: string
}

const Menu = ({ data, className }: MenuProps): JSX.Element => {
  const { slices } = data
  return (
    <div className={cn('flex-1 text-primary-foreground', className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {slices.map(slice => {
            if (slice.variation === 'withSubMenu') {
              const slicePrimary =
                slice.primary as MenuItemSliceWithSubMenuPrimary
              // isolate the sub_menu document from primary
              const sub_menu =
                slicePrimary.sub_menu as unknown as SubMenuDocument
              // look at the submenu and determine columns needed
              const cols =
                (sub_menu.data?.slices.length > 0 ? 1 : 0) +
                (sub_menu.data?.slices1.length > 0 ? 1 : 0) +
                (sub_menu.data?.slices2.length > 0 ? 1 : 0)
              return (
                <NavigationMenuItem key={slice.id}>
                  <NavigationMenuTrigger
                    className={navigationMenuTriggerStyle()}
                  >
                    {slice.primary.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3">
                    <div
                      className={cn('grid w-[980px] gap-x-2', {
                        'grid-cols-2': cols === 2,
                        'grid-cols-3': cols === 3,
                      })}
                    >
                      {sub_menu.data.slices.length > 0 && (
                        <div>
                          <SliceZone
                            slices={sub_menu.data.slices}
                            components={components}
                          />
                        </div>
                      )}
                      {sub_menu.data.slices1.length > 0 && (
                        <div>
                          <SliceZone
                            slices={sub_menu.data.slices1}
                            components={components}
                          />
                        </div>
                      )}
                      {sub_menu.data.slices2.length > 0 && (
                        <div>
                          <SliceZone
                            slices={sub_menu.data.slices2}
                            components={components}
                          />
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            } else {
              return (
                <NavigationMenuItem key={slice.id} className="px-4 py-2 ">
                  <NavigationMenuLink asChild>
                    <PrismicNextLink field={slice.primary.link}>
                      {slice.primary.label}
                    </PrismicNextLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Menu
