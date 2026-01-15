export interface Flashcard {
  id: number
  subQuestion?: string
  question: string
  answer: string
  dicas: string[]
  perguntasOrientadoras: string[]
  hasImage?: boolean
}

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    question: "Explique o funcionamento e a importância do protocolo DHCP na configuração de redes IP.",
    answer: `O protocolo DHCP (Dynamic Host Configuration Protocol) permite que um cliente obtenha automaticamente um endereço IP e outros parâmetros de configuração, como máscara de rede, gateway por omissão e servidores DNS, usando um modelo cliente-servidor sobre UDP (porta 67/68).

O cliente envia uma mensagem DHCPDISCOVER em broadcast para encontrar servidores, recebe uma ou mais DHCPOFFER, escolhe uma oferta com DHCPREQUEST e o servidor confirma com DHCPACK, estabelecendo uma concessão (lease) temporária do endereço.

A sua importância é reduzir erros de configuração manual, evitar conflitos de IP, simplificar alterações globais de parâmetros e automatizar a gestão de endereços em redes com muitos equipamentos ou dispositivos móveis.`,
    dicas: [
      "Decora a sequência de mensagens: Discover → Offer → Request → Ack.",
      "Refere sempre que também distribui máscara, gateway e DNS, não só o IP.",
      "Usa a palavra 'concessão' (lease) e menciona que evita conflitos e erros de escrita.",
    ],
    perguntasOrientadoras: [
      "Que problema prático o DHCP resolve numa rede com centenas de PCs?",
      "Quais são os papéis de cliente, servidor, scope e lease no DHCP?",
      "O que acontece quando metade do tempo de lease já passou?",
    ],
  },
  {
    id: 2,
    question: "Quais as principais diferenças entre um switch e um router no contexto de redes de comunicação?",
    answer: `Um switch opera na camada 2 (ligação de dados) e encaminha tramas com base nos endereços MAC, aprendidos dinamicamente na sua tabela de comutação, segmentando domínios de colisão mas mantendo um único domínio de broadcast.

Um router opera na camada 3 (rede), analisa o cabeçalho IP, utiliza uma tabela de encaminhamento para decidir a rota e separa redes lógicas diferentes, criando domínios de broadcast distintos.

Em redes de comunicação, o switch é usado principalmente dentro da mesma LAN para comutação rápida, enquanto o router conecta sub-redes ou redes diferentes, aplica políticas (ex.: NAT, ACL) e escolhe caminhos com base em protocolos de encaminhamento.`,
    dicas: [
      "Menciona sempre: switch → MAC / camada 2; router → IP / camada 3.",
      "Refere domínios de colisão (switch) vs domínios de broadcast (router).",
      "Dá um exemplo: 'switch liga PCs dentro da LAN; router liga LAN à Internet'.",
    ],
    perguntasOrientadoras: [
      "Que tabela cada um mantém (tabela MAC vs tabela de encaminhamento)?",
      "Um switch sozinho consegue ligar duas sub-redes IP diferentes? Porquê?",
      "O que acontece ao broadcast de ARP quando há um router pelo meio?",
    ],
  },
  {
    id: 3,
    subQuestion: "a",
    question: "Observando o diagrama de rede (clica em 'Ver Diagrama'), quantas redes lógicas estão representadas?",
    answer: `No cenário típico desta topologia há:
• Uma rede lógica para cada ligação Ethernet entre router e switch (ex.: R1–SW1, R1–SW2, R2–SW3).
• Uma rede lógica para a ligação serial ponto-a-ponto entre R1 e R2.

Assim, existem quatro redes IP lógicas distintas (3 LANs e 1 link WAN).`,
    dicas: [
      "Conta sempre: 1 por cada segmento LAN, 1 por cada ligação ponto-a-ponto.",
      "Não mistures 'switch diferente' com 'rede diferente': o que interessa é a sub-rede IP.",
    ],
    perguntasOrientadoras: [
      "Cada interface de router em Ethernet costuma pertencer a que tipo de rede?",
      "A ligação serial R1–R2 é normalmente uma rede própria?",
    ],
    hasImage: true,
  },
  {
    id: 3,
    subQuestion: "b",
    question:
      "Quando o PC1 envia um pedido ARP para obter o endereço MAC do PC2 (assumindo que estão em redes IP diferentes), qual será o IP e o MAC de destino no pacote ARP?",
    answer: `• IP Origem: PC1-IP
• MAC Origem: PC1-MAC
• IP Destino (ARP): PC2-IP
• MAC Destino (Ethernet): R1-F0/1-MAC (MAC do gateway de PC1)

O pedido ARP é enviado em broadcast na LAN de PC1, mas procura o MAC do router (default gateway), pois o destino IP está noutra sub-rede.`,
    dicas: [
      "Lembra: ARP resolve IP→MAC da mesma LAN; para outra rede, resolve IP do gateway.",
      "O IP de destino no cabeçalho ARP é o IP do nó que se quer atingir, mas o MAC de destino na frame é broadcast na LAN.",
    ],
    perguntasOrientadoras: [
      "Quando o destino está noutra sub-rede, para quem o PC pergunta o MAC?",
      "Que IP aparece no campo 'target IP address' do ARP?",
    ],
    hasImage: true,
  },
  {
    id: 3,
    subQuestion: "c",
    question:
      "Explique o que ocorre com o pacote de dados se o endereço MAC do destino não estiver presente na tabela ARP do emissor.",
    answer: `Se o MAC do destino não estiver na tabela ARP, o emissor gera um pedido ARP em broadcast (MAC FF-FF-FF-FF-FF-FF) na sua LAN, com o IP de destino no campo de alvo.

A máquina que possui esse IP responde com uma mensagem ARP reply em unicast contendo o seu MAC, que é então guardado na tabela ARP por um tempo (TTL típico ~20 minutos) e o pacote de dados é finalmente enviado.`,
    dicas: [
      "Usa as palavras: broadcast ARP request, ARP reply, tabela ARP com TTL.",
      "Não digas que o pacote 'se perde'; primeiro há ARP, depois é enviado o IP datagram.",
    ],
    perguntasOrientadoras: [
      "O que acontece na rede quando um PC não sabe o MAC de um IP?",
      "Como é que o ARP evita ter de pedir sempre o MAC?",
    ],
    hasImage: true,
  },
  {
    id: 4,
    question: "Descreva duas vantagens do encaminhamento dinâmico em comparação com o encaminhamento estático.",
    answer: `O encaminhamento dinâmico adapta automaticamente as tabelas de encaminhamento a alterações de topologia (falhas de links, routers novos, mudanças de custo), sem intervenção manual permanente do administrador.

Permite também explorar caminhos redundantes, reagir a congestionamento variando rotas e, em redes grandes, reduz fortemente a complexidade e erro humano face à manutenção manual de rotas estáticas.

Duas vantagens bem enunciadas:
1. Adaptação automática a falhas e mudanças de topologia, garantindo maior disponibilidade.
2. Melhor utilização de múltiplos caminhos e possibilidade de escolher caminhos de menor custo ou atraso, melhorando desempenho.`,
    dicas: [
      "Refere 'routing daemons' que trocam informações e atualizam as tabelas.",
      "Contrasta com rotas estáticas: boas em redes pequenas e estáveis, más em topologias grandes.",
    ],
    perguntasOrientadoras: [
      "Que problema causa uma alteração de topologia numa rede com rotas estáticas?",
      "Porque é que em redes com caminhos redundantes o dinâmico é preferível?",
    ],
  },
  {
    id: 5,
    question:
      "Ao configurar manualmente um PC para acesso à Internet, quais os parâmetros necessários além do endereço IP? Explique a função de cada um.",
    answer: `Além do endereço IP, é necessário configurar:

• Máscara de rede: para separar a parte de rede e de host do endereço IP, permitindo ao host saber se um destino está na mesma sub-rede ou não.

• Gateway por omissão (default gateway): é o endereço IP da interface do router usado para encaminhar tráfego destinado a outras redes.

• Servidor(es) DNS: traduzem nomes de domínio (ex.: www.exemplo.com) em endereços IP, permitindo o uso de nomes em vez de IPs.`,
    dicas: [
      "Liga sempre a máscara à decisão 'mesma rede vs outra rede'.",
      "Indica que, sem gateway, não há acesso fora da sub-rede local.",
      "Lembra que o DNS não é necessário para pingar IPs, mas é essencial para nomes.",
    ],
    perguntasOrientadoras: [
      "O que acontece se a máscara estiver errada?",
      "O que acontece se o gateway estiver vazio ou mal configurado?",
      "Com DNS errado, que tipos de serviços falham primeiro?",
    ],
  },
  {
    id: 6,
    question:
      "No contexto do modelo OSI, explique a diferença entre porta TCP e porta UDP, dando um exemplo de aplicação para cada tipo.",
    answer: `Uma porta TCP identifica um ponto final de comunicação fiável, orientada à ligação, em que há controlo de fluxo, numeração de segmentos, retransmissões e garantia de entrega em ordem.

Uma porta UDP identifica um serviço sem ligação, sem garantias de entrega ou ordem, com menor overhead e latência, sendo adequada para aplicações em tempo real ou simples consultas.

Exemplos típicos: HTTP/HTTPS usam TCP (portas 80/443), enquanto DNS (consulta simples) e streaming de voz/vídeo muitas vezes usam UDP.`,
    dicas: ["Liga TCP a fiabilidade; UDP a simplicidade e rapidez.", "Usa um exemplo claro de aplicação em cada um."],
    perguntasOrientadoras: [
      "Porque é que TCP é melhor para transferência de ficheiros?",
      "Porque alguns serviços multimédia preferem UDP?",
    ],
  },
  {
    id: 7,
    subQuestion: "a",
    question:
      "Ao configurar o servidor DHCP num router, a resposta observada foi: 'Nenhum IP obtido após vários segundos'. Explique o que provavelmente ocorreu na rede.",
    answer: `A ausência total de resposta indica normalmente que o cliente não consegue alcançar nenhum servidor DHCP: o servidor pode estar desligado, a interface errada, ou existir um problema de encaminhamento/broadcast (por exemplo, falta de DHCP relay num router).

Também pode ocorrer se o scope do servidor estiver esgotado, não tendo endereços disponíveis para oferecer.`,
    dicas: [
      "Fala em DHCPDISCOVER em broadcast sem receber DHCPOFFER.",
      "Menciona servidor desligado, cabo/switch, VLAN errada ou pool esgotada.",
    ],
    perguntasOrientadoras: [
      "Se fizer ipconfig e vir um IP 169.254.x.x (APIPA), o que significa?",
      "A rede do cliente permite que os broadcasts cheguem ao servidor?",
    ],
  },
  {
    id: 7,
    subQuestion: "b",
    question:
      "Ao configurar o servidor DHCP num router, a resposta observada foi: 'IP obtido, mas sem acesso à Internet'. Explique o que provavelmente ocorreu na rede.",
    answer: `Neste caso o cliente recebeu um IP, mas a configuração distribuída pelo DHCP está incompleta ou incorreta, tipicamente no campo de gateway por omissão ou DNS.

Se o default gateway estiver errado (ou fora da sub-rede do cliente), o tráfego não sai para outras redes; se o DNS estiver errado, a resolução de nomes falha, dando a sensação de 'sem Internet' apesar de haver conectividade IP.`,
    dicas: [
      "Distingue: problema de gateway (sem ping a IPs externos) vs problema de DNS (ping IP funciona, nomes não).",
      "Refere que estes parâmetros vêm normalmente nas opções DHCP (router, DNS, domain-name).",
    ],
    perguntasOrientadoras: [
      "O cliente consegue fazer ping ao gateway? E a um IP público por endereço IP?",
      "Os endereços de gateway e DNS estão na mesma rede e são válidos?",
    ],
  },
  {
    id: 7,
    subQuestion: "c",
    question:
      "Ao configurar o servidor DHCP num router, a resposta observada foi: 'IP de outra sub-rede, sem ser a pretendida'. Explique o que provavelmente ocorreu na rede.",
    answer: `Se o cliente recebe um IP de uma sub-rede diferente da prevista, é provável que esteja a responder o servidor DHCP errado (por exemplo, um 'rogue DHCP server' ligado à rede) ou que o relay esteja configurado para o pool errado.

Isto causa endereços inconsistentes com a topologia real, podendo pôr o cliente numa sub-rede lógica incoerente com a sua LAN física, resultando em falhas de comunicação.`,
    dicas: [
      "Usa o termo 'DHCP rogue' (servidor DHCP não autorizado) como causa clássica.",
      "Refere ainda VLAN errada ou interface do router associado ao pool errado.",
    ],
    perguntasOrientadoras: [
      "Existem vários servidores DHCP na mesma broadcast domain?",
      "O scope do servidor corresponde à sub-rede física onde o cliente está?",
    ],
  },
  {
    id: 8,
    question:
      "Porque é que o NAT é utilizado em redes privadas? Descreva como o NAT overload opera para permitir acesso à Internet.",
    answer: `O NAT é usado em redes privadas para permitir que hosts com endereços IP privados (RFC 1918) acedam à Internet, preservando o espaço de endereçamento público e escondendo a estrutura interna da rede.

O NAT overload ou PAT (Port Address Translation) faz a tradução de múltiplos endereços privados para um único (ou poucos) endereços públicos, diferenciando as sessões pelos números de porta de origem, o que permite que dezenas ou centenas de hosts partilhem um único IP público.

Para cada fluxo, o router regista na tabela NAT o par (IP_privado, porto_origem) ↔ (IP_público, porto_traduzido) e substitui endereços/portos nos cabeçalhos IP e TCP/UDP dos pacotes de saída e entrada.`,
    dicas: [
      "Refere claramente: endereços privados 10.x, 172.16–31, 192.168.x.",
      "Explica que sem NAT os IPs privados não são encaminhados na Internet.",
      "Usa a expressão 'tradução de endereços e portas' para overload.",
    ],
    perguntasOrientadoras: [
      "Que limitação de endereços IPv4 o NAT ajuda a contornar?",
      "Qual a diferença entre NAT estático e NAT overload em termos de consumo de IPs públicos?",
    ],
  },
  {
    id: 9,
    question:
      "Explique a diferença entre uma consulta DNS recursiva e iterativa. Qual delas é mais comum no contexto de clientes finais?",
    answer: `Numa consulta recursiva, o servidor DNS contactado pelo cliente assume a responsabilidade de obter a resposta final: se não souber, interroga outros servidores (raiz, TLD, autoritativos) e só depois responde ao cliente com o resultado ou erro.

Numa consulta iterativa, o servidor DNS responde com a melhor informação que tem (por exemplo, 'pergunta a este servidor autoritativo'), devolvendo referências, e o próprio cliente ou um outro resolvedor faz consultas sucessivas aos servidores indicados até obter a resposta.

No contexto de clientes finais, o mais comum é o uso de consultas recursivas para o servidor DNS do ISP/empresa, que atua como resolvedor recursivo, cacheando respostas.`,
    dicas: [
      "Palavras-chave: o servidor 'faz o trabalho todo' (recursivo) vs 'vai passando referências' (iterativo).",
      "Refere explicitamente que o PC do utilizador normalmente faz pedidos recursivos ao DNS do ISP.",
    ],
    perguntasOrientadoras: [
      "Quem contacta os servidores raiz, TLD e autoritativos no cenário típico de um cliente doméstico?",
      "Porque é que faz sentido que o servidor DNS do ISP faça cache recursiva?",
    ],
  },
]
