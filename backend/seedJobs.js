require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./src/models/Job.model');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {

  await Job.deleteMany({});

  await Job.insertMany([
    {
      title: "Software Engineer",
      company: {
        name: "Infosys",
        website: "https://infosys.com"
      },
      location: {
        city: "Bangalore",
        state: "Karnataka"
      },
      workMode: "Hybrid",
      employmentType: "Full Time",
      salary: {
        min: 400000,
        max: 700000
      },
      skills: ["Java", "Spring Boot", "SQL"],
      description: "Software development and maintenance."
    },
    {
      title: "Frontend Developer",
      company: {
        name: "TCS",
        website: "https://tcs.com"
      },
      location: {
        city: "Hyderabad",
        state: "Telangana"
      },
      workMode: "Remote",
      employmentType: "Full Time",
      salary: {
        min: 500000,
        max: 900000
      },
      skills: ["React", "JavaScript", "HTML", "CSS"],
      description: "Develop modern web applications."
    },
    {
      title: "Data Analyst",
      company: {
        name: "Wipro"
      },
      location: {
        city: "Chennai",
        state: "Tamil Nadu"
      },
      workMode: "On-site",
      employmentType: "Full Time",
      salary: {
        min: 450000,
        max: 800000
      },
      skills: ["Python", "SQL", "Power BI"],
      description: "Analyze and visualize business data."
    },
    {
      title: "AI/ML Engineer",
      company: {
        name: "Accenture"
      },
      location: {
        city: "Pune",
        state: "Maharashtra"
      },
      workMode: "Hybrid",
      employmentType: "Full Time",
      salary: {
        min: 800000,
        max: 1500000
      },
      skills: ["Python", "TensorFlow", "Machine Learning"],
      description: "Build AI solutions."
    },
    {
      title: "Full Stack Developer",
      company: {
        name: "Capgemini"
      },
      location: {
        city: "Bangalore",
        state: "Karnataka"
      },
      workMode: "Remote",
      employmentType: "Full Time",
      salary: {
        min: 600000,
        max: 1200000
      },
      skills: ["React", "Node.js", "MongoDB"],
      description: "Build end-to-end web applications."
    }
  ]);

  console.log("Jobs inserted successfully");
  process.exit();

})
.catch(err => {
  console.error(err);
});