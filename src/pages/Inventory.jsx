
import React, { useEffect, useState } from 'react';
import { Package, Plus } from 'lucide-react';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', quantity: 0, category: '', status: 'Disponible' });

    const fetchItems = () => {
        fetch('/api/inventory')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, quantity: parseInt(formData.quantity) })
        });
        setShowModal(false);
        setFormData({ name: '', quantity: 0, category: '', status: 'Disponible' });
        fetchItems();
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Inventario</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    <Plus size={20} />
                    Nuevo Item
                </button>
            </div>

            <div className="bg-bg-card rounded-2xl border border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800/50 text-xs uppercase text-gray-400">
                        <tr>
                            <th className="p-4">Item</th>
                            <th className="p-4">Categoría</th>
                            <th className="p-4">Cantidad</th>
                            <th className="p-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                                        <Package size={18} />
                                    </div>
                                    <span className="text-white font-medium">{item.name}</span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">{item.category || '-'}</td>
                                <td className="p-4 text-white font-bold">{item.quantity}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.status === 'Disponible' ? 'bg-green-500/20 text-green-500' :
                                        item.status === 'En uso' ? 'bg-blue-500/20 text-blue-500' :
                                            'bg-red-500/20 text-red-500'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && <div className="p-8 text-center text-gray-500">No hay items en el inventario.</div>}
            </div>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-bg-card border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Nuevo Item</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input placeholder="Nombre" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" required />
                            <input type="number" placeholder="Cantidad" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" required />
                            <input placeholder="Categoría" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white" />
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-bg-dark border border-gray-700 rounded-lg p-2 text-white">
                                <option>Disponible</option>
                                <option>En uso</option>
                                <option>Reparación</option>
                            </select>
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

export default Inventory;
