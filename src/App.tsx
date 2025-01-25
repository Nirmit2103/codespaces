import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Code2, Trophy, Users as UsersIcon, MessageSquare, Heart, Plus } from 'lucide-react';
import Navbar from './components/Navbar';
import Lounge from './components/Lounge';
import Profile from './components/Profile';
import ProfileCard from './components/ProfileCard';
import PerformanceGraph from './components/PerformanceGraph';
import FriendRequests from './components/FriendRequests';
import Auth from './components/Auth';
import { useUserStore } from './store/userStore';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import Tournaments from './components/Tournaments';
import { ErrorBoundary } from './components/ErrorBoundary';
import ProjectForm from './components/ProjectForm';
import { PROJECT_CATEGORIES } from './constants/projectCategories';
import Leaderboard from './components/Leaderboard';
import Dashboard from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import Projects from './components/Projects';
import { Navbar as CustomNavbar } from './components/Navbar';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  const { currentUser, friends } = useUserStore();
  const { setUser, user } = useAuthStore();
  const allUsers = currentUser ? [currentUser, ...friends] : friends;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const projectCategories = ['All', ...PROJECT_CATEGORIES];
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 ml-16">
          <CustomNavbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/lounge" element={<Lounge />} />
              {/* Catch all route - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;