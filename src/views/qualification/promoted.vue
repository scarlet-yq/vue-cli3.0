<template>
    <div class="promoted">
        <Card :bordered="false" :shadow="false" :dis-hover="true">
            <div class="search-btn">
              <Form>
                  <Row :gutter="30">
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                      <FormItem>
                        <Input v-model="searchForm.appName" :placeholder="$t('_appName')"/>
                      </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                      <FormItem>
                        <Input v-model="searchForm.promotedAppId" placeholder="Promoted App Id"/>
                      </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                      <FormItem>
                        <Input v-model="searchForm.packagee" placeholder="Package"/>
                      </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                      <FormItem>
                        <Input v-model="searchForm.companyId" :placeholder="$t('_companyId')"/>
                      </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                        <FormItem>
                          <Input v-model="searchForm.companyName" :placeholder="$t('_companyName')"/>
                        </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                      <FormItem>
                        <Select v-model="searchForm.exchange">
                          <!--<Option :value="-1" :key="-1">-Exchange-</Option>-->
                          <Option v-for="item in exchangeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
                        <FormItem>
                          <Select v-model="searchForm.reviewStatus">
                            <!--<Option :value="-1" :key="-1">-Review Status-</Option>-->
                            <Option v-for="item in reviewStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="30" >
                  <Col span="24" :style="{ textAlign: 'right' }">
                      <FormItem>
                        <Button class="m-r-20" type="primary" @click="promotedAppsPageChange">{{ this.$t("_search") }}</Button>
                        <Button type="success" @click="exportToExcel">{{ this.$t("_exportToExcel") }}</Button>
                      </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <div class="margin-top-10">
              <Table :columns="promotedAppsColumns" :data="promotedAppsPage.content"></Table>
            </div>
            <div class="page-container">
              <Page :total="promotedAppsPage.totalElements" :current="promotedAppsPage.number + 1" :page-size="promotedAppsPage.size" @on-change="promotedAppsPageChange"></Page>
            </div>
        </Card>
        <!--icon Model -->
        <transition name="fade">
          <div class="icon-mask"  v-show="iconModelShow">
            <div class="img-wrap">
              <img :src="iconSrc">
              <span @click="iconModelShow = false">
                <Icon type="md-close-circle" color="#fff" size="26"/>
              </span>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
    import { qualificationResource } from '../../api';

     export default {
       name: "promoted",
       data() {
          return {
            searchLayout: {
              xs: 24,
              sm: 24,
              md: 8,
              lg: 6,
            },
            searchForm: {
              appName: "",
              promotedAppId: "",
              packagee: "",
              companyId: "",
              companyName: "",
              exchange: "1",
              reviewStatus: "1"
            },
            promotedAppsColumns: [
              {
                title: this.$t("_icon"),
                key: "icon",
                width:  120,
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Avatar', {
                      props: {
                        src: params.row.icon,
                        shape: 'square'
                      },
                      style: {
                        cursor:'pointer'
                      },
                      nativeOn: {
                        click: () => this.showIconModel(params.row.icon)
                      }
                    })
                  ])
                }
              },
              {
                title: "Promoted App Id",
                key: "promotedAppId",
                width: 120,
                align: 'center'
              },
              {
                title: this.$t("_appName"),
                key: "appName",
                width: 140,
                align: 'center'
              },
              {
                title: "Package",
                key: "package",
                width: 140,
                align: 'center'
              },
              {
                title: this.$t("_companyId"),
                key: "companyId",
                width: 140,
                align: 'center'
              },
              {
                title: this.$t("_companyName"),
                key: "companyName",
                width: 140,
                align: 'center'
              },
              {
                title: this.$t("_category"),
                key: "category",
                width: 100,
                align: 'center'
              },
              {
                title: this.$t("_submitted"),
                key: "submitted",
                width: 120,
                align: 'center'
              },
              {
                title: this.$t("_reviewStatus"),
                key: "reviewStatus",
                width: 120,
                align: 'center'
              },
              {
                title: this.$t("_message"),
                key: "message",
                align: 'center',
                width: 150,
              }
            ],
            promotedAppsPage: {
              content: [],
              totalElements: 0,
              number: 0,
              size: 10
            },
            exchangeList: [
              {
                value: "1",
                label: "Tencent"
              }
            ],
            reviewStatusList: [
              {
                value: "1",
                label: "审核通过"
              },
              {
                value: "2",
                label: "被拒绝"
              },
              {
                value: "3",
                label: "准备中"
              },
              {
                value: "4",
                label: "待审核"
              },
              {
                value: "5",
                label: "送审失败"
              },
            ],
            iconSrc: "",
            iconModelShow: false
          }
       },
       created() {
          this.search();
       },
       methods: {
          search() {
              this.promotedAppsPageChange(1);
          },
         promotedAppsPageChange(pageNo) {
           let { appName, promotedAppId, packagee, companyId, companyName, exchange, reviewStatus } = this.searchForm;
           qualificationResource.getAllPromotedApp(
             appName,
             promotedAppId,
             packagee,
             companyId,
             companyName,
             exchange,
             reviewStatus,
             pageNo - 1,
             10
           ).then(response => {
                console.log("responsedata", response.data);
                this.promotedAppsPage = response.data;
           })
         },
         exportToExcel() {
            console.log("导出到excel")
         },
         showIconModel(iconSrc) {
            this.iconModelShow = true;
            this.iconSrc = iconSrc;
         }
       }
     }
</script>

<style lang="less">
  @import "../../assets/styles/common.less";
</style>

<style lang="less">
  @import "./promoted.less";
</style>
