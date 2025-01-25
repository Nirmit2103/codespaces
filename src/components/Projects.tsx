import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProjectForm from './ProjectForm';

export const Projects = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'AI Code Reviewer',
      description: 'An intelligent system that reviews pull requests and suggests improvements using machine learning.',
      categories: ['AI/ML', 'DevOps', 'Open Source'],
      teamSize: 5,
      currentMembers: 3
    },
    {
      id: '2',
      name: 'CodeCollab IDE',
      description: 'Real-time collaborative code editor with built-in video conferencing and pair programming features.',
      categories: ['Web Development', 'Education'],
      teamSize: 4,
      currentMembers: 2
    },
    {
      id: '3',
      name: 'Blockchain Auth System',
      description: 'Decentralized authentication protocol using blockchain technology for enhanced security.',
      categories: ['Blockchain', 'Cybersecurity'],
      teamSize: 3,
      currentMembers: 1
    }
  ]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Projects</h1>
        <button 
          onClick={() => setShowProjectForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass-card p-6 hover:transform hover:scale-105 transition-all">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                >
                  {category}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{project.currentMembers}/{project.teamSize} members</span>
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {showProjectForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <ProjectForm onClose={() => setShowProjectForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Projects; 