// src/pages/AdminDashboardPage.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, BarChart3 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import usePresentations from '../hooks/usePresentations';
import useNotifications from '../hooks/useNotifications';
import PendingSubmissions from '../components/admin/PendingSubmissions';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import { ToastContainer } from '../components/common/Toast';
import presentationService from '../services/presentationService';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { presentations, loading, refetch } = usePresentations();
  const { toasts, removeToast, showSuccess, showError } = useNotifications();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const pendingPresentations = presentations.filter(p => p.status === 'pending');
  const approvedPresentations = presentations.filter(p => p.status === 'approved');
  const scheduledPresentations = presentations.filter(p => p.status === 'scheduled');
  const rejectedPresentations = presentations.filter(p => p.status === 'rejected');

  const handleApprove = async (id) => {
    try {
      await presentationService.approvePresentation(id);
      showSuccess('Presentation approved successfully');
      refetch();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await presentationService.rejectPresentation(id, reason);
      showSuccess('Presentation rejected');
      refetch();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleSchedule = async (id, scheduleData) => {
    try {
      await presentationService.schedulePresentation(id, scheduleData);
      showSuccess('Presentation scheduled successfully');
      refetch();
    } catch (error) {
      showError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="xl" text="Loading admin dashboard..." />
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
    <Card hover onClick={onClick}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage Culture Week presentations and approvals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FileText}
            label="Total Submissions"
            value={presentations.length}
            color="indigo"
            onClick={() => setActiveTab('overview')}
          />
          <StatCard
            icon={LayoutDashboard}
            label="Pending Approval"
            value={pendingPresentations.length}
            color="orange"
            onClick={() => setActiveTab('pending')}
          />
          <StatCard
            icon={Calendar}
            label="Scheduled"
            value={scheduledPresentations.length}
            color="blue"
            onClick={() => setActiveTab('overview')}
          />
          <StatCard
            icon={BarChart3}
            label="Analytics"
            value="View"
            color="green"
            onClick={() => setActiveTab('analytics')}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={activeTab === 'overview' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({pendingPresentations.length})
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/schedule')}
          >
            View Full Schedule
          </Button>
        </div>

        {/* Content Area */}
        <div>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold">Quick Overview</h2>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Status Breakdown</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span className="text-sm font-medium">Pending</span>
                          <span className="text-lg font-bold text-orange-600">
                            {pendingPresentations.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">Approved</span>
                          <span className="text-lg font-bold text-green-600">
                            {approvedPresentations.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm font-medium">Scheduled</span>
                          <span className="text-lg font-bold text-blue-600">
                            {scheduledPresentations.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="text-sm font-medium">Rejected</span>
                          <span className="text-lg font-bold text-red-600">
                            {rejectedPresentations.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button
                          variant="primary"
                          fullWidth
                          onClick={() => setActiveTab('pending')}
                        >
                          Review Pending Submissions ({pendingPresentations.length})
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => navigate('/schedule')}
                        >
                          Manage Schedule
                        </Button>
                        <Button
                          variant="outline"
                          fullWidth
                          onClick={() => setActiveTab('analytics')}
                        >
                          View Analytics
                        </Button>
                        <Button
                          variant="secondary"
                          fullWidth
                          onClick={() => window.print()}
                        >
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {pendingPresentations.length > 0 && (
                <Card>
                  <Card.Header>
                    <h2 className="text-xl font-bold">
                      Recent Pending Submissions
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="space-y-3">
                      {pendingPresentations.slice(0, 3).map(presentation => (
                        <div 
                          key={presentation.id}
                          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                          onClick={() => setActiveTab('pending')}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {presentation.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                by {presentation.presenter_name}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(presentation.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {pendingPresentations.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button
                          variant="ghost"
                          onClick={() => setActiveTab('pending')}
                        >
                          View all {pendingPresentations.length} pending submissions
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'pending' && (
            <PendingSubmissions
              submissions={pendingPresentations}
              onApprove={handleApprove}
              onReject={handleReject}
              onSchedule={handleSchedule}
              loading={loading}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard presentations={presentations} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;