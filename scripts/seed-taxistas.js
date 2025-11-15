const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const taxistas = [
  {
    nomeCompleto: 'João Silva Santos',
    email: 'joao.silva@email.com',
    telefone: '55999123456',
    whatsapp: '55999123456',
    modeloVeiculo: 'Toyota Corolla',
    anoVeiculo: '2022',
    placaVeiculo: 'ABC-1234',
    corVeiculo: 'Prata',
    numeroAlvara: 'ALV-001-2024',
    descricao: 'Motorista experiente com 15 anos de profissão. Atendimento de qualidade e veículo sempre limpo.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Maria Oliveira Costa',
    email: 'maria.oliveira@email.com',
    telefone: '55999234567',
    whatsapp: '55999234567',
    modeloVeiculo: 'Honda Civic',
    anoVeiculo: '2021',
    placaVeiculo: 'DEF-5678',
    corVeiculo: 'Preto',
    numeroAlvara: 'ALV-002-2024',
    descricao: 'Taxista profissional, disponível 24 horas. Aceito corridas para outras cidades.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Pedro Fernandes Lima',
    email: 'pedro.fernandes@email.com',
    telefone: '55999345678',
    whatsapp: '55999345678',
    modeloVeiculo: 'Chevrolet Onix',
    anoVeiculo: '2023',
    placaVeiculo: 'GHI-9012',
    corVeiculo: 'Branco',
    numeroAlvara: 'ALV-003-2024',
    descricao: 'Atendimento pontual e cordial. Veículo novo e com ar-condicionado.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Ana Paula Rodrigues',
    email: 'ana.rodrigues@email.com',
    telefone: '55999456789',
    whatsapp: '55999456789',
    modeloVeiculo: 'Fiat Argo',
    anoVeiculo: '2022',
    placaVeiculo: 'JKL-3456',
    corVeiculo: 'Vermelho',
    numeroAlvara: 'ALV-004-2024',
    descricao: 'Motorista particular e taxista. Especializada em viagens longas.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Carlos Eduardo Souza',
    email: 'carlos.souza@email.com',
    telefone: '55999567890',
    whatsapp: '55999567890',
    modeloVeiculo: 'Volkswagen Virtus',
    anoVeiculo: '2023',
    placaVeiculo: 'MNO-7890',
    corVeiculo: 'Azul',
    numeroAlvara: 'ALV-005-2024',
    descricao: 'Taxista credenciado. Aceito cartão de crédito e débito.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Juliana Martins Alves',
    email: 'juliana.martins@email.com',
    telefone: '55999678901',
    whatsapp: '55999678901',
    modeloVeiculo: 'Hyundai HB20',
    anoVeiculo: '2021',
    placaVeiculo: 'PQR-1234',
    corVeiculo: 'Cinza',
    numeroAlvara: 'ALV-006-2024',
    descricao: 'Atendimento especial para idosos e gestantes. Veículo confortável.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Roberto da Silva',
    email: 'roberto.silva@email.com',
    telefone: '55999789012',
    whatsapp: '55999789012',
    modeloVeiculo: 'Renault Logan',
    anoVeiculo: '2020',
    placaVeiculo: 'STU-5678',
    corVeiculo: 'Prata',
    numeroAlvara: 'ALV-007-2024',
    descricao: 'Mais de 20 anos de experiência. Conheço toda a região.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Fernanda Costa Pereira',
    email: 'fernanda.costa@email.com',
    telefone: '55999890123',
    whatsapp: '55999890123',
    modeloVeiculo: 'Ford Ka',
    anoVeiculo: '2022',
    placaVeiculo: 'VWX-9012',
    corVeiculo: 'Branco',
    numeroAlvara: 'ALV-008-2024',
    descricao: 'Taxista profissional e responsável. Disponível para agendamentos.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Marcos Antonio Ribeiro',
    email: 'marcos.ribeiro@email.com',
    telefone: '55999901234',
    whatsapp: '55999901234',
    modeloVeiculo: 'Nissan Versa',
    anoVeiculo: '2023',
    placaVeiculo: 'YZA-3456',
    corVeiculo: 'Preto',
    numeroAlvara: 'ALV-009-2024',
    descricao: 'Atendimento VIP. Veículo executivo com wifi.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Patricia Gomes Silva',
    email: 'patricia.gomes@email.com',
    telefone: '55999012345',
    whatsapp: '55999012345',
    modeloVeiculo: 'Peugeot 208',
    anoVeiculo: '2021',
    placaVeiculo: 'BCD-7890',
    corVeiculo: 'Vermelho',
    numeroAlvara: 'ALV-010-2024',
    descricao: 'Taxista credenciada e habilitada. Aceito animais de estimação.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Luciano Santos Ferreira',
    email: 'luciano.santos@email.com',
    telefone: '55999123457',
    whatsapp: '55999123457',
    modeloVeiculo: 'Chevrolet Prisma',
    anoVeiculo: '2020',
    placaVeiculo: 'EFG-1234',
    corVeiculo: 'Prata',
    numeroAlvara: 'ALV-011-2024',
    descricao: 'Motorista de confiança. Faço corridas para aeroportos.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Sandra Regina Costa',
    email: 'sandra.costa@email.com',
    telefone: '55999234568',
    whatsapp: '55999234568',
    modeloVeiculo: 'Volkswagen Polo',
    anoVeiculo: '2022',
    placaVeiculo: 'HIJ-5678',
    corVeiculo: 'Branco',
    numeroAlvara: 'ALV-012-2024',
    descricao: 'Atendimento diferenciado para turistas. Falo espanhol.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Ricardo Almeida Nunes',
    email: 'ricardo.almeida@email.com',
    telefone: '55999345679',
    whatsapp: '55999345679',
    modeloVeiculo: 'Toyota Yaris',
    anoVeiculo: '2023',
    placaVeiculo: 'KLM-9012',
    corVeiculo: 'Azul',
    numeroAlvara: 'ALV-013-2024',
    descricao: 'Taxista profissional e pontual. Veículo sempre higienizado.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Cristina Barbosa Lima',
    email: 'cristina.barbosa@email.com',
    telefone: '55999456780',
    whatsapp: '55999456780',
    modeloVeiculo: 'Fiat Cronos',
    anoVeiculo: '2021',
    placaVeiculo: 'NOP-3456',
    corVeiculo: 'Cinza',
    numeroAlvara: 'ALV-014-2024',
    descricao: 'Motorista experiente e cuidadosa. Especialista em rotas urbanas.',
    status: 'approved'
  },
  {
    nomeCompleto: 'André Luiz Carvalho',
    email: 'andre.carvalho@email.com',
    telefone: '55999567891',
    whatsapp: '55999567891',
    modeloVeiculo: 'Honda City',
    anoVeiculo: '2022',
    placaVeiculo: 'QRS-7890',
    corVeiculo: 'Preto',
    numeroAlvara: 'ALV-015-2024',
    descricao: 'Taxista credenciado com veículo confortável e espaçoso.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Beatriz Mendes Rocha',
    email: 'beatriz.mendes@email.com',
    telefone: '55999678902',
    whatsapp: '55999678902',
    modeloVeiculo: 'Chevrolet Tracker',
    anoVeiculo: '2023',
    placaVeiculo: 'TUV-1234',
    corVeiculo: 'Branco',
    numeroAlvara: 'ALV-016-2024',
    descricao: 'SUV confortável para viagens longas. Atendimento 24h.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Gabriel Henrique Dias',
    email: 'gabriel.dias@email.com',
    telefone: '55999789013',
    whatsapp: '55999789013',
    modeloVeiculo: 'Renault Sandero',
    anoVeiculo: '2020',
    placaVeiculo: 'WXY-5678',
    corVeiculo: 'Prata',
    numeroAlvara: 'ALV-017-2024',
    descricao: 'Motorista jovem e dinâmico. Aceito corridas de última hora.',
    status: 'approved'
  },
  {
    nomeCompleto: 'Daniela Ferreira Campos',
    email: 'daniela.campos@email.com',
    telefone: '55999890124',
    whatsapp: '55999890124',
    modeloVeiculo: 'Ford Ecosport',
    anoVeiculo: '2021',
    placaVeiculo: 'ZAB-9012',
    corVeiculo: 'Vermelho',
    numeroAlvara: 'ALV-018-2024',
    descricao: 'Taxista profissional com veículo amplo. Ideal para famílias.',
    status: 'approved'
  }
];

async function main() {
  console.log('Iniciando população de taxistas...');

  for (const taxista of taxistas) {
    await prisma.taxiDriver.create({
      data: taxista
    });
  }

  console.log('18 taxistas foram criados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao popular banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
