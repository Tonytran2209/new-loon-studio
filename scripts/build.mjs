import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'
import {renderHomepage,renderArticle} from './cms.mjs'
import {renderBlog} from './blog.mjs'
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const client=createClient({projectId:process.env.SANITY_PROJECT_ID||'eeqvvhno',dataset:process.env.SANITY_DATASET||'production',apiVersion:'2025-02-19',useCdn:false,perspective:'published',token:process.env.SANITY_READ_TOKEN||undefined,requestTagPrefix:'loon-build'})
const querySource=await readFile(path.join(root,'scripts/sanity-queries.ts'),'utf8');const query=querySource.match(/defineQuery\(`([\s\S]*?)`\)/)?.[1];if(!query)throw Error('Missing website content query')
const documents=process.env.CMS_FIXTURE?JSON.parse(await readFile(process.env.CMS_FIXTURE,'utf8')):await client.fetch(query)
for(const type of ['service','exploration','post']){const used=new Set();for(const d of documents.filter(d=>d._type===type)){if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug?.current||''))throw Error(`Invalid ${type} slug: ${d._id}`);if(used.has(d.slug.current))throw Error(`Duplicate ${type} slug: ${d.slug.current}`);used.add(d.slug.current)}}
const template=await readFile(path.join(root,'templates/index.html'),'utf8'),{html,posts}=renderHomepage(template,documents)
const dist=path.join(root,'dist');await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true})
// Explicit allowlist ensures Studio source, credentials and migration backups never enter the public build.
for(const name of ['assets','styles','scripts','cdn.prod.website-files.com','cdnjs.cloudflare.com','d3e54v103j8qbb.cloudfront.net'])await cp(path.join(root,name),path.join(dist,name),{recursive:true,filter:source=>name!=='scripts'||source===path.join(root,'scripts')||source.endsWith('.js')})
await writeFile(path.join(dist,'index.html'),html);await writeFile(path.join(dist,'loon-lab.html'),html)
const siteUrl=(process.env.SITE_URL||'https://new-loon-studio.vercel.app').replace(/\/$/,'')
await mkdir(path.join(dist,'blog'),{recursive:true});await writeFile(path.join(dist,'blog/index.html'),renderBlog(html,posts,documents.find(d=>d._type==='siteSettings'),siteUrl))
for(const post of posts){const folder=path.join(dist,'insights',post.slug.current);await mkdir(folder,{recursive:true});await writeFile(path.join(folder,'index.html'),renderArticle(html,post,siteUrl,posts))}
await writeFile(path.join(dist,'cms-version.json'),JSON.stringify({builtAt:new Date().toISOString(),commit:process.env.VERCEL_GIT_COMMIT_SHA||null,counts:documents.reduce((r,d)=>(r[d._type]=(r[d._type]||0)+1,r),{}),posts:posts.map(p=>p.slug.current)}))
console.log(`Built CMS homepage and ${posts.length} article pages from ${documents.length} published documents.`)
