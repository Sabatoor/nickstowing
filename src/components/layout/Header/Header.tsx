import { createClient } from '@/prismicio'
import Navbar from './Navbar'
import { SiteLayoutDocumentData } from '../../../../prismicio-types'

const Header = async () => {
  const client = createClient()
  const layout = await client.getSingle('site_layout', {
    // fetchLinks: ['sub_menu.slices'],
    graphQuery: `
    {
      site_layout {
        call_label
        call_link
        logo
        slices {
          ...on menu_item {
            variation {
              ...on default {
                primary {
                  label
                  link
                }
              }
              ...on withSubMenu {
                primary {
                  label
                  sub_menu {
                    slices
                    slices1
                    slices2
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
  })
  const settings = await client.getSingle('settings')
  const layoutData: SiteLayoutDocumentData = layout.data
  const { data } = settings
  return (
    <>
      <Navbar data={layoutData} settings={data} />
    </>
  )
}

export default Header
