require('dotenv').config()
const { get } = require('http');
// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

mongoose.connect(`${process.env.MONGO_DB_URL}`)
  .then(() => console.log('Connected!'))
  .catch(err => console.error("Could not connect to mongodb",err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    data: {type: Date, default: Date.now},
    isPublished: Boolean

})

//class
const Course = mongoose.model("Course", courseSchema)
//crud > 1. insert into
const createCourse = async ()=> {


//object
const course = new Course({
    name: 'Node.js Course',
    author: 'Jonas',
    tags: ['Nodee', 'backend', `javascript`],
    isPublished: true
})

const result = await course.save();
console.log(result);
}
// createCourse()


// crud > 2. Select from
async function getCourses() {
    const myCourses = await Course.find();
    console.log(myCourses)
}
// getCourses();

// get filtered data
async function getFilteredCourses() {
    const courseFilter = await Course.find()
    // .find({ author: "Jonas"})
    // .limit(2)
    // .sort({name: 1})
    .select({name: 1, tags: 2})

    console.log(courseFilter)


}
// getFilteredCourses()


//update a doc
//first method approeach query first, findbyid, modify properties, save

async function updateCourses(id){
const updatecourse = await Course.findById(id);
if(!updatecourse) return;

// if (updatecourse.isPublished) return;

updatecourse.isPublished = true;
// updatecourse.author = "Another one";
updatecourse.tags = [`Nebera`, `Cia`, `Nieko`]
const result = await updatecourse.save();
console.log(result)
}

getCourses()
updateCourses("63e20592cb1218ba0b0f7dc9")
getCourses()