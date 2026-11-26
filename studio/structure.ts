import type {StructureResolver} from 'sanity/structure'

// Fixed document IDs keep homepage/settings as single entries.
export const singletonTypes = new Set(['homePage', 'siteSettings'])
export const structure: StructureResolver = S => S.list().title('Quản lý nội dung').items([
  S.listItem().id('homePage').title('Trang chủ').child(S.document().schemaType('homePage').documentId('homePage').title('Trang chủ')),
  S.documentTypeListItem('service').title('Dịch vụ'),
  S.documentTypeListItem('exploration').title('Studio exploration'),
  S.documentTypeListItem('post').title('Bài viết'),
  S.documentTypeListItem('faq').title('FAQ'),
  S.listItem().id('siteSettings').title('Cài đặt chung').child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Cài đặt chung')),
])
