import mongoose from 'mongoose'
import { MONGODB_URL } from '../config/config.js'

const url = MONGODB_URL

mongoose.connect(url)

const connection = mongoose.connection

connection.on('open', () => {
	console.log('Connected to MongoDB')
})

connection.on('error', (error) => {
	console.error('MongoDB connection error:', error)
})

connection.on('disconnected', () => {
	console.log('Disconnected from MongoDB')
})
