const places = [
  {
    id: 1,
    title: "Museu da Gente Sergipana",
    image: "https://images.openai.com/static-rsc-4/mbWzoM-BgBf7U3iyS_SPOHsq9eaZ9SXrt4IYvqVk1QhY2uL7Y0W33fgVzUFds9VAZl9ZlQS30_gWgR36exMgfOseQjMOu2jIAbe_u_Ju2YgSh80TMv9xGQtQI6Q6k_RYx7KXPmNBCUxVi4iRAmL1kD1qRcqi9MoIsi81XmmHL7ljDDg7EblfiMH31VEJ7dzt?purpose=fullsize",
    description: "Museu tecnológico interativo sobre a cultura de Sergipe.",
    position: [-10.9175, -37.0476], // Alinhado na entrada do prédio histórico
    link: "https://www.google.com/maps?q=-10.9176,-37.0481",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9176,-37.0481"
  },
  {
    id: 2,
    title: "Arcos da Orla",
    position: [-10.9872, -37.0511], // Centralizado exatamente na estrutura dos arcos
    image: "https://images.openai.com/static-rsc-4/MBnXSOL0Vqqd1Ai72fpHoywLKuRB6TmFRyHMlTfms4-MhpDMb5bVbDIGFXrYxeYd661ihNcUncug3xIO11qKQ7neqKdYXH8_tbgj0KMqRCmNT01DL9gaKdrkIFooX89kB1NZWt52oExIg3mecmseDDoxRl16OkYMzO_dDQIhU0Jqe78lWuGts7bbag7tVOlg?purpose=fullsize",
    description: "Principal cartão-postal da Orla de Atalaia.",
    link: "https://www.google.com/maps?q=-10.9876,-37.0512",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9876,-37.0512"
  },
  {
    id: 3,
    title: "Orla de Atalaia",
    image: "https://images.openai.com/static-rsc-4/1vD88EQzeinWa_4tqUqoS01uBz09s4waeYFXjVpPQv0aLkZd3-wTQScJGcCuCz9NY7ojKuh3dKcunQ3Sl0C1eyWGeK51Hwmo8Yz7J3MtYdpHVqsaR891qsfszo9N7pjlPvWxcTZnFlUY1wnTUVXJxwNI219Jt3maXjYBrKOp4Je4m4cOFR79WbcINENkjFAf?purpose=fullsize",
    description: "Área turística com restaurantes e lazer.",
    position: [-10.9903, -37.0517], // Centralizado na região da passarela de lazer da orla
    link: "https://www.google.com/maps?q=-10.9890,-37.0505",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9890,-37.0505"
  },
  {
    id: 4,
    title: "Praia de Aruana",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/f8/71/da/aruana.jpg?w=1200&h=1200&s=1",
    description: "Praia tranquila muito visitada em Aracaju.",
    position: [-11.0336, -37.0673], // Posicionado na faixa de areia principal
    link: "https://www.google.com/maps?q=-11.0398,-37.0625",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.0398,-37.0625"
  },
  {
    id: 5,
    title: "Praia do Saco",
    image: "https://images.openai.com/static-rsc-4/0k2N0Qu81Lz6fC4HEngWysBvMkqW8vQtx4ESv653AZ81rz20HTbOEaDzo_VTvlRfT06MDs3gj6EKaC28og8fXWz3nM4gFwg-uomBBLi2FyLTmGuO9rHzsOkm4sO8Z88cY0NcUBztorRyv3OPGzzTIunVjTMgveo3h0QqRfrhIJD2hdlt8bXpq_JJgRIl09Oo?purpose=fullsize",
    description: "Uma das praias mais famosas de Sergipe.",
    position: [-11.4114, -37.3891], // Na ponta litorânea sul de Estância
    link: "https://www.google.com/maps?q=-11.4114,-37.3891",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.4114,-37.3891"
  },
  {
    id: 6,
    title: "Praia dos Náufragos",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/a9/4c/56/praia-do-naufrago.jpg?w=1200&h=-1&s=1",
    description: "Praia cercada por natureza preservada.",
    position: [-11.0850, -37.0980], // Localização exata da faixa de areia dos Náufragos
    link: "https://www.google.com/maps?q=-11.1137,-37.0714",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.1137,-37.0714"
  },
  {
    id: 7,
    title: "Calçadão da 13 de Julho",
    image: "https://www.aracaju.se.gov.br/userfiles/noticia_imagens/200502/19779/foto14155.jpg",
    description: "Área de passeio à beira do rio.",
    position: [-10.9315, -37.0492], // No centro da área do calçadão residencial
    link: "https://www.google.com/maps?q=-10.9256,-37.0488",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9256,-37.0488"
  },
  {
    id: 8,
    title: "Cânion do Xingó",
    image: "https://aracajuturismo.com.br/wp-content/uploads/2022/01/catamara-2.jpg",
    description: "Um dos maiores cânions navegáveis do mundo.",
    position: [-9.6439, -37.7914], // Ponto exato de embarque dos catamarãs no Rio São Francisco
    link: "https://www.google.com/maps?q=-9.6439,-37.7914",
    route: "https://www.google.com/maps/dir/?api=1&destination=-9.6439,-37.7914"
  },
  {
    id: 9,
    title: "Crôa do Goré",
    image: "https://aracajuturismo.com.br/wp-content/uploads/2020/10/croa-do-gore.jpg",
    description: "Banco de areia famoso pelos passeios de lancha.",
    position: [-11.0965, -37.1352], // Ajustado exatamente em cima do banco de areia no rio
    link: "https://www.google.com/maps?q=-11.1087,-37.1395",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.1087,-37.1395"
  },
  {
    id: 10,
    title: "Ilha dos Namorados",
    image: "https://guiadearacaju.com.br/wp-content/uploads/2024/08/croa-do-gore-se.jpg",
    description: "Destino turístico cercado por manguezais.",
    position: [-11.1118, -37.1325], // Cravado na faixa de areia da ilha flutuante
    link: "https://www.google.com/maps?q=-11.1064,-37.1372",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.1064,-37.1372"
  },
  {
    id: 11,
    title: "Parque Nacional Serra de Itabaiana",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/e4/3d/e2/uma-das-cachoeiras-pelo.jpg?w=1200&h=-1&s=1",
    description: "Área de preservação com trilhas e caches.",
    position: [-10.7485, -37.3412], // Entrada da reserva ecológica nacional
    link: "https://www.google.com/maps?q=-10.7577,-37.3401",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.7577,-37.3401"
  },
  {
    id: 12,
    title: "Parque dos Falcões",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7c4IssCCRmD33zF4vChF_5u4ntNI7zz5H-w&s",
    description: "Parque ecológico e santuário de aves de rapina em Itabaiana.",
    position: [-10.6865, -37.3888], // Coordenada precisa da recepção do instituto de aves
    link: "https://www.google.com/maps?q=-10.6508,-37.4402",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.6508,-37.4402"
  },
  {
    id: 13,
    title: "Cachoeira Macambira",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHlkVtP4whzMVqFUqOYs3iyrHLwV0uvDuWVO0ZyFW9yP88H9ISGxXWtDJT_peUTvivTFEri9EA-OBHm3ZnYJRHpEB6geQOIRnnfmEU4euWisfOhzy52orAtJC41ARqBSXPGFjc=s1360-w1360-h1020-rw",
    description: "Cachoeira localizada na região serrana.",
    position: [-10.6622, -37.5451], // Queda d'água principal da São Francisco (Macambira)
    link: "https://www.google.com/maps?q=-10.6662,-37.5417",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.6662,-37.5417"
  },
  {
    id: 14,
    title: "Cachoeira do Saboeiro",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE21Htju3zMibIf4_F4Dl-3l4t2mebgdZHqDEwfQW5dSedYRfUmVIzlHatN_71YdaAfZROMFsbvC2fxI99wWKVDYUS6lvjhsPeD4fi56EI244YeUeDFkBj9eHSda-tEhkcyKvT1bg=s1360-w1360-h1020-rw",
    description: "Cachoeira famosa em Sergipe.",
    position: [-10.7425, -37.3948], // Localizada nas trilhas da serra
    link: "https://www.google.com/maps?q=-10.7469,-37.3875",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.7469,-37.3875"
  },
  {
    id: 15,
    title: "São Cristóvão",
    image: "https://vidasemparedes.com.br/wp-content/uploads/2022/07/aracaju-vidasemparedes-4.jpg",
    description: "Cidade histórica patrimônio nacional.",
    position: [-11.0149, -37.2064], // Focado na icônica Praça São Francisco (Patrimônio UNESCO)
    link: "https://www.google.com/maps?q=-11.0147,-37.2065",
    route: "https://www.google.com/maps/dir/?api=1&destination=-11.0147,-37.2065"
  },
  {
    id: 16,
    title: "Laranjeiras",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/56/13/d0/fachada-do-museu-onde.jpg?w=900&h=-1&s=1",
    description: "Cidade histórica e cultural de Sergipe.",
    position: [-10.8038, -37.1691], // Fixado na praça central da matriz de Laranjeiras
    link: "https://www.google.com/maps?q=-10.8065,-37.1701",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.8065,-37.1701"
  },
  {
    id: 17,
    title: "Palácio Museu Olímpio Campos",
    image: "https://www.palacioolimpiocampos.se.gov.br/site/img/pm1.jpg",
    description: "Museu histórico localizado em Aracaju.",
    position: [-10.9123, -37.0494], // Centro geométrico da Praça Fausto Cardoso
    link: "https://www.google.com/maps?q=-10.9116,-37.0482",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9116,-37.0482"
  },
  {
    id: 18,
    title: "Feira do Turista de Aracaju",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbSTHI87b-DxW5f70dZZJwBwNEoED1cahUYw&s",
    description: "Feira turística e gastronômica.",
    position: [-10.9822, -37.0505], // Entrada do centro de compras da Atalaia
    link: "https://www.google.com/maps?q=-10.9879,-37.0503",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9879,-37.0503"
  },
  {
    id: 19,
    title: "Largo da Gente Sergipana",
    image: "https://images3.motor-reserva.com.br/curl/erp_foco/images/GenericPages/cliente_102/202106141623699971gente1.jpg",
    description: "Espaço cultural em Aracaju.",
    position: [-10.9189, -37.0468], // Exatamente em cima do píer flutuante com as estátuas dos folguedos
    link: "https://www.google.com/maps?q=-10.9094,-37.0395",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9094,-37.0395"
  },
  {
    id: 20,
    title: "Passarela do Caranguejo",
    image: "https://images.openai.com/static-rsc-4/syk5igpCKPJTDo10weUQ6js-cwGt9Mziuh5eq6sdyKDGzFiLxVtQ-CDsUwZBmhtMANbKFBEQWX8HihB0mHy3MiM2yxXJrtrAArSDgRfzLjOnN5LFb0I4ZR9a8nl6z3Un7XSfwUPZOI9fJymrIisnluekz91NdbyWcgJx1iZGy7ZdMyxfN3dWey3E8EvconJv?purpose=fullsize",
    description: "Centro gastronômico famoso em Aracaju.",
    position: [-10.9919, -37.0494], // Corrigido para a escultura do Caranguejo Gigante
    link: "https://www.google.com/maps?q=-10.9919,-37.0494",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9919,-37.0494"
  },
  {
    id: 21,
    title: "Parque da Sementeira",
    image: "https://www.aracaju.se.gov.br/userfiles/noticia_imagens/202303/99245/foto_felipe_goetennauer_1.jpg",
    description: "Parque urbano para lazer e esportes.",
    position: [-10.9392, -37.0601], // Entrada principal voltada para a Av. Jornalista Bezerra de Menezes
    link: "https://www.google.com/maps?q=-10.9385,-37.0622",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9385,-37.0622"
  },
  {
    id: 22,
    title: "Mirante da Treze de Julho",
    image: "https://www.aracaju.se.gov.br/userfiles/noticia_imagens/202601/115182/whatsapp_image_2026_01_22_at_10.46.19.jpeg",
    description: "Mirante turístico e Centro de Atendimento ao Turista.",
    position: [-10.9264, -37.0478], // Posicionado exatamente sobre a estrutura do mirante na passarela
    link: "https://www.google.com/maps?q=-10.9250,-37.0480",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9250,-37.0480"
  },
  {
    id: 23,
    title: "Oceanário de Aracaju",
    image: "https://guiaviajarmelhor.com.br/wp-content/uploads/2016/03/projeto-TAMAR.jpg",
    description: "Oceanário com espécies marinhas brasileiras.",
    position: [-10.9850, -37.0497], // Cravado na estrutura em formato de tartaruga gigante da Fundação Pró-Tamar
    link: "https://www.google.com/maps?q=-10.9899,-37.0494",
    route: "https://www.google.com/maps/dir/?api=1&destination=-10.9899,-37.0494"
  }
];

export default places;