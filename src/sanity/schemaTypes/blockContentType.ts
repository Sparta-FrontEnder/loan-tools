import { defineType, defineArrayMember } from "sanity";
import { ImageIcon, CodeBlockIcon } from "@sanity/icons";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    // ✅ 标准富文本
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" }, // ✅ 行内代码
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),

    // ✅ 图片
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    // ✅ 原生 HTML 块
    defineArrayMember({
      type: "object",
      name: "html",
      title: "HTML Block",
      icon: CodeBlockIcon,
      fields: [
        {
          name: "code",
          type: "text",
          title: "HTML Code",
          description: "Raw HTML snippet (renders as-is on frontend)",
        },
      ],
    }),
  ],
});
