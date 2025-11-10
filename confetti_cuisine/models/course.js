import Mongoose from "mongoose";
const courseSchema = Mongoose.Schema({
    title: {
        type:string,
        reuire: true,
        unique,
    },
    description: {
        type: String,
        required: true,
    },
    maxStudents: {
        type: Number,
        default: 0,
        min: [0, "Course not negative"]
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Course not have a negative cost"]
    },
    timestamps: true,
});

export default monggoose.model("Course", courseSchema);