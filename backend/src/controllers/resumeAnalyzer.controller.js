const Resume = require('../models/Resume.model');
const ResumeAnalysis =
require('../models/ResumeAnalysis.model');

exports.analyzeResume =
async (req,res) => {

 try {

   const resume =
   await Resume.findOne({
     user:req.user.userId
   });

   if(!resume){
     return res.status(404).json({
       message:'Resume not found'
     });
   }

   const skillsFound = [
     'Python',
     'SQL',
     'Machine Learning',
     'Power BI'
   ];

   const missingSkills = [
     'TensorFlow',
     'Docker',
     'AWS'
   ];

   const suggestions = [
     'Add GitHub profile',
     'Add Certifications',
     'Add more Projects'
   ];

   const atsScore = 82;

   const analysis =
   await ResumeAnalysis.create({

      user:req.user.userId,

      resumeId:resume._id,

      atsScore,

      skillsFound,

      missingSkills,

      suggestions
   });

   res.json(analysis);

 } catch(error){

   res.status(500).json({
      message:error.message
   });

 }

};

exports.getAnalysis =
async(req,res)=>{

 try{

   const analysis =
   await ResumeAnalysis
   .findOne({
      user:req.user.userId
   })
   .sort({createdAt:-1});

   res.json(analysis);

 }catch(error){

   res.status(500).json({
      message:error.message
   });

 }

};