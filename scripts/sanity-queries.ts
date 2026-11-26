import {defineQuery} from 'groq'
// Shared query source; the Node build reads the string from this file at build time.
export const websiteContentQuery = defineQuery(`*[_type in ["homePage","siteSettings","service","exploration","post","faq"]]{...,logo{...,asset->{_id,url,metadata{dimensions}}},coverImage{...,asset->{_id,url,metadata{dimensions}}},body[]{...,asset->{_id,url,metadata{dimensions}}},answer[]{...,asset->{_id,url,metadata{dimensions}}},auxiliaryPages[]{...,body[]{...,asset->{_id,url,metadata{dimensions}}}},seo{...,shareImage{...,asset->{_id,url}}}}`)
