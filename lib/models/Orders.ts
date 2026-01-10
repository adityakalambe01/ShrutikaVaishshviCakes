import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
	name: { type: String, required: true},
	email: { type: String, required: true},
	phone: { type: String, required: true},
	eventDate: { type: Date, required: true},
	numberOfGuests: { type: Number, required: false},
	cakeSizePreference: { type: String, required: false},
	cakeDesignDescription: { type: String, required: true},
	budget: { type: String, required: false},
	isDeleted: { type: Boolean, default: false}
},{timestamps: true})

export const Orders = mongoose.models.Orders || mongoose.model('Orders', ordersSchema)