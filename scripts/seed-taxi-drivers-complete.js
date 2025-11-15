const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lista de 18 taxistas fictícios
const taxistas = [
  {
    fullName: 'Carlos Alberto Silva',
    email: 'carlos.silva@email.com',
    phone: '5555991234567',
    whatsapp: '5555991234567',
    description: 'Taxista experiente com 15 anos de profissão. Conhecimento completo da região.',
  },
  {
    fullName: 'João Pedro Martins',
    email: 'joao.martins@email.com',
    phone: '5555992345678',
    whatsapp: '5555992345678',
    description: 'Atencioso e pontual. Veículo confortável e climatizado.',
  },
  {
    fullName: 'Ricardo Costa Lima',
    email: 'ricardo.lima@email.com',
    phone: '5555993456789',
    whatsapp: '5555993456789',
    description: 'Especializado em viagens para aeroporto. Serviço garantido e seguro.',
  },
  {
    fullName: 'Fernando Gomes Pereira',
    email: 'fernando.pereira@email.com',
    phone: '5555994567890',
    whatsapp: '5555994567890',
    description: 'Falante de inglês e espanhol. Ótima companhia em longas viagens.',
  },
  {
    fullName: 'Mariano Oliveira Santos',
    email: 'mariano.santos@email.com',
    phone: '5555995678901',
    whatsapp: '5555995678901',
    description: 'Disponível 24 horas. Veículo novo com sistema de GPS.',
  },
  {
    fullName: 'Roberto Ferreira Dias',
    email: 'roberto.dias@email.com',
    phone: '5555996789012',
    whatsapp: '5555996789012',
    description: 'Conhecimento detalhado de hotéis e atrações turísticas.',
  },
  {
    fullName: 'Antônio José Rocha',
    email: 'antonio.rocha@email.com',
    phone: '5555997890123',
    whatsapp: '5555997890123',
    description: 'Cortês e profissional. Limpeza e manutenção do veículo impecável.',
  },
  {
    fullName: 'Miguel Alves Barbosa',
    email: 'miguel.barbosa@email.com',
    phone: '5555998901234',
    whatsapp: '5555998901234',
    description: 'Experiência com grupos e eventos especiais.',
  },
  {
    fullName: 'Paulo Henrique Mendes',
    email: 'paulo.mendes@email.com',
    phone: '5555999012345',
    whatsapp: '5555999012345',
    description: 'Viagens seguras e confortáveis. Atendimento de primeira qualidade.',
  },
  {
    fullName: 'Lucas Rodrigues Oliveira',
    email: 'lucas.oliveira@email.com',
    phone: '5555991112222',
    whatsapp: '5555991112222',
    description: 'Jovem, dinâmico e atento aos detalhes. Conhecimento de todas as rotas.',
  },
  {
    fullName: 'Diego Martins Costa',
    email: 'diego.costa@email.com',
    phone: '5555991113333',
    whatsapp: '5555991113333',
    description: 'Familiar com hospedarias e pontos de interesse. Sempre pontual.',
  },
  {
    fullName: 'Gustavo Silva Pinto',
    email: 'gustavo.pinto@email.com',
    phone: '5555991114444',
    whatsapp: '5555991114444',
    description: 'Conversador e simpático. Ótimo para conhecer histórias da cidade.',
  },
  {
    fullName: 'Rafael Souza Mendes',
    email: 'rafael.mendes@email.com',
    phone: '5555991115555',
    whatsapp: '5555991115555',
    description: 'Motorista responsável com excelente histórico de segurança.',
  },
  {
    fullName: 'Thiago Alves Cardoso',
    email: 'thiago.cardoso@email.com',
    phone: '5555991116666',
    whatsapp: '5555991116666',
    description: 'Conhecedor de restaurantes e bares da melhor qualidade.',
  },
  {
    fullName: 'Victor Franco Gomes',
    email: 'victor.gomes@email.com',
    phone: '5555991117777',
    whatsapp: '5555991117777',
    description: 'Atencioso com bagagens. Apoio com malas e mochilas grandes.',
  },
  {
    fullName: 'Anderson Pereira Silva',
    email: 'anderson.silva@email.com',
    phone: '5555991118888',
    whatsapp: '5555991118888',
    description: 'Veículo espaçoso ideal para famílias. Cadeirinha de criança disponível.',
  },
  {
    fullName: 'Julio Cesar Santos',
    email: 'julio.santos@email.com',
    phone: '5555991119999',
    whatsapp: '5555991119999',
    description: 'Experiência em tours turísticos. Guia conhecedor da região.',
  },
  {
    fullName: 'Ronaldo Martins Neves',
    email: 'ronaldo.neves@email.com',
    phone: '5555991120000',
    whatsapp: '5555991120000',
    description: 'Tarifas competitivas e honestas. Sem cobranças extras.',
  },
];

async function main() {
  console.log('🌱 Iniciando seed de taxistas...');

  try {
    // Limpar taxistas existentes
    const deletedCount = await prisma.taxiDriver.deleteMany({});
    console.log(`🗑️  ${deletedCount.count} taxista(s) anterior(es) removido(s)`);

    // Criar os 18 taxistas com status 'approved'
    for (const taxista of taxistas) {
      const created = await prisma.taxiDriver.create({
        data: {
          ...taxista,
          status: 'approved',
          approvalDate: new Date(),
          approvedBy: 'system',
        },
      });
      console.log(`✅ ${created.fullName} criado`);
    }

    console.log('\n🎉 Seed concluído com sucesso!');
    console.log(`📊 Total de taxistas criados: ${taxistas.length}`);
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
