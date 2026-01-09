import mongoose from 'mongoose'


const ordersSchema = new mongoose.Schema({


},{timestamps: true})

export const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema)