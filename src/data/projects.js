// Di sinilah Anda mengelola semua proyek Anda
// Cukup tambahkan objek baru ke array ini untuk menambahkan proyek baru
import project1 from '../assets/projects/1.webp';
import project2 from '../assets/projects/2.webp';
import project3 from '../assets/projects/3.webp';
import project4 from '../assets/projects/4.webp';

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Dashboard Business Attrition",
    image : project1,
    description: "A web-based dashboard application that visualizes business attrition data using interactive charts and graphs, also providing predictive analytics to identify potential attrition risks.",
    tech: ["React", "Node.js"],
    demoLink: "https://dashboard-business-attrition.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Dashboard_Business_Attrition_Vercel"
  },
  {
    id: 2,
    title: "Waroeng Bebek Ngarasan",
    image : project2,
    description: "A restaurant website built with React, featuring a menu, about us section, and contact information.",
    tech: ["React", "Node.js"],
    demoLink: "https://www.kultsum.com/",
    githubLink: "https://github.com/Taufiqu/waroeng-bebek-ngarasan"
  },
  {
    id: 3,
    title: "System Predict Mental Health Diagnosis",
    image : project3,
    description: "A web application that uses machine learning to predict mental health issues based on user input. Using PHQ-9, PSS-10 and GAD-7 questionnaires to assess depression, stress and anxiety levels.",
    tech: ["React", "Python", "ML", "Node.js"],
    demoLink: "https://mental-diagnose.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Sistem-Pakar-Diagnosa-Kesehatan-Mental"
  },
  {
    id: 4,
    title: "Dashboard Cardiovascular Disease Prediction",
    image : project4,
    description: "A web application that uses machine learning to predict cardiovascular disease based on user input. Using various features to assess the risk of cardiovascular disease.",
    tech: ["React", "Python", "ML", "Node.js"],
    demoLink: "https://dashboard-cardiovascular-predict.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Dashboard_Cardiovascular_Predict"
  },
  // Tambahkan proyek ke-4, ke-5, dst. di sini
];