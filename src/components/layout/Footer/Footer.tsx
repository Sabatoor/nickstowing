import { createClient } from '@/prismicio'
import FooterContent from './FooterContent'
import FooterCallNow from './FooterCallNow'

const Footer = async () => {
  const client = createClient()
  const layout = await client.getSingle('site_layout', {
    // fetchLinks: ['sub_menu.slices'],
    graphQuery: `
    {
      site_layout {
        copyright
        call_label
        call_link
        privacy_label
        privacy_link
        slices1 {
          ...on footer_item {
            variation {
              ...on default {
                primary {
                  heading
                }
              }
              ...on multiColumn {
                primary {
                  heading
                  multi_column_layout {
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
  return (
    <>
      <FooterContent data={layout.data} settings={settings.data} />
      <FooterCallNow
        link={layout.data.call_link}
        label={layout.data.call_label}
      />
    </>
  )
}

export default Footer
