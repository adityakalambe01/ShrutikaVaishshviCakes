import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	phone: {type: String, required: false},
	subject: {type: String, required: true},
	message: {type: String, required: true},
	isRead: {type: Boolean, default: false},
	isStarred: {type: Boolean, default: false}
}, {timestamps: true});

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);