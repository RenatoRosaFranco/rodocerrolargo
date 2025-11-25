import scheduleData from '@/data/schedule.json';
import hotelsData from '@/data/hotels.json';
import restaurantsData from '@/data/restaurants.json';

/**
 * Busca horários de ônibus no schedule.json
 */
const searchSchedules = (origin, destination, day = null) => {
  const currentDay = day || new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
  const schedules = scheduleData.schedules[currentDay] || [];

  const results = schedules.filter(schedule => {
    const matchOrigin = !origin || schedule.origin?.toLowerCase().includes(origin.toLowerCase());
    const matchDestination = !destination || schedule.destination?.toLowerCase().includes(destination.toLowerCase());
    return matchOrigin && matchDestination && schedule.departures?.length > 0;
  });

  return results;
};

/**
 * Formata os horários encontrados para exibição
 */
const formatScheduleResults = (schedules) => {
  if (schedules.length === 0) {
    return 'Não encontrei horários disponíveis para essa rota no momento.';
  }

  let response = '';
  schedules.forEach((schedule, index) => {
    if (index > 0) response += '\n\n';

    response += `**${schedule.origin} → ${schedule.destination}**\n`;
    response += `Horários: ${schedule.departures.join(', ')}\n`;
    if (schedule.estimatedTimeArrival) {
      response += `Previsão de chegada: ${schedule.estimatedTimeArrival}`;
    }
  });

  return response;
};

/**
 * Cria o contexto com informações da rodoviária para o ChatGPT
 */
const getSystemContext = () => {
  const allSchedules = Object.entries(scheduleData.schedules).map(([day, schedules]) => {
    const validSchedules = schedules.filter(s => s.origin && s.destination);
    return {
      day,
      routes: validSchedules.map(s => ({
        from: s.origin,
        to: s.destination,
        departures: s.departures,
        arrival: s.estimatedTimeArrival
      }))
    };
  });

  const hotelsList = hotelsData.map(hotel => ({
    name: hotel.name,
    address: hotel.address,
    phone: hotel.phone,
    coordinates: hotel.coordinates
  }));

  const restaurantsList = restaurantsData.map(restaurant => ({
    name: restaurant.name,
    address: restaurant.address,
    phone: restaurant.phone,
    coordinates: restaurant.coordinates
  }));

  return `Você é um assistente virtual da Rodoviária de Cerro Largo.

INFORMAÇÕES IMPORTANTES:
- Localização: R. Helmuth Schmidt, 700 - Centro, Cerro Largo - RS
- Telefone: (55) 3359-1191
- Email: contato@rodocerrolargo.com.br
- Horário de atendimento: Conforme horários das empresas

SERVIÇOS:
- Venda de passagens
- Serviço de encomendas (Segunda a Sábado: 07:00 às 19:00)
- Documentos necessários para encomendas: RG e CPF do remetente e destinatário

HOTÉIS EM CERRO LARGO:
${JSON.stringify(hotelsList, null, 2)}

RESTAURANTES EM CERRO LARGO:
${JSON.stringify(restaurantsList, null, 2)}

HORÁRIOS DISPONÍVEIS:
${JSON.stringify(allSchedules, null, 2)}

INSTRUÇÕES:
1. Seja sempre cordial e prestativo
2. Forneça informações precisas baseadas nos dados acima
3. Quando perguntarem sobre hotéis ou hospedagem, liste os hotéis disponíveis com seus telefones e endereços
4. Quando perguntarem sobre restaurantes ou onde comer, liste os restaurantes disponíveis com seus telefones e endereços
5. Se não souber algo, seja honesto e sugira contato direto
6. Use formatação markdown para destacar informações importantes
7. Sempre termine perguntando se pode ajudar com mais alguma coisa`;
};

/**
 * Chama a API do ChatGPT com o contexto da rodoviária
 */
export const sendMessageToChatGPT = async (userMessage, conversationHistory = []) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    console.error('NEXT_PUBLIC_OPENAI_API_KEY não configurada');
    return {
      success: false,
      message: 'Desculpe, o serviço de chat está temporariamente indisponível. Por favor, entre em contato pelo telefone (55) 3359-1191.'
    };
  }

  try {
    // Monta o array de mensagens para o ChatGPT
    const messages = [
      {
        role: 'system',
        content: getSystemContext()
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: userMessage
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return {
      success: true,
      message: assistantMessage
    };

  } catch (error) {
    console.error('Erro ao chamar ChatGPT:', error);

    // Fallback para busca local se a API falhar
    return {
      success: false,
      message: 'Desculpe, estou com dificuldades no momento. Você pode tentar novamente ou ligar para (55) 3359-1191.'
    };
  }
};

/**
 * Busca local como fallback (se não tiver API key)
 */
export const localSearch = (query) => {
  const lowerQuery = query.toLowerCase();

  // Tenta identificar origem e destino na query
  let origin = null;
  let destination = null;

  const cities = ['santa rosa', 'ijuí', 'ijui', 'porto alegre', 'são luiz gonzaga',
                  'santo ângelo', 'santo angelo', 'dezesseis de novembro', 'são nicolau'];

  cities.forEach(city => {
    if (lowerQuery.includes(city)) {
      if (!origin) {
        origin = city;
      } else if (!destination) {
        destination = city;
      }
    }
  });

  // Se mencionou apenas uma cidade, assume que é o destino partindo de Cerro Largo
  if (origin && !destination) {
    destination = origin;
    origin = 'cerro largo';
  }

  if (destination) {
    const schedules = searchSchedules(origin, destination);
    const formatted = formatScheduleResults(schedules);

    if (schedules.length > 0) {
      return formatted + '\n\nPosso ajudar com mais alguma informação?';
    }
  }

  // Respostas genéricas
  if (lowerQuery.includes('encomenda')) {
    return `**Serviço de Encomendas:**\n\nO guichê de encomendas está localizado no **hall principal** da rodoviária.\n\n**Horário de funcionamento:** Segunda a Sábado, 07:00 às 19:00\n**Documentos necessários:** RG e CPF do remetente e destinatário\n\nPosso ajudar com mais alguma informação?`;
  }

  if (lowerQuery.includes('hotel') || lowerQuery.includes('hospedagem') || lowerQuery.includes('hospedar') || lowerQuery.includes('dormir')) {
    let response = '**Hotéis em Cerro Largo:**\n\n';
    hotelsData.forEach((hotel, index) => {
      if (index > 0) response += '\n';
      response += `**${hotel.name}**\n`;
      response += `📍 ${hotel.address}\n`;
      response += `📞 ${hotel.phone}\n`;
    });
    response += '\n\nPosso ajudar com mais alguma informação?';
    return response;
  }

  if (lowerQuery.includes('restaurante') || lowerQuery.includes('comer') || lowerQuery.includes('comida') || lowerQuery.includes('almoço') || lowerQuery.includes('janta') || lowerQuery.includes('jantar')) {
    let response = '**Restaurantes em Cerro Largo:**\n\n';
    restaurantsData.forEach((restaurant, index) => {
      if (index > 0) response += '\n';
      response += `**${restaurant.name}**\n`;
      response += `📍 ${restaurant.address}\n`;
      response += `📞 ${restaurant.phone}\n`;
    });
    response += '\n\nPosso ajudar com mais alguma informação?';
    return response;
  }

  return `Olá! Sou o assistente virtual da Rodoviária de Cerro Largo.\n\nPosso te ajudar com:\n• Horários de ônibus\n• Valores de passagens\n• Hotéis e hospedagem\n• Restaurantes\n• Serviço de encomendas\n• Localização da rodoviária\n\nO que você gostaria de saber?`;
};
