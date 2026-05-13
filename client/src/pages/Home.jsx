import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckSquare, LayoutDashboard, Shield, Zap } from 'lucide-react';

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* Background decoration */}
      <div className="absolute top-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 -translate-y-12 -translate-x-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 text-primary-600 font-medium mb-8 shadow-sm text-sm">
          <Zap className="w-4 h-4 text-yellow-500" />
          MERN Stack Practical Assignment
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Manage Tasks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Elegance</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          A beautifully designed, secure, and intuitive task management application built with MongoDB, Express, React, and Node.js.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
            Start Organizing
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            I have an account
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">CRUD Operations</h3>
            <p className="text-gray-600">Create, Read, Update, and Delete tasks efficiently with real-time feedback.</p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">JWT Authentication</h3>
            <p className="text-gray-600">Secure user registration and login with encrypted passwords and protected routes.</p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-600">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clean Dashboard</h3>
            <p className="text-gray-600">Filter, search, and manage your daily tasks on a responsive, beautiful interface.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
