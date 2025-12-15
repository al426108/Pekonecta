import React, { useEffect, useState } from 'react';
import { Users, CreditCard, Briefcase } from 'lucide-react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import StatsCard from '../components/Dashboard/StatsCard';
import SearchFilter from '../components/Dashboard/SearchFilter';
import ParticipantsTable from '../components/Dashboard/ParticipantsTable';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentParticipants, setRecentParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/dashboard');
                const data = await response.json();

                // Transform API data to UI format
                setStats([
                    {
                        title: 'Total Inscritos',
                        value: data.stats.totalInscritos,
                        change: '12%', // Mock change for now
                        trend: 'up',
                        icon: Users,
                        color: 'blue'
                    },
                    {
                        title: 'Pagos Pendientes',
                        value: data.stats.pagosPendientes,
                        change: '5%',
                        trend: 'up',
                        icon: CreditCard,
                        color: 'cyan'
                    },
                    {
                        title: 'Personal Activo',
                        value: data.stats.personalActivo,
                        change: '0%',
                        trend: 'neutral',
                        icon: Briefcase,
                        color: 'purple'
                    }
                ]);
                setRecentParticipants(data.participants);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-white">Cargando dashboard...</div>;
    }

    return (
        <div>
            <DashboardHeader />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats && stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className="bg-bg-card rounded-2xl border border-gray-800 p-1">
                <div className="p-4">
                    <SearchFilter />
                    {/* Pass data to table */}
                    <ParticipantsTable data={recentParticipants} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
