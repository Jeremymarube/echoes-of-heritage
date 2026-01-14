// src/components/admin/VenueManager.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Users, Plus, Edit, Trash2, CheckCircle, Wrench } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Badge from '../common/Badge';
import LoadingSpinner from '../common/LoadingSpinner';
import scheduleService from '../../services/scheduleService';

const VenueManager = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
    equipment: [],
    is_accessible: true
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchVenues();
  }, []);

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

  const handleOpenModal = (venue = null) => {
    if (venue) {
      setEditingVenue(venue);
      setFormData({
        name: venue.name,
        capacity: venue.capacity,
        location: venue.location || '',
        equipment: venue.equipment || [],
        is_accessible: venue.is_accessible
      });
    } else {
      setEditingVenue(null);
      setFormData({
        name: '',
        capacity: '',
        location: '',
        equipment: [],
        is_accessible: true
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVenue(null);
    setFormData({
      name: '',
      capacity: '',
      location: '',
      equipment: [],
      is_accessible: true
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Venue name is required';
    }

    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = 'Valid capacity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingVenue) {
        // Update venue logic would go here
        console.log('Update venue:', formData);
      } else {
        // Create venue logic would go here
        console.log('Create venue:', formData);
      }
      handleCloseModal();
      fetchVenues();
    } catch (error) {
      console.error('Failed to save venue:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) {
      return;
    }

    try {
      // Delete venue logic would go here
      console.log('Delete venue:', id);
      fetchVenues();
    } catch (error) {
      console.error('Failed to delete venue:', error);
    }
  };

  const toggleEquipment = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const equipmentOptions = [
    'Projector',
    'Microphone',
    'Sound System',
    'Stage',
    'Tables',
    'Chairs',
    'Whiteboard',
    'TV Screen'
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading venues..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Venue Management</h2>
        <Button icon={Plus} onClick={() => handleOpenModal()}>
          Add Venue
        </Button>
      </div>

      {venues.length === 0 ? (
        <Card>
          <div className="p-12 text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">No venues configured yet.</p>
            <Button icon={Plus} onClick={() => handleOpenModal()}>
              Add Your First Venue
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Card key={venue.id} hover>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {venue.name}
                    </h3>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenModal(venue)}
                      className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(venue.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      Capacity: <strong>{venue.capacity}</strong> people
                    </span>
                  </div>

                  {venue.location && (
                    <div className="text-sm text-gray-600">
                      <strong>Location:</strong> {venue.location}
                    </div>
                  )}

                  {venue.is_accessible && (
                    <Badge variant="success" size="sm">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Wheelchair Accessible
                    </Badge>
                  )}

                  {venue.equipment && venue.equipment.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
                        <Wrench className="w-4 h-4" />
                        Equipment:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {venue.equipment.map((eq) => (
                          <Badge key={eq} variant="default" size="sm">
                            {eq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Venue Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingVenue ? 'Edit Venue' : 'Add New Venue'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Venue Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Main Auditorium"
            error={errors.name}
            required
          />

          <Input
            label="Capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="e.g., 500"
            error={errors.capacity}
            required
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Building A, 2nd Floor"
            helperText="Optional: Provide directions or building info"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Equipment
            </label>
            <div className="grid grid-cols-2 gap-2">
              {equipmentOptions.map((equipment) => (
                <label
                  key={equipment}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_accessible}
                onChange={(e) => setFormData({ ...formData, is_accessible: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Wheelchair Accessible
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              {editingVenue ? 'Update Venue' : 'Add Venue'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VenueManager;