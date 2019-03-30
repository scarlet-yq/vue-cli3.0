<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="main-sider" :style="{width: shrink ? '60px' : '270px'}">
            <shrinkableMenu
                    :shrink="shrink"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-icon">
                    <div class="logo">
                        <img width="100%" v-show="!shrink"  src="../assets/images/logo.png" key="max-logo" />
                        <img width="100%" v-show="shrink" src="../assets/images/logo-min.png" key="min-logo" />
                    </div>
                </div>
            </shrinkableMenu>
        </div>
        <Header :style="{'left': shrink ? '60px' : '270px'}" class="layout-header-bar">
            <div class="navicon-con">
                <Icon color="#fff" @click.native="toggleClick"  :style="{transform: 'rotateZ(' + (shrink ? '-90' : '0') + 'deg)',margin: '0 20px'}"  type="md-menu" size="24"></Icon>
            </div>
            <div class="main-breadcrumb">
                <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
            </div>
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                <strong>{{ $t("_user") }}:</strong>
                <strong>{{userInfo.realName}}</strong>
                <Button @click="changeLocale">{{ language }}</Button>
                <Button type="primary">{{ $t("_logout") }}</Button>
            </Row>
        </Header>
        <div class="single-page" :style="{left: shrink ? '60px' : '270px'}">
            <div class="single-page-view">
                <router-view></router-view>
            </div>
        </div>
        <!--<Layout>
            <Sider class="main-sider" ref="side1" hide-trigger collapsible :collapsed-width="60" v-model="shrink">
                <shrinkableMenu
                    :shrink="shrink"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                    <div slot="top" class="logo-icon">
                        <div class="logo">
                            <img width="100%" v-show="!shrink"  src="../assets/images/logo.png" key="max-logo" />
                            <img width="100%" v-show="shrink" src="../assets/images/logo-min.png" key="min-logo" />
                        </div>
                    </div>
                </shrinkableMenu>
            </Sider>
            <Layout>
                <Header :style="{'padding-left': shrink ? '60px' : '200px'}" class="layout-header-bar">
                    <div class="navicon-con">
                        <Icon color="#fff" @click.native="toggleClick"  :style="{transform: 'rotateZ(' + (shrink ? '-90' : '0') + 'deg)',margin: '0 20px'}"  type="md-menu" size="24"></Icon>
                    </div>
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <span>当前用户：</span>
                        <strong>{{userInfo.realName}}</strong>
                        <Button>EN</Button>
                        <Button type="primary">退出登录</Button>
                    </Row>
                </Header>
                <Content :style="{
                    left: shrink ? '60px' : '200px',
                }" class="single-page">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>-->
    </div>
</template>

<script>
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    import breadcrumbNav from './main-components/breadcrumb-nav.vue';
    import {Layout,Content, Sider, Header, Button, Icon, Row, Avatar, Dropdown, DropdownMenu , DropdownItem} from 'iview';
    import { mapGetters } from 'vuex';
    import Util from '../libs/util';
    import Cookies from 'js-cookie';

    export default {
        name: "Main",
        components: {
            shrinkableMenu,
            breadcrumbNav,
            Layout,
            Content,
            Sider,
            Header,
            Icon,
            Row,
            Avatar,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            Button
        },
        data() {
            return {
                shrink: false,
                language: 'EN',
                menuList: [
                    {
                        "path": "/home",
                        "title": "首页",
                        "name": "home",
                        "operUrl": "home",
                        "icon": "ios-home",
                        "children": [
                            {
                                "path": "index",
                                "title": "首页",
                                "name": "home_index",
                                "operUrl": "home",
                                "icon": "ios-home",
                                "children": null,
                                "href": null
                            }
                        ],
                        "href": null
                    },
                    {
                        "path": "/qualification",
                        "title": "资质",
                        "name": "qualification",
                        "operUrl": "qualification",
                        "icon": "md-flask",
                        "children": [
                            {
                                "path": "promoted",
                                "title": "资质审核",
                                "name": "qualification-promoted",
                                "operUrl": "promoted",
                                "icon": "ios-medal",
                                "children": null,
                                "href": null
                            },
                            {
                                "path": "creative",
                                "title": "素材审核",
                                "name": "qualification-creative",
                                "operUrl": "creative",
                                "icon": "md-bookmarks",
                                "children": null,
                                "href": null
                            }
                        ],
                        "href": null
                    }
                ],
            }
        },
        computed: {
            ...mapGetters({
                userInfo: "userInfo",
                openedSubmenuArr: "openedSubmenuArr",
                currentPath: "currentPath"
            })
        },
        watch: {
            '$route'(to) {
                let pathArr = Util.setCurrentPath(this, to.name);
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[0].name);
                }
            }
        },
        created() {
            let shrink = window.localStorage.getItem("shrink");
            this.shrink = shrink === 'true' ? true : false;
        },
        mounted() {

            this.init();
        },
        methods: {
            init () {
                let pathArr = Util.setCurrentPath(this, this.$route.name);
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[0].name);
                }
                if (Cookies.get('lang') ===  'en') {
                    this.language = '中文';
                    return ;
                }
                this.language = 'EN';
            },
            toggleClick () {
                let shrink = !this.shrink;
                let storage = window.localStorage;
                window.localStorage.setItem("shrink", shrink);
                this.shrink = shrink;
            },
            // 切换语言
            changeLocale () {
                if (this.language === 'EN') {
                    Cookies.set('lang', 'en', { expires: 365 });
                } else {
                    Cookies.set('lang', 'zh', { expires: 365 });
                }
                window.location.reload();
            }
        }
    }
</script>


<style lang="less">
    .main {
        .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
            padding: 14px;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
            background-color: #87a2be !important;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover {
            background-color: #87a2be;
        }
        .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
            color: #fff;
        }
        .ivu-btn-text:hover {
            background-color: #515a6e;
        }
        .ivu-layout-sider {
            transition: width .3s;
        }
        .ivu-breadcrumb>span:last-child,
        .ivu-breadcrumb a{
            color: #fff;
        }
        .ivu-layout-header {
            padding: 0;
        }
    }
</style>
<style lang="less">
    @import './Main.less';
</style>