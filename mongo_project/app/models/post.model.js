const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
		
    content: {type: String, 
		required: true },
		
	imageURL: {type: String,
		default: null },
	
	userId: {type: Number, 
		min:1, 
		get: v => Math.round(v),
		set: v => Math.round(v) }
}, {
    timestamps: true,
	collection: 'posts'
});

module.exports = mongoose.model('Post', PostSchema);