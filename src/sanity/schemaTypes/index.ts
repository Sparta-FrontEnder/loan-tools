import { type SchemaTypeDefinition } from 'sanity'
import { newsType } from './newsType'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [newsType, blockContentType, categoryType, postType, authorType],
}
