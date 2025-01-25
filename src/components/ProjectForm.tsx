import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../constants/projectCategories';

const categories = PROJECT_CATEGORIES;

interface Project {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  categories: string[];
  teamSize: number;
  currentMembers: number;
}

interface ProjectFormProps {
  onClose: () => void;
}

export default function ProjectForm({ onClose }: ProjectFormProps) {
  const [project, setProject] = useState({
    name: '',
    description: '',
    repoUrl: '',
    categories: [] as string[],
    teamSize: 1,
    currentMembers: 1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!project.name) newErrors.name = 'Project name is required';
    if (!project.description) newErrors.description = 'Description is required';
    if (!project.repoUrl.match(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+/)) {
      newErrors.repoUrl = 'Invalid GitHub repository URL';
    }
    if (project.categories.length === 0) newErrors.categories = 'Select at least one category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic here
      console.log('Project submitted:', project);
      onClose();
    }
  };

  return (
    <div className="glass-card p-6 mb-6 w-full max-w-2xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
      >
        <X size={24} />
      </button>
      <h3 className="text-xl font-bold mb-4">List a New Project</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({...project, name: e.target.value})}
            className="input-field"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={project.description}
            onChange={(e) => setProject({...project, description: e.target.value})}
            className="input-field h-32"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub Repository URL</label>
          <input
            type="url"
            value={project.repoUrl}
            onChange={(e) => setProject({...project, repoUrl: e.target.value})}
            className="input-field"
            placeholder="https://github.com/username/repo"
          />
          {errors.repoUrl && <p className="text-red-500 text-sm">{errors.repoUrl}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={project.categories.includes(category)}
                  onChange={(e) => {
                    const categories = e.target.checked
                      ? [...project.categories, category]
                      : project.categories.filter((c) => c !== category);
                    setProject({...project, categories});
                  }}
                  className="form-checkbox text-indigo-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
          {errors.categories && <p className="text-red-500 text-sm">{errors.categories}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Team Size (Maximum Members Needed)
          </label>
          <input
            type="number"
            min="1"
            value={project.teamSize}
            onChange={(e) => setProject({...project, teamSize: Math.max(1, parseInt(e.target.value))})}
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          List Project
        </button>
      </form>
    </div>
  );
} 