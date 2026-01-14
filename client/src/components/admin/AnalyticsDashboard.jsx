// src/components/admin/AnalyticsDashboard.jsx
'use client';

import React from 'react';
import { Calendar, Users, TrendingUp, Award } from 'lucide-react';
import Card from '../common/Card';
import { groupByDate } from '../../utils/helpers';
import { PRESENTATION_TYPES } from '../../utils/constants';

const AnalyticsDashboard = ({ presentations }) => {
  const stats = {
    total: presentations.length,
    pending: presentations.filter(p => p.status === 'pending').length,
    approved: presentations.filter(p => p.status === 'approved').length,
    scheduled: presentations.filter(p => p.status === 'scheduled').length
  };

  const typeDistribution = PRESENTATION_TYPES.map(type => ({
    ...type,
    count: presentations.filter(p => p.type === type.value).length,
    percentage: ((presentations.filter(p => p.type === type.value).length / presentations.length) * 100).toFixed(0)
  })).filter(t => t.count > 0);

  const dateGroups = groupByDate(
    presentations.filter(p => p.scheduled_date),
    'scheduled_date'
  );

  const dailySchedule = Object.entries(dateGroups).map(([date, items]) => ({
    date,
    count: items.length
  }));

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <Card>
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
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Calendar} label="Total Submissions" value={stats.total} color="indigo" />
        <StatCard icon={Users} label="Pending Approval" value={stats.pending} color="orange" />
        <StatCard icon={TrendingUp} label="Approved" value={stats.approved} color="green" />
        <StatCard icon={Award} label="Scheduled" value={stats.scheduled} color="blue" />
      </div>

      {/* Type Distribution */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold">Presentation Types Distribution</h3>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            {typeDistribution.map(type => (
              <div key={type.value}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {type.icon} {type.label}
                  </span>
                  <span className="text-sm text-gray-600">
                    {type.count} ({type.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-${type.color}-500 h-2 rounded-full`}
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Daily Schedule Balance */}
      {dailySchedule.length > 0 && (
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">Daily Schedule Balance</h3>
          </Card.Header>
          <Card.Body>
            <div className="space-y-3">
              {dailySchedule.map(day => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{day.count} events</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${(day.count / Math.max(...dailySchedule.map(d => d.count))) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;