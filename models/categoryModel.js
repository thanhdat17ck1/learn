const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        slug: {
            type: String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category