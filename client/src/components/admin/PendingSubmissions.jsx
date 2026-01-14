// src/components/admin/PendingSubmissions.jsx
'use client';

import React, { useState } from 'react';
import SubmissionCard from './SubmissionCard';
import SearchBar from '../filters/SearchBar';
import LoadingSpinner from '../common/LoadingSpinner';
import { filterBySearchTerm } from '../../utils/helpers';

const PendingSubmissions = ({ 
  submissions, 
  onApprove, 
  onReject, 
  onSchedule,
  loading 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubmissions = filterBySearchTerm(
    submissions, 
    searchTerm, 
    ['title', 'presenter_name', 'type']
  );

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading submissions..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Pending Submissions ({submissions.length})
        </h2>
      </div>

      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
        placeholder="Search submissions..."
      />

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No submissions match your search' : 'No pending submissions'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map(submission => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onApprove={onApprove}
              onReject={onReject}
              onSchedule={onSchedule}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingSubmissions;