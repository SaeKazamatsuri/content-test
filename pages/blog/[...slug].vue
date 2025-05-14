<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div v-if="data" class="prose lg:prose-xl dark:prose-invert mx-auto">
            <!-- Blog header section -->
            <div class="mb-10">
                <h1 v-if="data.title" class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {{ data.title }}
                </h1>

                <div v-if="data.description" class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {{ data.description }}
                </div>

                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">

                    <!-- Publication date if available -->
                    <time v-if="data.date" :datetime="data.date" class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                            </path>
                        </svg>
                        {{ formatDate(data.date) }}
                    </time>

                    <!-- Reading time if available -->
                    <span v-if="data.readingTime" class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {{ data.readingTime }} min read
                    </span>
                </div>

                <!-- Cover image if available -->
                <img v-if="data.cover" :src="data.cover" :alt="data.title || 'Cover image'"
                    class="w-full h-auto rounded-lg object-cover mt-6 aspect-video" />
            </div>

            <!-- Blog content -->
            <div class="blog-content">
                <ContentRenderer :value="data" />
            </div>

            <!-- Tags section if available -->
            <div v-if="data.tags && data.tags.length" class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Tags</h3>
                <div class="flex flex-wrap gap-2">
                    <span v-for="tag in data.tags" :key="tag"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Loading state -->
        <div v-else class="animate-pulse space-y-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="space-y-2">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { BlogPost } from '@nuxt/content'

const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
    return queryCollection<BlogPost>('blog').path(route.path).first()
})

// Format date helper function
const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};
</script>

<style>
/* Additional custom styles for the blog content if needed */
.blog-content img {
    @apply rounded-lg my-6;
}

.blog-content a {
    @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.blog-content blockquote {
    @apply border-l-4 pl-4 italic text-gray-600 dark:text-gray-300;
}
</style>