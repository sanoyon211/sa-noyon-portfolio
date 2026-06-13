import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this project.'],
      maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for this project.'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image url or path.'],
    },
    technologies: {
      type: [String],
      required: true,
      default: [],
    },
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    order: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
