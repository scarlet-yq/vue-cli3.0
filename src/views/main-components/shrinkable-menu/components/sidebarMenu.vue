<template>
    <Menu theme="dark" class="menu" ref="sideMenu" :active-name="$route.name" :open-names="openNames"  width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="getNameOrHref(item, true)" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon"  :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">
                    {{ itemTitle(item.children[0]) }}
                  </span>
            </MenuItem>

            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="getNameOrHref(child)" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>


<script>
    export default {
        name: 'sidebarMenu',
        props: {
            menuList: Array,
            iconSize: {
                type: Number,
                default: 18
            },
            openNames: {
                type: Array
            }
        },
        methods: {
            getNameOrHref (item, children0) {
                return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
            },
            changeMenu (active) {
                this.$emit('on-change', active);
            },
            itemTitle (item) {
                return this.$t("_" + item.name);
            }
        },
        updated () {
            this.$nextTick(() => {
                if (this.$refs.sideMenu) {
                    this.$refs.sideMenu.updateOpened();
                    this.$refs.sideMenu.updateActiveName();
                }
            });
        }
    }
</script>
