import monggoose from "mongoose";
import Subscriber from "./subscriber.js";

const userSchema = Mongoose.Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            requred: true,
            Unique: true,
        },
        zipCode: {
            type: Number,
            min: [10000, "zipcode too short"],
            max: 99999
        },
        password: {
            type: String,
            required: true,
        },
        courses: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Course"}],
        subscriibedAccount: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Subscriber",
        },

        
    },
});
userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount === undefined) {
        subscriber
            .findOne({ email: user.email })
            .then((subscriber) => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch((error) => {
                console.log(`Error in connecting subscriber: ${error.message}`);
                next();
            });
    } else {
        next();
    }
});

export default monggooseongoose.model("User", userSchema);