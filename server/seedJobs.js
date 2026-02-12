import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";

dotenv.config();

const jobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full Time",
    experience: "0-1 years",
    salary: "6 LPA",
    description: "Work with React and modern UI technologies.",
  },
  {
    title: "Backend Developer",
    company: "Amazon",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1-3 years",
    salary: "8 LPA",
    description: "Build APIs with Node.js and MongoDB.",
  },
  {
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Remote",
    type: "Full Time",
    experience: "0-2 years",
    salary: "10 LPA",
    description: "Work on both frontend and backend systems.",
  },
  {
    title: "React Developer",
    company: "Startup XYZ",
    location: "Chennai",
    type: "Internship",
    experience: "Fresher",
    salary: "15k/month",
    description: "Build UI using React.",
  },
  {
    title: "Node.js Developer",
    company: "Infosys",
    location: "Pune",
    type: "Full Time",
    experience: "1-2 years",
    salary: "5 LPA",
    description: "Create REST APIs using Express and MongoDB.",
  },
  {
    title: "UI Developer",
    company: "TCS",
    location: "Mumbai",
    type: "Full Time",
    experience: "0-1 years",
    salary: "4 LPA",
    description: "Convert designs into responsive web pages.",
  },
  {
    title: "MERN Stack Developer",
    company: "Tech Solutions",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
    salary: "12 LPA",
    description: "Build full stack apps using MERN stack.",
  },
  {
    title: "Software Engineer",
    company: "Wipro",
    location: "Bangalore",
    type: "Full Time",
    experience: "1-3 years",
    salary: "6.5 LPA",
    description: "General software development role.",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Job.deleteMany();
    await Job.insertMany(jobs);

    console.log("Jobs seeded successfully 🌱");
    process.exit();
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
};

seed();
