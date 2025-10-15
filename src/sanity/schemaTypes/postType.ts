import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' },
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en', // 默认用英文标题生成 slug
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    // ✅ 双语正文 + 支持 blockContentType（含 HTML 块）
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'blockContent',
          title: 'English',
        },
        {
          name: 'zh',
          type: 'blockContent',
          title: '中文',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `by ${author}` : '' }
    },
  },
})
