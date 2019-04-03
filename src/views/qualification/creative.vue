<template>
  <div class="creative">
    <Card :bordered="false" :shadow="false" :dis-hover="true">
      <div class="search-btn">
        <Form>
          <Row :gutter="30">
            <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
            <FormItem>
              <Input v-model="searchForm.creativeId" :placeholder="$t('_creativeId')"/>
            </FormItem>
            </Col>
            <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
            <FormItem>
              <Input v-model="searchForm.packagee" placeholder="Package"/>
            </FormItem>
            </Col>
            <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
            <FormItem>
              <Input v-model="searchForm.offerId" :placeholder="$t('_offerId')"/>
            </FormItem>
            </Col>
            <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
            <FormItem>
              <Input v-model="searchForm.promotedAppId" placeholder="Promoted App ID"/>
            </FormItem>
            </Col>
            <Col :xs="searchLayout.xs" :sm="searchLayout.sm" :md="searchLayout.md" :lg="searchLayout.lg">
            <FormItem>
              <Input v-model="searchForm.exchangeCreativeId" :placeholder="$t('_exchangeCreativeId')"/>
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
              <Select v-model="searchForm.adType">
                <!--<Option :value="-1" :key="-1">-Ad Type-</Option>-->
                <Option v-for="item in adTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                  <Button class="m-r-20" type="primary" @click="creativePageChange">{{ this.$t("_search") }}</Button>
                  <Button type="success" @click="exportToExcel">{{ this.$t("_exportToExcel") }}</Button>
                </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="margin-top-10">
        <Table :columns="creativeColumns" :data="creativePage.content"></Table>
      </div>
      <div class="page-container">
        <Page :total="creativePage.totalElements" :current="creativePage.number + 1" :page-size="creativePage.size" @on-change="creativePageChange"></Page>
      </div>
    </Card>

  </div>
</template>

<script>
  import { qualificationResource } from '../../api';

  export default {
    name: "creative",
    data() {
      return {
        searchLayout: {
          xs: 24,
          sm: 24,
          md: 8,
          lg: 6,
        },
        searchForm: {
          creativeId: "",
          packagee: "",
          offerId: "",
          promotedAppId: "",
          exchangeCreativeId: "",
          exchange: "1",
          adType: "1",
          reviewStatus: "1"
        },
        creativeColumns: [
          {
            title: this.$t("_creativeGroupId"),
            key: "creativeGroupId",
            width:  120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    color: '#369'
                  },
                  on: {
                    click: () => this.showIconModel(params.row.icon)
                  }
                }, params.row.creativeGroupId)
              ])
            }
          },
          {
            title: this.$t("_offerId"),
            key: "offerId",
            width: 120,
            align: 'center'
          },
          {
            title: "Package",
            key: "package",
            width: 120,
            align: 'center'
          },
          {
            title: "Promoted App ID",
            key: "promotedAppId",
            width: 120,
            align: 'center'
          },
          {
            title: this.$t("_exchange"),
            key: "exchange",
            width: 100,
            align: 'center'
          },
          {
            title: this.$t("_adType"),
            key: "adType",
            width: 80,
            align: 'center'
          },
          {
            title: this.$t("_submitted"),
            key: "submitted",
            width: 120,
            align: 'center'
          },
          {
            title: "Status",
            key: "status",
            width: 100,
            align: 'center'
          },
          {
            title: this.$t("_reviewStatus"),
            key: "reviewStatus",
            width: 120,
            align: 'center'
          },
          {
            title: this.$t("_rejectReason"),
            key: "rejectReason",
            width: 500,
            align: 'center',
          }
        ],
        creativePage: {
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
        adTypeList: [
          {
            value: "1",
            label: "Banner"
          },
          {
            value: "2",
            label: "Interstitial"
          },
          {
            value: "3",
            label: "Native"
          },
          {
            value: "4",
            label: "Video-Instream"
          },
          {
            value: "5",
            label: "Video-Interstitial"
          },
          {
            value: "6",
            label: "Video-Rewarded"
          },
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
        ]
      }
    },
    created() {
      this.search();
    },
    methods: {
      search() {
        this.creativePageChange(1);
      },
      creativePageChange(pageNo) {
        let { creativeId, packagee, offerId, promotedAppId, exchangeCreativeId, exchange, adType, reviewStatus } = this.searchForm;
        qualificationResource.getAllCreative(
          creativeId,
          packagee,
          offerId,
          promotedAppId,
          exchangeCreativeId,
          exchange, adType,
          reviewStatus,
          pageNo - 1,
          10
        ).then(response => {
          console.log("responsedata", response.data);
          this.creativePage = response.data;
        })
      },
      exportToExcel() {
        console.log("导出到excel")
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/styles/common.less";
</style>
