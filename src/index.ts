import app from './app'

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log(`Running on ${port}`)
})
