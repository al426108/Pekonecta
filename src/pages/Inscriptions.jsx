
import React, { useEffect, useState } from 'react';
import { Search, Plus } from 'lucide-react';
import ParticipantsTable from '../components/Dashboard/ParticipantsTable';

const Inscriptions = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        medicalInfo: 'Ninguna',
        status: 'Pendiente',
        groupId: ''
    });

    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [partsRes, groupsRes] = await Promise.all([
                fetch('/api/participants'),
                fetch('/api/groups')
            ]);

            const partsData = await partsRes.json();
            const groupsData = await groupsRes.json(); // Need to implement this endpoint

            setParticipants(partsData);
            setGroups(groupsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/participants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                setFormData({ name: '', medicalInfo: 'Ninguna', status: 'Pendiente', groupId: '' });
                fetchData(); // Refresh list
            } else {
                alert('Error creating participant');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-1">Inscripciones</h2>
                    <p className="text-text-muted">Gestiona los participantes del campamento</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    <Plus size={20} />
                    Nueva Inscripción
                </button>
            </div>

            <div className="bg-bg-card rounded-2xl border border-gray-800 p-4">
                {/* Search Bar (Reused logic ideally) */}
                <div className="mb-4 relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full bg-bg-dark border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-accent"
                    />
                </div>

                {loading ? <div className="text-white text-center p-8">Cargando...</div> : <ParticipantsTable data={participants} />}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Nueva Inscripción</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Nombre Completo</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white focus:border-accent outline-none" required />
                            </div>
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Grupo</label>
                                <select name="groupId" value={formData.groupId} onChange={handleInputChange} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white focus:border-accent outline-none">
                                    <option value="">Seleccione un grupo...</option>
                                    {groups.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Info Médica</label>
                                <input name="medicalInfo" value={formData.medicalInfo} onChange={handleInputChange} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white focus:border-accent outline-none" />
                            </div>
                            <div>
                                <label className="block text-text-muted text-sm mb-1">Estado</label>
                                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white focus:border-accent outline-none">
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Pagado">Pagado</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inscriptions;
