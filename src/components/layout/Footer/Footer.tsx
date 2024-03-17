import { createClient } from '@/prismicio'

const Footer = async () => {
  const client = createClient()
  const layout = await client.getSingle('layout', {
    // fetchLinks: ['sub_menu.slices'],
    graphQuery: `
    {
      layout {
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
  return <>Footer</>
}

export default Footer
