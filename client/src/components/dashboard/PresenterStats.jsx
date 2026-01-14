// src/components/dashboard/PresenterStats.jsx
'use client';

import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';

const PresenterStats = ({ presentations }) => {
  const stats = {
    total: presentations.length,
    pending: presentations.filter(p => p.status === 'pending').length,
    approved: presentations.filter(p => p.status === 'approved').length,
    rejected: presentations.filter(p => p.status === 'rejected').length,
    scheduled: presentations.filter(p => p.status === 'scheduled').length
  };

  const StatItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
    </div>
  );

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Your Submissions Overview</h3>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatItem icon={FileText} label="Total Submissions" value={stats.total} color="indigo" />
          <StatItem icon={Clock} label="Pending Review" value={stats.pending} color="orange" />
          <StatItem icon={CheckCircle} label="Approved" value={stats.approved} color="green" />
          <StatItem icon={XCircle} label="Rejected" value={stats.rejected} color="red" />
        </div>
        {stats.scheduled > 0 && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              🎉 {stats.scheduled} of your presentations {stats.scheduled === 1 ? 'is' : 'are'} scheduled!
            </p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PresenterStats;