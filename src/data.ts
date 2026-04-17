import { Course } from "./types";

export const courseData: Course = {
  id: "tec-info-v1",
  title: "Técnico em Informática (Presencial & Digital)",
  description: "Sistema de apoio ao curso presencial. Aqui você encontra as videoaulas complementares e materiais de apoio das aulas práticas.",
  modules: [
    {
      id: "mod-hardware",
      title: "Arquitetura e Manutenção de Computadores",
      lessons: [
        {
          id: "hw-1",
          title: "Hardware: Componentes Internos",
          duration: "20:45",
          videoUrl: "https://drive.google.com/file/d/1XyZ7_placeholder/preview",
          description: "Nesta aula veremos a placa-mãe, CPU, memória e armazenamento em detalhes.",
          quiz: [
            {
              id: "q1",
              question: "Qual componente é considerado o 'cérebro' do computador?",
              options: ["Memória RAM", "Processador (CPU)", "Placa de vídeo", "Disco Rígido"],
              correctAnswerIndex: 1
            },
            {
              id: "q2",
              question: "Qual tipo de memória é volátil e perde os dados ao desligar o PC?",
              options: ["SSD", "HD", "ROM", "RAM"],
              correctAnswerIndex: 3
            },
            {
              id: "q3",
              question: "Onde todos os componentes internos do PC são conectados?",
              options: ["Fonte", "Gabinete", "Placa-Mãe", "Processador"],
              correctAnswerIndex: 2
            }
          ]
        },
        {
          id: "hw-2",
          title: "Manutenção Preventiva e Corretiva",
          duration: "18:20",
          videoUrl: "https://drive.google.com/file/d/1XyZ8_placeholder/preview",
          description: "Práticas de limpeza e diagnóstico de falhas comuns em desktops.",
          quiz: [
            {
              id: "q4",
              question: "Qual ferramenta é ideal para remover poeira de componentes sensíveis?",
              options: ["Pincel de cerdas duras", "Ar comprimido", "Água", "Pano úmido"],
              correctAnswerIndex: 1
            },
            {
              id: "q5",
              question: "O que deve ser trocado para evitar o superaquecimento do processador?",
              options: ["Pasta Térmica", "Cabo SATA", "Memória RAM", "Bateria da BIOS"],
              correctAnswerIndex: 0
            }
          ]
        }
      ]
    },
    {
      id: "mod-networks",
      title: "Redes e Conectividade",
      lessons: [
        {
          id: "net-1",
          title: "Fundamentos de Redes (Cabeamento)",
          duration: "25:30",
          videoUrl: "https://drive.google.com/file/d/1XyZ9_placeholder/preview",
          description: "Padrões de cabos, conectores RJ45 e ferramentas de crimpagem.",
          quiz: [
            {
              id: "q6",
              question: "Qual o conector padrão utilizado em cabos de rede par trançado?",
              options: ["USB", "RJ11", "RJ45", "BNC"],
              correctAnswerIndex: 2
            },
            {
              id: "q7",
              question: "Qual o nome da ferramenta usada para prender o conector ao cabo?",
              options: ["Multímetro", "Alicate de Crimpagem", "Chave de fenda", "Estilete"],
              correctAnswerIndex: 1
            }
          ]
        },
        {
          id: "net-2",
          title: "Configuração de Roteadores e IPs",
          duration: "30:15",
          videoUrl: "https://drive.google.com/file/d/1XyZ10_placeholder/preview",
          description: "Endereçamento IPv4, Máscaras de sube-rede e gateways.",
          quiz: [
            {
              id: "q8",
              question: "Quantos bits possui um endereço IPv4?",
              options: ["16 bits", "32 bits", "64 bits", "128 bits"],
              correctAnswerIndex: 1
            }
          ]
        }
      ]
    },
    {
      id: "mod-programming",
      title: "Desenvolvimento de Sistemas",
      lessons: [
        {
          id: "prog-1",
          title: "Introdução à Lógica de Programação",
          duration: "45:00",
          videoUrl: "https://drive.google.com/file/d/1XyZ11_placeholder/preview",
          description: "Algoritmos, variáveis e estruturas de decisão.",
          quiz: [
            {
              id: "q9",
              question: "O que é um algoritmo?",
              options: ["Uma linguagem de programação", "Uma sequência lógica de passos", "Um programa de computador", "Um componente de hardware"],
              correctAnswerIndex: 1
            }
          ]
        }
      ]
    }
  ]
};
