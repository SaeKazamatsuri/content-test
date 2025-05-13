<template>
    <ul>
        <li v-for="(item, index) in data" :key="index">
            {{ item.title }}
        </li>
    </ul>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
    return queryCollection('blog').all()
})
</script>