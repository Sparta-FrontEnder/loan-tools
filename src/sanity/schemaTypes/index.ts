import { type SchemaTypeDefinition } from 'sanity'

// 各种 schema
import { newsType } from './newsType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'

// ✅ 新增的 HTML schema
const htmlType = {
  name: 'html',
  title: 'HTML',
  type: 'object',
  fields: [
    {
      name: 'code',
      title: 'HTML Code',
      type: 'text',
      description: 'Write raw HTML code here',
    },
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    newsType,
    blockContentType,
    categoryType,
    postType,
    authorType,
    htmlType, // ✅ 注册 html 块
  ],
}
