import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
	name: { type: String, required: true},
	email: { type: String, required: true},
	phone: { type: String, required: true},
	eventDate: { type: Date, required: true},
	numberOfGuests: { type: Number, required: true},
	cakeSizePreference: { type: String, required: true},
	cakeDesignDescription: { type: String, required: true},
	budget: { type: String, required: true},
	isDeleted: { type: Boolean, default: false}
},{timestamps: true})

export const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema)