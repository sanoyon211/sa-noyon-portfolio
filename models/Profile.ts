import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    nameText: {
      type: String,
      default: "Md Sohab Akter Noyon",
    },
    headingText: {
      type: String,
      default: "Hi, I'm",
    },
    subheadingText: {
      type: String,
      default: "Full-Stack Web Developer | Specializing in MERN Stack & Next.js",
    },
    descriptionText: {
      type: String,
      default: "Passionate about building secure and creative web solutions using modern technologies.",
    },
    aboutTitle: {
      type: String,
      default: "About Me",
    },
    greeting: {
      type: String,
      default: "Hello! I'm Md Sohab Akter Noyon",
    },
    descriptionParagraphs: {
      type: [String],
      default: [
        "I'm a 22-year-old Computer Science student from Dinajpur, Bangladesh who enjoys building modern and responsive web applications. I love turning ideas into real working websites and continuously learning new tools to make my projects better. I'm focused on becoming a skilled Full-Stack Web Developer with expertise in the MERN Stack.",
        "I work with both front-end and back-end technologies, including React.js, Next.js, Node.js, Express.js, MongoDB, and JavaScript, to create robust and scalable web applications.",
        "When I'm not coding, I enjoy exploring new technologies and sharpening my design skills using Figma and Adobe Photoshop. I believe in always learning and staying updated with the latest trends in web development.",
      ],
    },
    infoCards: {
      type: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
      default: [
        { label: "Age", value: "22" },
        { label: "Location", value: "Bangladesh" },
      ],
    },
    resumeUrl: {
      type: String,
      default: "/SA_Noyon_Resume_Full_Stack_Developer.pdf",
    },
    resumeFilename: {
      type: String,
      default: "SA_Noyon_Resume_Full_Stack_Developer.pdf",
    },
    imageSrc: {
      type: String,
      default: "/images/sa-noyon.jpg",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
