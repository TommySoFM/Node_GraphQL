const asyncRedis = require('async-redis')
const client = asyncRedis.createClient()
//{ host: 'redis-server', port: 6379}
const { Icon } = require('../../models/icon.model')

module.exports = {
    getBillboard: async (args, req) => {
        try {
            const redisResult = await client.zrevrange("icon", 0, args.number-1, "withscores")
            const rankItem = []
            for (let i=0; i < redisResult.length; i+=2){
                const icon = await Icon.findById(redisResult[i])
                const rankItemComponent = {
                    icon: icon,
                    rank: (i+2)/2,
                    score: redisResult[i+1]
                }
                rankItem.push(rankItemComponent)
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