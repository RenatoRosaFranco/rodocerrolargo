const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar anúncios existentes
  await prisma.advertisement.deleteMany({});
  console.log('✅ Anúncios antigos removidos');

  // Data de início e fim dos anúncios
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3); // 3 meses de duração

  // Banner do Topo
  const topBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/728x90/4F46E5/ffffff?text=Anuncie+Aqui+-+Banner+Topo',
      destinationLink: 'https://example.com/anuncio-topo',
      bannerType: 'top',
      startDate,
      endDate,
      priority: 10,
      status: 'active',
      views: 150,
      clicks: 12,
    },
  });
  console.log('✅ Banner do topo criado:', topBanner.id);

  // Banner Lateral Esquerdo
  const leftBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/160x600/10B981/ffffff?text=Banner+Lateral+Esquerdo',
      destinationLink: 'https://example.com/anuncio-esquerda',
      bannerType: 'left',
      startDate,
      endDate,
      priority: 8,
      status: 'active',
      views: 89,
      clicks: 5,
    },
  });
  console.log('✅ Banner lateral esquerdo criado:', leftBanner.id);

  // Banner Lateral Direito
  const rightBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/160x600/F59E0B/ffffff?text=Banner+Lateral+Direito',
      destinationLink: 'https://example.com/anuncio-direita',
      bannerType: 'right',
      startDate,
      endDate,
      priority: 8,
      status: 'active',
      views: 95,
      clicks: 7,
    },
  });
  console.log('✅ Banner lateral direito criado:', rightBanner.id);

  // Banner do Rodapé
  const footerBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/728x90/EF4444/ffffff?text=Anuncie+Aqui+-+Banner+Rodape',
      destinationLink: 'https://example.com/anuncio-rodape',
      bannerType: 'footer',
      startDate,
      endDate,
      priority: 7,
      status: 'active',
      views: 200,
      clicks: 15,
    },
  });
  console.log('✅ Banner do rodapé criado:', footerBanner.id);

  // Popup (opcional)
  const popupBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/500x400/8B5CF6/ffffff?text=Popup+Promocional',
      destinationLink: 'https://example.com/promocao',
      bannerType: 'popup',
      startDate,
      endDate,
      priority: 9,
      status: 'active',
      popupDisplayAfter: 5, // Exibir após 5 segundos
      popupFrequency: 'once-per-session', // Uma vez por sessão
      views: 50,
      clicks: 8,
    },
  });
  console.log('✅ Banner popup criado:', popupBanner.id);

  // Banner pendente (para exemplo de moderação)
  const pendingBanner = await prisma.advertisement.create({
    data: {
      imageUrl: 'https://via.placeholder.com/728x90/6B7280/ffffff?text=Anuncio+Pendente',
      destinationLink: 'https://example.com/pendente',
      bannerType: 'top',
      startDate,
      endDate,
      priority: 5,
      status: 'pending',
    },
  });
  console.log('✅ Banner pendente criado:', pendingBanner.id);

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log(`📊 Total de anúncios criados: 6`);
  console.log(`   - 4 ativos (top, left, right, footer)`);
  console.log(`   - 1 popup ativo`);
  console.log(`   - 1 pendente de aprovação`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
