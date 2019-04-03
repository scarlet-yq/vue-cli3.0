<template>
    <Breadcrumb>
        <BreadcrumbItem
                v-for="item in currentPath"
                :href="item.path"
                :key="item.name"
                :to="item.path"
        >{{ itemTitle(item) }}</BreadcrumbItem>
    </Breadcrumb>
</template>

<script>

export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array
    },
    methods: {
        itemTitle (item) {
            return item.name === "home_index_page" ? this.$t("__") :this.$t("_"+item.name);
        }
    }
}
</script>

