const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Verificando anúncios no banco...\n');
  
  const ads = await prisma.advertisement.findMany();
  
  console.log(`Total de anúncios: ${ads.length}\n`);
  
  const byType = {};
  ads.forEach(ad => {
    byType[ad.bannerType] = (byType[ad.bannerType] || 0) + 1;
  });
  
  console.log('Anúncios por tipo:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  console.log('\nDetalhes dos anúncios:');
  ads.forEach(ad => {
    console.log(`\nID: ${ad.id}`);
    console.log(`Tipo: ${ad.bannerType}`);
    console.log(`Status: ${ad.status}`);
    console.log(`Data início: ${ad.startDate}`);
    console.log(`Data fim: ${ad.endDate}`);
    console.log(`Prioridade: ${ad.priority}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
