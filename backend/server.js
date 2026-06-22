require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require("path");


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  max: parseInt(process.env.RATE_LIMIT_MAX),
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

//mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
 // .then(() => console.log('MongoDB connected successfully'))
 // .catch(err => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const jobRoutes = require('./src/routes/job.routes');
const applicationRoutes = require('./src/routes/application.routes');
const resumeRoutes = require('./src/routes/resume.routes');
const aiRoutes = require('./src/routes/ai.routes');
const adminRoutes = require('./src/routes/admin.routes');
const analyticsRoutes = require('./src/routes/analytics.routes');
const notificationRoutes = require('./src/routes/notification.routes');
const savedJobRoutes =require('./src/routes/savedJob.routes');
const recruiterAnalyticsRoutes =require('./src/routes/recruiterAnalytics.routes');
const resumeAnalyzerRoutes =
require('./src/routes/resumeAnalyzer.routes');
const skillRoutes =
require('./src/routes/skill.routes');
const skillGapRoutes =
require('./src/routes/skillGap.routes');
const roadmapRoutes =
require('./src/routes/roadmap.routes');
const salaryRoutes = require('./src/routes/salary.routes');
const atsRoutes = require('./src/routes/ats.routes');
const interviewRoutes = require('./src/routes/interview.routes');
const chatbotRoutes =
require('./src/routes/chatbot.routes');
const learningRoutes =
require('./src/routes/learning.routes');
const companyRoutes =
require('./src/routes/company.routes');





app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills',skillGapRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/saved-jobs',savedJobRoutes);
app.use('/api/recruiter-analytics',recruiterAnalyticsRoutes);
app.use('/api/notifications',require('./src/routes/notification.routes'));
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
console.log("Uploads Path:",path.join(__dirname, "uploads"));
app.use('/api/resume-analyzer',resumeAnalyzerRoutes);
app.use('/api/skills',skillRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/interview', interviewRoutes);
app.use(
  '/api/chatbot',
  chatbotRoutes
);
app.use('/api/learning', learningRoutes);
app.use('/api/company', companyRoutes);

//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5004;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

module.exports = { app, io };
