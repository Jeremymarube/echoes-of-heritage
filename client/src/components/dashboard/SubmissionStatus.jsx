// src/components/dashboard/SubmissionStatus.jsx
'use client';

import React from 'react';
import { Clock, MapPin, Calendar, Edit, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { getPresentationType } from '../../utils/helpers';
import { formatDate, formatTime } from '../../utils/dateUtils';

const SubmissionStatus = ({ presentation, onEdit, onDelete }) => {
  const presentationType = getPresentationType(presentation.type);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {presentation.title}
              </h3>
              <Badge variant={presentation.type}>
                {presentationType.icon} {presentationType.label}
              </Badge>
            </div>
            <Badge variant={presentation.status} size="md">
              {presentation.status.toUpperCase()}
            </Badge>
          </div>
          {presentation.status === 'pending' && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={Edit}
                onClick={() => onEdit(presentation)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => onDelete(presentation.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4">{presentation.description}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duration: {presentation.duration} minutes
          </div>

          {presentation.scheduled_date && presentation.scheduled_time && (
            <>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(presentation.scheduled_date)} at {formatTime(presentation.scheduled_time)}
              </div>
              {presentation.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {presentation.venue.name}
                </div>
              )}
            </>
          )}

          {presentation.status === 'pending' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⏳ Your submission is pending review. We'll notify you once it's been reviewed.
              </p>
            </div>
          )}

          {presentation.status === 'approved' && !presentation.scheduled_date && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                ✅ Your submission has been approved! We'll schedule it soon.
              </p>
            </div>
          )}

          {presentation.status === 'scheduled' && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                🎉 Your presentation is scheduled! See details above.
              </p>
            </div>
          )}

          {presentation.status === 'rejected' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium mb-1">
                ❌ Your submission was not approved
              </p>
              {presentation.rejection_reason && (
                <p className="text-red-700 text-sm">
                  Reason: {presentation.rejection_reason}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SubmissionStatus;