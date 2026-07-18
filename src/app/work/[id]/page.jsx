import React from 'react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { PROJECTS_DATA } from '../../../data/projects';
import TelemetryCounter from '../../../components/layout/TelemetryCounter';

// Generate static params for static site generation
export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

const PROJECT_DETAILS = {
  "e-ult-saidata": {
    diagram: `
+------------------------------------+
|   PostgreSQL Database              |
|   (Form Config JSON Schema)        |
+------------------------------------+
                 |
                 v [REST API Fetch]
+------------------------------------+
|   Laravel Backend Endpoint         |
|   (Authentication & Schema Auth)   |
+------------------------------------+
                 |
                 v [Dynamic JSON Payload]
+------------------------------------+
|   React Dynamic UI Engine          |
|   (Context & Schema Parser)        |
+------------------------------------+
                 |
                 v [Atomic Component Resolution]
+------------------------------------+
|   Static Form Fields               |
|   (TextInput, Checkbox, Select)    |
+------------------------------------+
`,
    code: `// Resolving dynamic atomic components from JSON schema inputs
const ATOMIC_FIELDS = {
  text: TextInput,
  select: SelectDropdown,
  checkbox: CheckboxInput,
  textarea: TextAreaInput,
};

export default function SchemaRenderer({ field, register, errors }) {
  const Component = ATOMIC_FIELDS[field.type];
  
  // Graceful fallback to avoid application rendering thread crashes
  if (!Component) {
    console.warn(\`Unsupported field type: \${field.type}\`);
    return null;
  }
  
  return (
    <Component 
      field={field} 
      register={register} 
      errors={errors} 
    />
  );
}`,
    codeExplanation: "By mapping schema keys directly to decoupled atomic components, we eliminate nested conditionals. Adding new input types only requires extending the mapping object, leaving existing form handlers untouched."
  },
  "business-attrition": {
    diagram: `
+----------------------------+
|   Raw Telemetry Datasets   |
+----------------------------+
              |
              v [Raw Stream]
+----------------------------+
|   Express API Controller   |
|   (Memory Map Aggregator)  |
+----------------------------+
              |
              v [Filtered JSON Data]
+----------------------------+
|   React Dashboard Thread   |
|   (Pure State UI)          |
+----------------------------+
              |
              v [No-block Rendering]
+----------------------------+
|   Chart.js / Canvas Views  |
+----------------------------+
`,
    code: `// Offloading statistical mapping computations to Node.js backend
app.get('/api/analytics/attrition-summary', async (req, res) => {
  const rawData = await db.fetchRawTelemetry();
  
  // Aggregate in-memory to prevent slow O(N) recalculations on the client
  const departmentAggregates = rawData.reduce((acc, row) => {
    acc[row.dept] = (acc[row.dept] || 0) + (row.left ? 1 : 0);
    return acc;
  }, {});
  
  res.json({
    timestamp: Date.now(),
    data: departmentAggregates
  });
});`,
    codeExplanation: "Shifting computational operations away from the browser context prevents freezing the client UI rendering thread during massive dataset sweeps."
  },
  "mental-health-predict": {
    diagram: `
+------------------------------------+
|   React Questionnaire Components   |
|   (State Collection PHQ-9)         |
+------------------------------------+
                 |
                 v [Sanitized Payload]
+------------------------------------+
|   Flask Endpoint (Validation Gate)  |
|   (Strict Bounds Verification)     |
+------------------------------------+
                 |
                 v [NumPy Reshaping Path]
+------------------------------------+
|   Scikit-Learn Predictor Thread    |
|   (Model Classifier Run)           |
+------------------------------------+
`,
    code: `# Enforcing strict data bounds at Flask gateway before inference runs
@app.route('/predict', methods=['POST'])
def predict_score():
    data = request.json
    
    # Enforce constraints strictly: PHQ-9 parameters must fit [0, 3]
    for metric in ['phq9', 'pss10', 'gad7']:
        score = data.get(metric)
        if not isinstance(score, int) or not (0 <= score <= 3):
            return jsonify({'status': 'invalid_payload_bounds'}), 400
            
    # Safe to convert and shape into inference array
    model_input = np.array([data['phq9'], data['pss10'], data['gad7']]).reshape(1, -1)
    prediction = model.predict(model_input)
    return jsonify({'result': int(prediction[0])})`,
    codeExplanation: "Validating input ranges defensively prevents Numpy reshape functions from throwing exceptions, insulating the Flask inference thread from crash inputs."
  },
  "cardiovascular-disease-predict": {
    diagram: `
+------------------------------------+
|   User Param Form Inputs           |
+------------------------------------+
                 |
                 v [Fast state onChange hook]
+------------------------------------+
|   React Parameter Hooks            |
|   (Consolidated Inputs)            |
+------------------------------------+
                 |
                 v [Inference Request]
+------------------------------------+
|   Flask Model inference            |
|   (Sub-5ms Inference Returns)      |
+------------------------------------+
`,
    code: `// Custom React Hook to batch parameter updates and prevent re-render thrashing
export function useParamState(initialValues) {
  const [params, setParams] = useState(initialValues);
  
  const updateParam = useCallback((key, value) => {
    setParams(prev => {
      // Trigger update only when values actually change
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);
  
  return [params, updateParam];
}`,
    codeExplanation: "Batching component state updates prevents browser layout calculation thrashing, enabling responsive chart rendering during parameter adjustments."
  },
  "waroeng-bebek-ngarasan": {
    diagram: `
+-----------------------------------+
|   Static Web Assets / Text JSON   |
+-----------------------------------+
                 |
                 v [Pre-compile Compile step]
+-----------------------------------+
|   React Static Generation (SSG)   |
+-----------------------------------+
                 |
                 v [Single bundle output]
+-----------------------------------+
|   Global CDN Edge Distribution    |
+-----------------------------------+
`,
    code: `// Using static layout mapping without client database lookups
export const MENU_ITEMS = [
  { id: 'duck_special', name: 'Bebek Ngarasan', price: 42000, category: 'main' },
  { id: 'iced_tea', name: 'Es Teh Manis', price: 5000, category: 'beverage' }
];

export default function MenuList() {
  // Pre-compiled map yields zero dynamic layout recalculation lags
  return (
    <div className="grid grid-cols-1 gap-4">
      {MENU_ITEMS.map(item => (
        <MenuRow key={item.id} item={item} />
      ))}
    </div>
  );
}`,
    codeExplanation: "Compiling variables as static objects at build time saves bundle footprints, giving faster first-contentful-paint speeds on slow devices."
  }
};

export default async function ProjectCaseStudy({ params }) {
  const { id } = await params;
  const project = PROJECTS_DATA.find((p) => p.id === id);
  const details = PROJECT_DETAILS[id];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25 pt-32 px-6">
        <Navbar />
        <div className="max-w-[1100px] mx-auto text-center py-20 flex flex-col gap-6 items-center">
          <span className="font-mono text-xs text-[#2563EB]">ERROR // 404</span>
          <h1 className="font-geist text-3xl font-bold text-[#FAFAFA]">Case Study Not Found</h1>
          <Link href="/" className="text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:text-[#2563EB] border border-zinc-800 bg-[#18181B] px-5 py-3 rounded-sm">
            ← Return to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#A1A1AA] flex flex-col justify-between font-inter selection:bg-[#2563EB]/25">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 section-padding">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-12">
          {/* Back link */}
          <div>
            <Link 
              href="/#work" 
              className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#FAFAFA] interactive-transition"
            >
              <span>←</span> Back to Work
            </Link>
          </div>

          {/* Banner Layout */}
          <div className="border-b border-[#27272A] pb-10 flex flex-col gap-4">
            <h1 className="font-geist text-4xl sm:text-6xl font-extrabold tracking-tighter text-[#FAFAFA] leading-none">
              {project.title}
            </h1>
            <p className="font-inter text-lg text-[#FAFAFA] font-light max-w-[680px] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Case Study Story (Asymmetric Grid) */}
          <div className="asymmetric-grid">
            {/* Left Column: Metadata & Action Links Panel */}
            <div className="flex flex-col gap-6 md:border-r md:border-[#27272A] md:pr-8 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Role</span>
                <span className="text-sm font-medium text-[#FAFAFA]">{project.role}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Period</span>
                <span className="text-sm font-medium text-[#FAFAFA]">{project.year}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Stack</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] bg-[#18181B] border border-[#27272A] px-2 py-0.5 rounded-sm text-[#FAFAFA]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core CTA Action Buttons */}
              {(project.demoLink || project.githubLink) && (
                <div className="flex flex-col gap-3 pt-6 border-t border-[#27272A] w-full">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-[#2563EB] bg-[#2563EB]/10 text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:bg-[#2563EB] py-3 rounded-sm interactive-transition select-none text-center cursor-pointer"
                    >
                      Live Application
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-zinc-800 bg-[#18181B] text-xs font-semibold uppercase tracking-wider text-[#FAFAFA] hover:border-zinc-700 py-3 rounded-sm interactive-transition select-none text-center cursor-pointer"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Case Study Screenshot & Narrative */}
            <div className="flex flex-col gap-12 items-start w-full">
              {/* Project Image Showcase */}
              {project.image && (
                <div className="w-full overflow-hidden border border-[#27272A] bg-[#18181B] rounded-sm aspect-[16/9] select-none">
                  <img 
                    src={project.image.src || project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 interactive-transition duration-500"
                    loading="eager"
                  />
                </div>
              )}

              {/* Context */}
              {project.context && (
                <div className="flex flex-col gap-3 w-full">
                  <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Context</h2>
                  <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                    {project.context}
                  </p>
                </div>
              )}

              {/* Problem */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">The Problem</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.problem}
                </p>
              </div>

              {/* Structured Constraint Callout Box */}
              {project.constraints && (
                <div className="w-full border border-[#27272A] bg-[#18181B] p-8 rounded-sm max-w-[640px] my-4 select-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#2563EB] block mb-3 font-semibold">
                    System Constraint
                  </span>
                  <p className="font-inter text-sm leading-relaxed text-[#FAFAFA] font-light">
                    {project.constraints}
                  </p>
                </div>
              )}

              {/* Approach & Architecture with Diagram */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Approach & Architecture</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px] mb-4">
                  {project.approach}
                </p>
                
                {/* Monochrome architecture diagram */}
                {details?.diagram && (
                  <div className="bg-[#18181B] border border-[#27272A] p-6 rounded-sm w-full max-w-[640px] font-mono text-[10px] overflow-x-auto text-zinc-400 select-none leading-normal">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-4">SYSTEM_ARCHITECTURE_MAP // MONOCHROME</span>
                    <pre><code>{details.diagram}</code></pre>
                  </div>
                )}
              </div>

              {/* Implementation Examples with Annotated Code Snippets */}
              {details?.code && (
                <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                  <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Implementation</h2>
                  <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px] mb-4">
                    {details.codeExplanation}
                  </p>
                  <div className="bg-[#18181B] border border-[#27272A] p-5 rounded-sm w-full max-w-[640px] font-mono text-xs overflow-x-auto text-zinc-300">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-3">ANNOTATED_CODE_SNIPPET</span>
                    <pre><code>{details.code}</code></pre>
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Outcome</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.outcome}
                </p>
              </div>

              {/* Lessons */}
              <div className="flex flex-col gap-3 w-full border-t border-[#27272A] pt-6 pb-8">
                <h2 className="font-geist text-lg font-bold text-[#FAFAFA] tracking-tight">Lessons Learned</h2>
                <p className="font-inter text-sm leading-relaxed text-[#A1A1AA] max-w-[640px]">
                  {project.lessons}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Designed Ending for inner pages */}
        <div className="max-w-[1100px] mx-auto border-t border-[#27272A] pt-12 mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB]">
              Designed for longevity.
            </span>
            <span className="hidden sm:inline text-zinc-800">/</span>
            <TelemetryCounter />
          </div>
          <span className="font-mono text-[10px] text-zinc-500">
            Taufiqu © 2026.
          </span>
        </div>
      </main>
    </div>
  );
}
