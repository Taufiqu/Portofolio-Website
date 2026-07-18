// Real technical notebook entries for Muhammad Hafizh

export const NOTES_DATA = [
  {
    id: "json-dynamic-forms",
    title: "Designing a JSON-Driven Dynamic Form Engine in React",
    date: "2025-05-10",
    tags: ["React.js", "Component Design", "E-ULT Saidata"],
    summary: "Architectural observations on separating form layout schemas from component implementations to reduce codebase bloat.",
    content: `When building forms for multiple administrative units in a large university system, hardcoding individual views scales poorly. At E-ULT Saidata, we resolved this by moving the layout structure to a database schema.

### The Strategy
We represent forms as JSON payloads containing input types, validation regexes, and conditional rendering flags:
\`\`\`json
{
  "id": "applicant_name",
  "type": "text",
  "label": "Full Name",
  "validation": { "pattern": "^[a-zA-Z ]{3,50}$", "required": true }
}
\`\`\`

### Component Separation
The React frontend loads this configuration and maps types to static atomic components. This means adding a form requires zero code deployments:
1. **Schema Parser**: Sanitizes the configuration input and registers elements.
2. **Context Provider**: Manages the consolidated validation states.
3. **Atomic Renderer**: Emits standard accessibility-compliant markup.

By decoupling UI representation from the structure, we reduced dynamic form latency and saved weeks of build time.`
  },
  {
    id: "edge-db-latency",
    title: "Optimizing Database Inference and Client Response Times",
    date: "2024-11-12",
    tags: ["System Design", "Node.js", "Performance"],
    summary: "Observations on resolving bottlenecking issues when moving analytical calculations from front-end to back-end endpoints.",
    content: `During the development of our Business Attrition Dashboard, we initially processed statistical aggregates directly on the client. As the datasets grew, rendering thread lockups occurred.

### Moving Calculations to the Server
We shifted aggregation computations to a Node.js/Express service. This allowed:
- Pre-compiling data aggregates.
- Utilizing optimized collection methods.
- Dropping client bundle size by removing heavy math utilities.

### Telemetry Benchmarks
- **Client Processing (10,000 rows)**: ~820ms blocking time (frame drop).
- **Node Backend Processing**: ~45ms database query time + 12ms payload transfer.

This migration taught us to value profiling and establish telemetry before deciding on state structures.`
  },
  {
    id: "ml-input-validation",
    title: "Securing Machine Learning Inference Pipelines on Flask REST Endpoints",
    date: "2023-08-25",
    tags: ["Python", "Flask", "Security", "Machine Learning"],
    summary: "How we implemented parameter sanitization bounds on classification inputs prior to Scikit-Learn prediction executions.",
    content: `Serving machine learning models on lightweight endpoints like Flask requires defensive input validation. When building the Mental Health Predictor system, we had to ensure model bounds were strictly enforced.

### Validation Bounds
- Input values for GAD-7 parameters must range strictly from 0 to 3.
- Numerical features must not contain non-numeric symbols, which would throw exceptions in numpy array reshaping.
- Invalid requests must be dropped at the gateway level before hitting the Scikit-Learn predictor.

### Flask Gateway Implementation
\`\`\`python
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Validate bounds
    for key in ['phq9', 'pss10', 'gad7']:
        val = data.get(key)
        if not isinstance(val, int) or not (0 <= val <= 3):
            return jsonify({'error': 'Invalid parameter range'}), 400
    
    # Process prediction
    ...
\`\`\`

Enforcing schema strictness at the entrypoint protects downstream python models from unexpected runtime exceptions.`
  }
];
