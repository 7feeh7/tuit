import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from '@adapters/http/routes/userRoutes'
import postRoutes from '@adapters/http/routes/postRoutes'

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(express.json())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

export default app
