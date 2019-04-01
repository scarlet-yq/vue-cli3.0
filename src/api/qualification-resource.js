import axios from './config'

export default {
  // 获取所有的资质审核状态列表
  getAllPromotedApp: function (appName, promotedAppId, packagee, companyId, companyName, exchange, reviewStatus, page, size) {
    return axios.get('data/promoted.json')
  },
  // 获取所有的素材审核状态列表
  getAllCreative: function (creativeGroupId, packagee, offerId, promotedAppId, exchangeCreativeId, exchange, adType, reviewStatus, page, size) {
    return axios.get('data/creative.json')
  }
}
