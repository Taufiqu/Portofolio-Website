// Real projects data for Muhammad Hafizh
// Each project represents actual work and provides case-study details

import project1 from '../assets/projects/1.webp';
import project2 from '../assets/projects/2.webp';
import project3 from '../assets/projects/3.webp';
import project4 from '../assets/projects/4.webp';

export const PROJECTS_DATA = [
  {
    id: "e-ult-saidata",
    title: "E-ULT Saidata",
    year: "2025 - Present",
    role: "Frontend Developer",
    image: project1, // Fallback/Reference
    tech: ["React.js", "Laravel", "PostgreSQL", "Tailwind CSS"],
    demoLink: "",
    githubLink: "",
    summary: "Configurable form builder engine for administrational digitisation in Universitas Lampung, enabling reuse of modular frontend interfaces.",
    problem: "Different university units required unique administrative forms. Building individual frontend views for every department resulted in massive codebase bloat, redundant code, and long deployment cycles.",
    context: "Developed as a digital transformation initiative for the Universitas Lampung administration, serving multiple departments and thousands of active users.",
    constraints: "Must integrate with a Laravel backend API, load schemas dynamically, and ensure forms maintain complete accessibility and validate complex input patterns at runtime.",
    approach: "Designed a schema-driven form renderer that consumes JSON configurations and renders inputs, validation rules, and conditional fields dynamically.",
    architecture: "A modular, schema-based UI rendering engine. Form specifications are declared in PostgreSQL, fetched via REST API, and parsed at runtime by a generic component builder. It separates data structure from display code.",
    outcome: "Reduced frontend form deployment times from weeks to minutes. Multiple units can launch custom administration flows without writing a single line of React code, decreasing repository footprint.",
    lessons: "Validating schema structures at design-time is essential to prevent runtime UI crashes. Clear separation of layout metadata and content is key to maintainability."
  },
  {
    id: "business-attrition",
    title: "Dashboard Business Attrition",
    year: "2024",
    role: "Full-Stack Developer",
    image: project1,
    tech: ["React.js", "Node.js", "Express", "Chart.js"],
    demoLink: "https://dashboard-business-attrition.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Dashboard_Business_Attrition_Vercel",
    summary: "Interactive predictive analytics dashboard visualizing employee and business attrition trends.",
    problem: "HR managers struggled to identify attrition risks early because raw telemetry data was distributed across legacy spreadsheets with no real-time analysis.",
    context: "Built to provide companies with visual insights into employee retention, sorting complex variables such as age, satisfaction, and work-life balance.",
    constraints: "The application had to run entirely on serverless edge runtimes, meaning data loading and charting operations had to be highly optimized to avoid rendering lag on mobile clients.",
    approach: "Developed a clean Single Page Application using React and Node.js. Used modern chart abstractions to visualize high-dimensional data without blocking the browser thread.",
    architecture: "Separated visualization components from data pipelines. Built a custom data-parser layer that normalizes raw analytics payloads before feeding them to Chart.js wrappers.",
    outcome: "Enabled HR stakeholders to filter and analyze attrition patterns across departments in real-time, reducing planning overhead for retention strategies.",
    lessons: "Client-side data processing is convenient but scales poorly. Moving statistical calculations to a dedicated Node API endpoint significantly improved dashboard responsiveness."
  },
  {
    id: "mental-health-predict",
    title: "System Predict Mental Health Diagnosis",
    year: "2023",
    role: "Machine Learning & Frontend Developer",
    image: project3,
    tech: ["React.js", "Python", "Flask", "Scikit-Learn"],
    demoLink: "https://mental-diagnose.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Sistem-Pakar-Diagnosa-Kesehatan-Mental",
    summary: "A web application that uses machine learning to predict mental health issues based on PHQ-9, PSS-10 and GAD-7 questionnaires.",
    problem: "Standard clinical questionnaires are often evaluated manually, leading to delay in preliminary guidance for depression, stress, and anxiety symptoms.",
    context: "Created as an academic project to bridge the gap between preliminary screening and accessible digital self-assessment toolsets.",
    constraints: "High accuracy threshold was required. The system needed to securely process user responses and run inferencing locally/serverless within milliseconds.",
    approach: "Combined normalized medical screening algorithms (PHQ-9, PSS-10, GAD-7) with a Scikit-Learn classification model served via a Flask REST endpoint.",
    architecture: "A decoupled architecture where the React frontend manages questionnaire states, sanitizes input, and POSTs to a python web service that returns prediction classifications.",
    outcome: "Enabled instant diagnostic scoring and machine learning prediction, providing users with immediate classification results and corresponding guidance.",
    lessons: "Medical classifications carry ethical weight. I learned to structure UX copy carefully to clearly indicate the app is an educational/assessment tool and not a replacement for clinical consulting."
  },
  {
    id: "cardiovascular-disease-predict",
    title: "Dashboard Cardiovascular Disease Prediction",
    year: "2023",
    role: "Machine Learning & Frontend Developer",
    image: project4,
    tech: ["React.js", "Python", "Flask", "Scikit-Learn"],
    demoLink: "https://dashboard-cardiovascular-predict.vercel.app/",
    githubLink: "https://github.com/Taufiqu/Dashboard_Cardiovascular_Predict",
    summary: "A web application that uses machine learning to predict cardiovascular disease risk based on clinical health parameters.",
    problem: "Health screening tools rarely show how individual health metrics (like blood pressure and cholesterol) influence predictive models.",
    context: "Designed to help users understand cardiovascular risk factors by exploring model inputs interactively.",
    constraints: "Needed a layout that cleanly balances user input forms with complex chart indicators on a single screen without overloading the user.",
    approach: "Designed a parameters form in React that dynamically feeds a classification model and updates risk percentages alongside interactive bar charts.",
    architecture: "React interface using clean hooks to control state, communicating with a Flask engine executing scikit-learn models on clinical datasets.",
    outcome: "Created a transparent predictive dashboard where users can tweak variables in real time and see changes in risk outcomes instantly.",
    lessons: "Making complex model features transparent to non-technical users requires careful information hierarchy. Less visual noise makes clinical outputs easier to trust."
  },
  {
    id: "waroeng-bebek-ngarasan",
    title: "Waroeng Bebek Ngarasan",
    year: "2024",
    role: "Frontend Developer",
    image: project2,
    tech: ["React.js", "Tailwind CSS"],
    demoLink: "https://www.kultsum.com/",
    githubLink: "https://github.com/Taufiqu/waroeng-bebek-ngarasan",
    summary: "A customized web interface for a restaurant brand, optimized for performance and responsiveness.",
    problem: "Local restaurant businesses often have websites that load slowly on mobile devices over poor cell networks, leading to loss of potential customers.",
    context: "A commercial brand redesign focusing on lightning-fast speed and clear layout structure for visual restaurant menu displays.",
    constraints: "Must load instantly on weak 3G networks and require minimal maintenance from the restaurant owner.",
    approach: "Designed a clean static layout with optimized image formats (WebP) and pure CSS/Tailwind responsiveness, removing external database dependencies.",
    architecture: "A highly optimized frontend build, utilizing static asset imports and minimal JavaScript payload to guarantee near-instant loading.",
    outcome: "Achieved a 98+ mobile performance score, delivering menu layouts and contact gateways with zero load lag.",
    lessons: "Simple content does not justify heavy framework complexity. Keeping data static and assets pre-compiled was the most maintainable choice."
  }
];