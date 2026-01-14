// src/components/admin/SubmissionCard.jsx
'use client';

import React, { useState } from 'react';
import { Clock, MapPin, Users, Mail, Phone, CheckCircle, XCircle, Calendar } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { getPresentationType } from '../../utils/helpers';
import { formatDate, formatTime } from '../../utils/dateUtils';

const SubmissionCard = ({ submission, onApprove, onReject, onSchedule }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const presentationType = getPresentationType(submission.type);

  const handleApprove = async () => {
    await onApprove(submission.id);
    setShowDetails(false);
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    await onReject(submission.id, rejectReason);
    setShowRejectModal(false);
    setShowDetails(false);
  };

  return (
    <>
      <Card hover onClick={() => setShowDetails(true)}>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {submission.title}
                </h3>
                <Badge variant={submission.type}>
                  {presentationType.icon} {presentationType.label}
                </Badge>
                <Badge variant={submission.status}>
                  {submission.status}
                </Badge>
              </div>

              <p className="text-gray-600 mb-3">
                by <span className="font-medium">{submission.presenter_name}</span>
              </p>

              <p className="text-gray-700 mb-4 line-clamp-2">
                {submission.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {submission.duration} minutes
                </div>
                {submission.max_attendees && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Max {submission.max_attendees} attendees
                  </div>
                )}
                {submission.preferred_day && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Prefers {formatDate(submission.preferred_day)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="success"
                size="sm"
                icon={CheckCircle}
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove();
                }}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={XCircle}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRejectModal(true);
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Details Modal */}
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Submission Details"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{submission.title}</h3>
            <div className="flex gap-2 mb-4">
              <Badge variant={submission.type}>
                {presentationType.icon} {presentationType.label}
              </Badge>
              <Badge variant={submission.status}>{submission.status}</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{submission.description}</p>
          </div>

          {submission.cultural_background && (
            <div>
              <h4 className="font-semibold mb-2">Cultural Background</h4>
              <p className="text-gray-700">{submission.cultural_background}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Presenter</h4>
              <p className="text-gray-700">{submission.presenter_name}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Duration</h4>
              <p className="text-gray-700">{submission.duration} minutes</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                {submission.contact_email}
              </div>
              {submission.contact_phone && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" />
                  {submission.contact_phone}
                </div>
              )}
            </div>
          </div>

          {submission.equipment_needed && submission.equipment_needed.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Equipment Needed</h4>
              <div className="flex flex-wrap gap-2">
                {submission.equipment_needed.map(eq => (
                  <Badge key={eq} variant="default">{eq}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="success"
              icon={CheckCircle}
              onClick={handleApprove}
              fullWidth
            >
              Approve
            </Button>
            <Button
              variant="danger"
              icon={XCircle}
              onClick={() => setShowRejectModal(true)}
              fullWidth
            >
              Reject
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Submission"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Please provide a reason for rejecting this submission. This will be sent to the presenter.
          </p>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleReject}
              fullWidth
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubmissionCard;