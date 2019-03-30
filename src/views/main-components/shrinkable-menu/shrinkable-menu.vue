<template>
    <div class="shrinkable-menu">
        <slot name="top"></slot>
        <sidebarMenu
            v-show="!shrink"
            :menuList="menuList"
            :open-names="openNames"
            @on-change="handleChange"
        >
        </sidebarMenu>
        <sidebarMenuShrink
            v-show="shrink"
            :menuList="menuList"
            @on-change="handleChange"
        ></sidebarMenuShrink>

    </div>
</template>


<script>
    import sidebarMenu from './components/sidebarMenu.vue';
    import sidebarMenuShrink from './components/sidebarMenuShrink.vue';

    export default {
        name: 'shrinkable-menu',
        props: {
            shrink: {
                type: Boolean,
                default: false
            },
            menuList: {
                type: Array,
                required: true
            },
            openNames: {
                type: Array
            }
        },
        components: {
            sidebarMenu,
            sidebarMenuShrink
        },
        methods: {
            handleChange(name) {
                if (name.indexOf('isTurnByHref_') > -1) {
                    window.open(name.split('_')[1])
                    return;
                }
                this.$router.push({
                    name: name
                });
                this.$emit('on-change', name);

                /*let willpush = true;
                if (this.beforePush !== undefined) {
                    if (!this.beforePush(name)) {
                        willpush = false;
                    }
                }
                if (willpush) {
                    this.$router.push({
                        name: name
                    });
                }*/

            }
        }
    }
</script>