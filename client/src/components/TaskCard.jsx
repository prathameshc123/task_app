import { Calendar, Clock, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`glass-card p-6 transition-all duration-300 ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <div className="flex gap-2 mt-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${
              isCompleted 
                ? 'bg-blue-100 text-blue-700 border-blue-200' 
                : 'bg-orange-100 text-orange-700 border-orange-200'
            }`}
            onClick={() => onToggleStatus(task._id, isCompleted ? 'Pending' : 'Completed')}
            >
              {task.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/edit-task/${task._id}`}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>
            {task.dueDate 
              ? new Date(task.dueDate).toLocaleDateString() 
              : 'No due date'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
