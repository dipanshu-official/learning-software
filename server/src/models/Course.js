import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  price: {
    type: Number,
    required: true
  },
  maxStudents: {
    type: Number,
    default: 30
  },
  category: {
    type: String,
    required: true
  },
  prerequisites: {
    type: String
  },
  objectives: {
    type: String
  },
  syllabus: {
    type: String
  },
  thumbnail: {
    type: String
  },
  introVideo: {
    type: String
  },
  courseVideos: [{
    type: String
  }],
  materials: [{
    type: String
  }]
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
