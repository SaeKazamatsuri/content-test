<template>
    <ul>
        <li v-for="(item, index) in data" :key="index">
            <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
    return queryCollection('blog').all()
})
</script>