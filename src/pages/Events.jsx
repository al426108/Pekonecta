
import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);

    // Simple form state for demo
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', date: '', location: '', description: '' });

    const fetchEvents = () => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        setShowModal(false);
        setFormData({ title: '', date: '', location: '', description: '' });
        fetchEvents();
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Eventos</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    <Plus size={20} />
                    Nuevo Evento
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-bg-card border border-gray-800 rounded-2xl p-6 hover:border-accent/50 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-900/20 text-purple-400 rounded-xl">
                                <Calendar size={24} />
                            </div>
                            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-lg">
                                {new Date(event.date).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-text-muted text-sm mb-4 line-clamp-2">{event.description}</p>

                        {event.location && (
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-auto pt-4 border-t border-gray-800">
                                <MapPin size={16} />
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Nuevo Evento</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" required />
                            <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" required />
                            <input placeholder="Ubicación" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" />
                            <textarea placeholder="Descripción" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white h-24" />
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="text-gray-400">Cancelar</button>
                                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
