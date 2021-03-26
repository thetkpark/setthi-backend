import express from 'express'
import morgan from 'morgan'

const app = express()

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

app.get('/ping', (req, res) => {
	res.send({
		message: 'pong'
	})
})

export default app
