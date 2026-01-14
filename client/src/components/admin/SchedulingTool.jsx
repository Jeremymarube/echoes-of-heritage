// src/components/admin/SchedulingTool.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Badge from '../common/Badge';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { getPresentationType } from '../../utils/helpers';
import { TIME_SLOTS, CULTURE_WEEK_DATES } from '../../utils/constants';
import scheduleService from '../../services/scheduleService';
import presentationService from '../../services/presentationService';

const SchedulingTool = ({ presentation, onScheduled, onCancel }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conflicts, setConflicts] = useState([]);
  const [formData, setFormData] = useState({
    venue_id: '',
    date: '',
    start_time: '',
    end_time: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchVenues();
    // Pre-fill with preferred date/time if available
    if (presentation.preferred_day) {
      setFormData(prev => ({ ...prev, date: presentation.preferred_day }));
    }
    if (presentation.preferred_time) {
      setFormData(prev => ({ ...prev, start_time: presentation.preferred_time }));
      calculateEndTime(presentation.preferred_time, presentation.duration);
    }
  }, [presentation]);

  const fetchVenues = async () => {
    try {
      const data = await scheduleService.getVenues();
      setVenues(data);
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return;

    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration);
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    
    setFormData(prev => ({ ...prev, end_time: endTime }));
  };

  const checkConflicts = async () => {
    if (!formData.venue_id || !formData.date || !formData.start_time || !formData.end_time) {
      return;
    }

    try {
      const result = await scheduleService.checkConflict(
        formData.venue_id,
        formData.date,
        formData.start_time,
        formData.end_time
      );
      setConflicts(result.conflicts || []);
    } catch (error) {
      console.error('Failed to check conflicts:', error);
    }
  };

  useEffect(() => {
    if (formData.start_time) {
      calculateEndTime(formData.start_time, presentation.duration);
    }
  }, [formData.start_time]);

  useEffect(() => {
    checkConflicts();
  }, [formData.venue_id, formData.date, formData.start_time, formData.end_time]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.venue_id) {
      newErrors.venue_id = 'Please select a venue';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.start_time) {
      newErrors.start_time = 'Please select a start time';
    }

    if (conflicts.length > 0) {
      newErrors.conflicts = 'This time slot conflicts with another presentation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await presentationService.schedulePresentation(presentation.id, formData);
      onScheduled();
    } catch (error) {
      console.error('Failed to schedule presentation:', error);
      setErrors({ submit: error.message });
    }
  };

  const dateOptions = [];
  const startDate = new Date(CULTURE_WEEK_DATES.START);
  const endDate = new Date(CULTURE_WEEK_DATES.END);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    dateOptions.push({
      value: dateStr,
      label: d.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      })
    });
  }

  const venueOptions = venues.map(venue => ({
    value: venue.id,
    label: `${venue.name} (Capacity: ${venue.capacity})`
  }));

  const timeOptions = TIME_SLOTS.map(time => ({
    value: time,
    label: formatTime(time)
  }));

  const presentationType = getPresentationType(presentation.type);
  const selectedVenue = venues.find(v => v.id === parseInt(formData.venue_id));

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Schedule Presentation"
      size="lg"
    >
      <div className="space-y-6">
        {/* Presentation Info */}
        <Card>
          <div className="p-4 bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {presentation.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {presentation.presenter_name}
                </p>
                <div className="flex gap-2">
                  <Badge variant={presentation.type}>
                    {presentationType.icon} {presentationType.label}
                  </Badge>
                  <Badge variant="default">
                    <Clock className="w-3 h-3 mr-1" />
                    {presentation.duration} min
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scheduling Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Venue"
            name="venue_id"
            value={formData.venue_id}
            onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })}
            options={venueOptions}
            placeholder="Select a venue"
            error={errors.venue_id}
            required
          />

          {/* Venue Info */}
          {selectedVenue && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2 text-sm text-blue-800">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-medium">{selectedVenue.name}</p>
                  <p>Capacity: {selectedVenue.capacity} people</p>
                  {selectedVenue.equipment && selectedVenue.equipment.length > 0 && (
                    <p className="mt-1">
                      Equipment: {selectedVenue.equipment.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Select
            label="Date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            options={dateOptions}
            placeholder="Select a date"
            error={errors.date}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Start Time"
              name="start_time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              options={timeOptions}
              placeholder="Select time"
              error={errors.start_time}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                {formData.end_time ? formatTime(formData.end_time) : '--:-- --'}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Auto-calculated based on duration
              </p>
            </div>
          </div>

          {/* Conflict Warning */}
          {conflicts.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-800 mb-2">
                    Scheduling Conflict Detected
                  </p>
                  <p className="text-sm text-red-700">
                    This venue is already booked during this time slot. Please choose a different time or venue.
                  </p>
                  {conflicts.map((conflict, index) => (
                    <div key={index} className="mt-2 p-2 bg-red-100 rounded text-sm text-red-800">
                      <strong>{conflict.title}</strong> is scheduled from{' '}
                      {formatTime(conflict.start_time)} to {formatTime(conflict.end_time)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Success Preview */}
          {formData.venue_id && formData.date && formData.start_time && conflicts.length === 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 mb-1">
                    Ready to Schedule
                  </p>
                  <p className="text-sm text-green-700">
                    {presentation.title} will be scheduled for{' '}
                    <strong>{formatDate(formData.date)}</strong> from{' '}
                    <strong>{formatTime(formData.start_time)}</strong> to{' '}
                    <strong>{formatTime(formData.end_time)}</strong> at{' '}
                    <strong>{selectedVenue.name}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={conflicts.length > 0}
              fullWidth
            >
              Schedule Presentation
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SchedulingTool;