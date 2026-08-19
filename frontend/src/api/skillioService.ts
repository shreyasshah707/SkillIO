const BASE_URL = 'http://localhost:8000';

// 1. Health check to test connection
export const checkBackendHealth = async () => {
  const response = await fetch(`${BASE_URL}/health`);
  if (!response.ok) throw new Error(`Health check failed: ${response.status}`);
  return response.json();
};

// 2. Upload syllabus to app_pipeline
export const analyzeSyllabus = async (file: File, roleChoice: string = 'Data Scientist') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('role_choice', roleChoice);

  const response = await fetch(`${BASE_URL}/analyze/syllabus`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error(`Syllabus analysis failed: ${response.status}`);
  return response.json();
};

// 3. Trigger quiz generator
export const fetchQuiz = async () => {
  const response = await fetch(`${BASE_URL}/quiz/generate`, {
    method: 'POST',
  });

  if (!response.ok) throw new Error(`Quiz generation failed: ${response.status}`);
  return response.json();
};