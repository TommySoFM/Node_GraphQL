const asyncRedis = require('async-redis')
const client = asyncRedis.createClient()
const { Icon } = require('../../models/icon.model')

module.exports = {
    getBillboard: async (args, req) => {
        try {
            const rankList = await client.zrevrange("icon", 0, args.number-1, "withscores")
            const rankItem = []
            for (let i=0; i < rankList.length; i+=2){
                const icon = await Icon.findById(rankList[i])
                const component = {
                    icon: icon,
                    rank: (i+2)/2,
                    score: rankList[i+1]
                }
                rankItem.push(component)
            }
            const billboard = {
                rankItem: rankItem,
                timeStamp: new Date().toLocaleString()
            }
            return billboard
        } catch (error) {
            throw error
        }
    }
}