import { Plugin } from '@nuxt/types'
import { NuxtApiInstance } from '@/types/api'

const VERSION = '1.1.0'

const apiPlugin: Plugin = (ctx, inject) => {
  const api: NuxtApiInstance = {
    getPrices: () => ctx.$axios.get('https://api.raydium.io/v1/main/price'),
    getInfo: () => ctx.$axios.get('https://api.raydium.io/info'),
    getPairs: () => ctx.$axios.get('https://api.raydium.io/pairs'),
    getConfig: () => ctx.$axios.get('https://api.raydium.io/config', { params: { v: VERSION } }),
    getEpochInfo: (rpc: string) => ctx.$axios.post(rpc, { jsonrpc: '2.0', id: 1, method: 'getEpochInfo' }),
    getCompaign: ({ campaignId = 2, address, referral }) =>
      ctx.$axios.get(`https://api.raydium.io/campaign/${campaignId}`, { params: { address, referral } }),
    postCompaign: ({ campaignId = 2, address, task, result = '', sign = '' }) =>
      ctx.$axios.post(`https://api.raydium.io/campaign/${campaignId}`, { address, task, result, sign }),
    getCompaignWinners: ({ campaignId }) => ctx.$axios.get(`https://api.raydium.io/campaign-winner/${campaignId}`)
  }

  ctx.$api = api
  inject('api', api)
}

export default apiPlugin
