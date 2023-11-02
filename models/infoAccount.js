const mongoose = require('mongoose')

const infoAccountSchema = mongoose.Schema(
    {
        link: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

const infoAccount = mongoose.model('infoAccount', infoAccountSchema)

module.exports = infoAccount