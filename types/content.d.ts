import { z } from 'zod'
import type { InferSchemaValues } from '@nuxt/content/dist/runtime/types'

// content.config.ts からスキーマの型を取得する
const blogSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional()
})

// 型の拡張
declare module '@nuxt/content' {
    // BlogPost 型を定義
    export type BlogPost = InferSchemaValues<typeof blogSchema>
}