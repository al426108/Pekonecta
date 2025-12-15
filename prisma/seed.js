import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Groups
    const group1 = await prisma.group.create({ data: { name: 'Los Robles', description: 'Grupo de 10-12 años' } });
    const group2 = await prisma.group.create({ data: { name: 'Los Delfines', description: 'Grupo de 6-9 años' } });
    const group3 = await prisma.group.create({ data: { name: 'Los Dinosaurios', description: 'Grupo de 4-5 años' } });

    // Create Participants
    const participantsData = [
        { name: 'Sofía Martínez', medicalInfo: 'Ninguna', status: 'Pagado', groupId: group1.id, date: new Date('2023-10-24') },
        { name: 'Luis García', medicalInfo: 'Asmático', status: 'Pendiente', groupId: group2.id, date: new Date('2023-10-23') },
        { name: 'Ana Torres', medicalInfo: 'Hipertensión', status: 'Pagado', groupId: group3.id, date: new Date('2023-10-22') },
        { name: 'Pedro Ruiz', medicalInfo: 'Ninguna', status: 'Pendiente', groupId: group1.id, date: new Date('2023-10-21') },
        { name: 'María López', medicalInfo: 'Alergia Nueces', status: 'Pagado', groupId: group3.id, date: new Date('2023-10-20') },
    ];

    for (const p of participantsData) {
        await prisma.participant.create({ data: p });
    }

    // Create Monitors
    const monitorsData = [
        { name: 'Carlos Director', role: 'Director' },
        { name: 'Laura Monitora', role: 'Monitor' },
        { name: 'Juan Enfermero', role: 'Enfermero' }
    ];

    for (const m of monitorsData) {
        await prisma.monitor.create({ data: m });
    }

    console.log('Database seeded successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        // eslint-disable-next-line no-undef
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
