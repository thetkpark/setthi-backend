import * as NodeCache from 'node-cache'

export const nodeCache = new NodeCache({
	stdTTL: 300,
	checkperiod: 60,
	deleteOnExpire: true,
})
