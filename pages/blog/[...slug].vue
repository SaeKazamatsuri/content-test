<template>
    <div class="">
        <ContentRenderer v-if="data" :value="data" />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data } = await useAsyncData(route.path, () => {
    return queryCollection('blog').path(route.path).first()
})


</script>