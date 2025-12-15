import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ title, value, change, trend, icon, color }) => {
    const Icon = icon;
    // trend: 'up' | 'down' | 'neutral'

    const getTrendColor = () => {
        if (trend === 'up') return 'text-accent bg-accent/10';
        if (trend === 'down') return 'text-red-500 bg-red-500/10';
        return 'text-gray-400 bg-gray-400/10';
    };

    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp size={16} />;
        if (trend === 'down') return <TrendingDown size={16} />;
        return <Minus size={16} />;
    };

    return (
        <div className="bg-bg-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">{title}</span>
                <div className={`p-2 rounded-lg bg-opacity-20 ${color === 'blue' ? 'text-blue-500 bg-blue-500/10' : color === 'purple' ? 'text-purple-500 bg-purple-500/10' : 'text-cyan-500 bg-cyan-500/10'}`}>
                    <Icon size={20} />
                </div>
            </div>

            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-white">{value}</span>

                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
                    {getTrendIcon()}
                    <span>{change}</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
