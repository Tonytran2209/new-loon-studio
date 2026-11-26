import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, singletonTypes} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Loon Studio CMS',

  projectId: 'eeqvvhno',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  document: {
    actions: (actions, context) => singletonTypes.has(context.schemaType)
      ? actions.filter(item => item.action !== 'duplicate' && item.action !== 'delete')
      : actions,
  },

  schema: {
    types: schemaTypes,
    templates: templates => templates.filter(t => !singletonTypes.has(t.schemaType)),
  },
})
