---
title: Nuxt ContentでMarkdownブログを始める方法
description: Nuxt 3とContent v3.5.1を使用して、効率的で高速なMarkdownブログを作成する方法を解説します。
date: 2025-05-14
tags: ['nuxt', 'content', 'markdown', 'blog']
image: '/images/blog/nuxt-content-blog.jpg'
---

# Nuxt ContentでMarkdownブログを始める方法

Nuxt ContentはNuxt.jsフレームワークのパワフルなモジュールで、Markdownファイルをコンテンツソースとして活用することができます。このガイドでは、Nuxt 3とContent v3.5.1を使って、モダンでパフォーマンスの高いブログサイトを構築する方法を説明します。

## Nuxt Contentとは？

Nuxt Contentは「Git-based Headless CMS」として機能し、MarkdownやJSON、YAMLなどのファイルを扱うことができます。これにより、データベースなしでコンテンツ駆動型のウェブサイトを構築することが可能になります。

特に魅力的な点は以下の通りです：

- **高速なコンテンツの取得** - インメモリキャッシュによる高速なクエリ
- **Markdownのサポート** - フロントマターとMDCのサポート
- **開発体験の向上** - ホットリロードによる即時プレビュー
- **型安全性** - TypeScriptとZodによる型チェック

## インストールとセットアップ

まずはプロジェクトにNuxt Contentをインストールします：

```bash
# npm
npm install @nuxt/content

# yarn
yarn add @nuxt/content

# pnpm
pnpm add @nuxt/content
```

次に、`nuxt.config.ts`ファイルにContentモジュールを追加します：

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content'
  ],
  content: {
    // オプション設定
    highlight: {
      theme: 'github-dark'
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  }
})
```

## コンテンツのスキーマ定義

Zodを使ってコンテンツのスキーマを定義することで、型の安全性を確保できます。`content.config.ts`ファイルを作成しましょう：

```typescript
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional()
      })
    })
  }
})
```

## ブログ記事の作成

`content/blog/`ディレクトリにMarkdownファイルを作成します：

```markdown
---
title: はじめてのブログ記事
description: Nuxt Contentを使った最初のブログ記事です
date: 2025-05-14
tags: ['nuxt', 'content', 'markdown']
image: '/images/blog/first-post.jpg'
---

ここに記事の本文を書きます。**Markdown**の書式が使えます。

## 見出し2

テキストと[リンク](https://nuxt.com)も書けます。

- リスト項目1
- リスト項目2
- リスト項目3
```

## 記事の表示

記事を表示するためのVueコンポーネントを作成します。`pages/blog/[...slug].vue`ファイルを作成しましょう：

```vue
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="data" class="prose lg:prose-xl dark:prose-invert mx-auto">
      <!-- ブログヘッダー部分 -->
      <div class="mb-10">
        <h1 v-if="data.title" class="text-3xl md:text-4xl font-bold mb-4">
          {{ data.title }}
        </h1>
        
        <div v-if="data.description" class="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {{ data.description }}
        </div>
        
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <!-- 公開日 -->
          <time v-if="data.date" :datetime="formatDateISO(data.date)">
            {{ formatDate(data.date) }}
          </time>
          
          <!-- タグ -->
          <div v-if="data.tags && data.tags.length" class="flex flex-wrap gap-2">
            <span v-for="tag in data.tags" :key="tag">
              # {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- アイキャッチ画像 -->
        <img
          v-if="data.image"
          :src="data.image"
          :alt="data.title"
          class="w-full h-auto rounded-lg mt-6"
        />
      </div>
      
      <!-- ブログ本文 -->
      <ContentRenderer :value="data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Blog } from '~/types/content';

const route = useRoute();
const { data } = await useAsyncData<Blog>(route.path, () => {
  return queryCollection('blog').path(route.path).first();
});

// 日付フォーマット関数
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

const formatDateISO = (date: Date) => {
  return new Date(date).toISOString();
};
</script>
```

## ブログ一覧ページ

全ての記事を一覧表示するページも作成しましょう。`pages/blog/index.vue`ファイルを作成します：

```vue
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold mb-8 text-center">ブログ記事一覧</h1>
    
    <div class="grid gap-8 md:grid-cols-2">
      <div v-for="post in posts" :key="post._path" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="post._path">
          <img 
            v-if="post.image" 
            :src="post.image" 
            :alt="post.title" 
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ post.title }}</h2>
            <p v-if="post.description" class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {{ post.description }}
            </p>
            <div class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <time :datetime="formatDateISO(post.date)">{{ formatDate(post.date) }}</time>
              <div class="flex gap-2">
                <span 
                  v-for="tag in post.tags?.slice(0, 2)" 
                  :key="tag"
                  class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BlogDocument } from '~/types/content';

// 記事を日付順に取得
const { data: posts } = await useAsyncData<BlogDocument[]>('blog-list', () => {
  return queryCollection('blog')
    .sort({ date: -1 })
    .find();
});

// 日付フォーマット関数
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

const formatDateISO = (date: Date) => {
  return new Date(date).toISOString();
};
</script>
```

## CSSのスタイリング

Tailwind CSSを使ったデザインに加えて、`@tailwindcss/typography`プラグインをインストールすると、Markdownのスタイリングが美しくなります：

```bash
npm install -D @tailwindcss/typography
```

`tailwind.config.js`に追加：

```javascript
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

## 最適化とSEO対策

Nuxt 3には優れたSEO対策機能が組み込まれています。各ブログ記事のmetaタグを設定しましょう：

```vue
<script setup>
// 前述のコードに追加
useHead({
  title: data.value?.title,
  meta: [
    { name: 'description', content: data.value?.description },
    // Open Graph
    { property: 'og:title', content: data.value?.title },
    { property: 'og:description', content: data.value?.description },
    { property: 'og:image', content: data.value?.image },
    { property: 'og:type', content: 'article' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.value?.title },
    { name: 'twitter:description', content: data.value?.description },
    { name: 'twitter:image', content: data.value?.image },
  ],
});
</script>
```

## まとめ

Nuxt ContentとNuxt 3を組み合わせることで、高速でSEOに強く、開発体験に優れたブログサイトを構築できます。Markdownを使うことで、技術記事やブログなどを簡単に書くことができ、GitベースのワークフローでコンテンツがGitリポジトリで管理できるのも大きな利点です。

ぜひ試してみてください！