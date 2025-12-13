import Mongoose from "mongoose";
const priceSchema = Mongoose.Schema({
    kind: {
        type:string,
        reuire: true,
        unique,
    },
    address: {
        type: String,
        required: true,
    },
    number_of_room: {
        type: Number,
        default: 0,
        min: [1, "Number of room must greater than zero"]
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "Price not have a negative number"]
    }

});

export default monggoose.model("price", priceSchema);