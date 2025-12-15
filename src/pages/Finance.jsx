
import React, { useEffect, useState } from 'react';
import { DollarSign, CheckCircle, Clock } from 'lucide-react';
import ParticipantsTable from '../components/Dashboard/ParticipantsTable';

const Finance = () => {
    const [pendingPayments, setPendingPayments] = useState([]);
    const [totalPending, setTotalPending] = useState(0);

    useEffect(() => {
        // Fetch all participants and filter or create specific endpoint
        fetch('http://localhost:3001/api/participants')
            .then(res => res.json())
            .then(data => {
                const pending = data.filter(p => p.status === 'Pendiente');
                setPendingPayments(pending);
                // Assuming flat rate of €350 per inscription for demo
                setTotalPending(pending.length * 350);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Finanzas</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-card rounded-2xl p-6 border border-gray-800">
                    <span className="text-text-muted text-xs font-semibold uppercase">Total Pendiente</span>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-3xl font-bold text-white">€{totalPending}</span>
                        <div className="p-1 rounded bg-orange-500/10 text-orange-500">
                            <Clock size={16} />
                        </div>
                    </div>
                </div>
                {/* Placeholder for other stats */}
            </div>

            <div className="bg-bg-card rounded-2xl border border-gray-800 p-4">
                <h3 className="text-xl font-bold text-white mb-4 px-2">Pagos Pendientes</h3>
                <ParticipantsTable data={pendingPayments} />
            </div>
        </div>
    );
};

export default Finance;
