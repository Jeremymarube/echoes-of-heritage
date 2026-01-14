// src/pages/MyDashboardPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import usePresentations from '../hooks/usePresentations';
import useNotifications from '../hooks/useNotifications';
import PresenterStats from '../components/dashboard/PresenterStats';
import SubmissionStatus from '../components/dashboard/SubmissionStatus';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import Button from '@/components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ToastContainer } from '../components/common/Toast';
import notificationService from '../services/notificationService';

const MyDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { presentations, loading, deletePresentation, refetch } = usePresentations();
  const { toasts, removeToast, showSuccess, showError } = useNotifications();
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  // Filter to show only user's presentations
  const myPresentations = presentations.filter(p => p.presenter_id === user?.id);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleEdit = (presentation) => {
    navigate('/register', { state: { presentation } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      await deletePresentation(id);
      showSuccess('Presentation deleted successfully');
      refetch();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      showSuccess('All notifications marked as read');
    } catch (error) {
      showError('Failed to mark notifications as read');
    }
  };

  if (loading || loadingNotifications) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="xl" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your Culture Week presentations and track their status
          </p>
        </div>

        {/* Quick Action */}
        <div className="mb-8">
          <Button
            icon={Plus}
            variant="primary"
            onClick={() => navigate('/register')}
          >
            Register New Presentation
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Presentations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <PresenterStats presentations={myPresentations} />

            {/* Presentations List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Submissions ({myPresentations.length})
              </h2>

              {myPresentations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-600 mb-4">
                    You haven't submitted any presentations yet.
                  </p>
                  <Button
                    icon={Plus}
                    variant="primary"
                    onClick={() => navigate('/register')}
                  >
                    Register Your First Presentation
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myPresentations.map(presentation => (
                    <SubmissionStatus
                      key={presentation.id}
                      presentation={presentation}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div className="lg:col-span-1">
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboardPage;