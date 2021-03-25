import express from 'express'

const app = express()

app.get('/ping', (req, res) => {
	res.send({
		message: 'pong'
	})
})

export default app
