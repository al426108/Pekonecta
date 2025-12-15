
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = 3001;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Dashboard Data Endpoint
app.get('/api/dashboard', async (req, res) => {
    try {
        const totalInscritos = await prisma.participant.count();
        const pagosPendientes = await prisma.participant.count({ where: { status: 'Pendiente' } });
        const personalActivo = await prisma.monitor.count();

        // Fetch recent participants
        const participants = await prisma.participant.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: { group: true }
        });

        res.json({
            stats: {
                totalInscritos,
                pagosPendientes,
                personalActivo
            },
            participants
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Participants Endpoint
app.get('/api/participants', async (req, res) => {
    const participants = await prisma.participant.findMany({
        include: { group: true }
    });
    res.json(participants);
});

// Groups Endpoint
app.get('/api/groups', async (req, res) => {
    const groups = await prisma.group.findMany({
        include: { monitor: true, _count: { select: { participants: true } } }
    });
    res.json(groups);
});

// Monitors (Staff) Endpoint
app.get('/api/monitors', async (req, res) => {
    const monitors = await prisma.monitor.findMany({
        include: { groups: true }
    });
    res.json(monitors);
});

// Events Endpoint
app.get('/api/events', async (req, res) => {
    const events = await prisma.event.findMany();
    res.json(events);
});

app.post('/api/events', async (req, res) => {
    try {
        const event = await prisma.event.create({ data: { ...req.body, date: new Date(req.body.date) } });
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inventory Endpoint
app.get('/api/inventory', async (req, res) => {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
});

app.post('/api/inventory', async (req, res) => {
    try {
        const item = await prisma.inventoryItem.create({ data: req.body });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create Participant Endpoint (for Inscriptions)
app.post('/api/participants', async (req, res) => {
    try {
        const { name, medicalInfo, status, groupId } = req.body;
        const participant = await prisma.participant.create({
            data: {
                name,
                medicalInfo: medicalInfo || 'Ninguna',
                status: status || 'Pendiente',
                date: new Date(),
                groupId: groupId ? parseInt(groupId) : null
            }
        });
        res.json(participant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Serve static files from dist
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
