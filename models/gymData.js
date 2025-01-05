import { Schema, model, models } from 'mongoose';

const userDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String, // Use String to accommodate leading zeros
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Ensures exactly 10 digits
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: "N/A"
    },
    packageName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    }
})

const userData = models.userData || model('userData', userDataSchema)

export default userData