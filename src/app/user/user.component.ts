import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import { FormsModule } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})


export class UserComponent implements OnInit{

  outro: Element[];
  user: FirebaseUserModel = new FirebaseUserModel();
  questions = 
  [

    {question: '1. No primeiro contato com um prospect que você acredita que pode trazer grandes retornos à empresa, você:',
    alternatives: [
      { answer: 'Busca explicar a solução da sua empresa, com todas as funcionalidades do produto, de modo a ajudar o prospect a entender exatamente o que a empresa faz.', value: 0, class: 'wrong' },
      { answer: 'Buscar entender qual problema o prospect possui.', value: 10, class: 'right' },
      { answer: 'Fala da história da empresa para criar credibilidade e, em seguida, explica a solução detalhadamente.', value: 0, class: 'wrong' },
      { answer: 'Fala da história da empresa para criar credibilidade, explica detalhadamente a solução, contextualizando qual problema ela resolve.', value: 0, class: 'wrong' },
    ],
    id: 'question1',
  },

    {question: '2. Como vendedor:',
    alternatives: [
      { answer: 'Você é excelente comunicador e vende mesmo para clientes clientes que não precisam da solução/produto.', value: 0, class: 'wrong' },
      { answer: 'Você vende para clientes que precisam da solução/produto e descarta os clientes que não precisam.', value: 10, class: 'right' },
      { answer: 'Você busca entender o problema dos clientes que não precisam da solução/produto, convence-os de que precisam e consegue vender.', value: 0, class: 'wrong' },
      { answer: 'Você entende que os clientes se incomodam com vendedores e espera eles demonstrarem interesse na sua solução/produto para fazer a venda; de modo a não incomodar os clientes com abordagens frias.', value: 0, class: 'wrong' },
    ],
    id: 'question2',
  },

    {question: '3. Quando você desiste de um prospect?',
    alternatives: [
      { answer: 'Eu não incomodo o prospect e caso ele não demonstre interesse, eu não entrarei em contato e nem venderei.', value: 0, class: 'wrong' },
      { answer: 'Eu crio um loop infinito de conversas até que eu feche com o cliente ou ele diga "Não".', value: 10, class: 'right' },
      { answer: 'Eu nunca desisto do prospect. Quando ele me diz um "Não", eu agendo para voltar a falar com ele depois de um tempo.', value: 0, class: 'wrong' },
      { answer: 'Eu sou razoável. Eu entro em contato com o prospect e caso ele não responda, eu o respeito e não faço novo contato.', value: 0, class: 'wrong' },
    ],
    id: 'question3',
  },

    {question: '4. Assinale a alternativa mais correta:',
    alternatives: [
      { answer: 'A única forma de se conseguir leads é por meio de estratégia de inbound marketing.', value: 0, class: 'wrong' },
      { answer: 'Além do Inbound Marketing, é possível captar leads por meio de indicações de amigos e clientes. Essas leads oriundas de indicação são as que fecham contratos mais rapidamente. Não é interessante buscar ativamente por leads, já que a estratégia de abordagem fria incomoda as pessoas.', value: 0, class: 'wrong' },
      { answer: 'As leads oriundas do Inbound Marketing, podem não ser suficientes para gerar os resultados que o negócio precisa, por isso, é importante também buscar de forma ativa possíveis clientes', value: 10, class: 'right' },
      { answer: 'A captação ativa de leads é a estratégia que traz mais resultado, entretanto, é importante buscar também fazer um bom inbound marketing e entregar um excelente produto para os clientes para que eles façam indicações e evangelizem o produto.', value: 0, class: 'wrong' },
    ],
    id: 'question4',
  },

    {question: '5. Alessandra é a melhor vendedora na Goal Hunter, conhecida por trabalhar com foco no cliente. Seu gestor, no mês passado, escreveu uma recomendação para Alessandra no LinkedIn. Como você completaria o texto conforme a ordem abaixo?\n\n“Aprendi, na teoria e prática, que um bom vendedor ao iniciar uma negociação necessita compreender de forma clara os objetivos que _______ possui a curto, médio e longo prazo. Alessandra, além disso, apresenta _________ para sanar as dores do lead, estabelece relações ________, criando valor e aumentando o engajamento. Por conta disso, ________ realiza a venda de produtos desnecessários para aumentar a receita e alcançar o 1º lugar no ranking de vendas da Goal Hunter, pois está constantemente focado nos objetivos _________. Recomendo Alessandra, mas espero que ela faça parte do meu time por muito tempo.”',
    alternatives: [
      { answer: 'O lead / a solução ideal / humanizadas / nunca / do lead', value: 10, class: 'right' },
      { answer: 'A empresa / o maior desconto / perde-ganha / sempre / da empresa', value: 0, class: 'wrong' },
      { answer: 'A empresa / diversos produtos / perde-perde / na maioria das vezes / da empresa', value: 0, class: 'wrong' },
      { answer: 'O vendedor / as soluções ideiais / humanizadas / às vezes / dela', value: 0, class: 'wrong' },
    ],
    id: 'question5',
  },

    {question: '6. Determine se é Verdadeiro (V) ou Falso (F): \nI) Na estratégia de Inbound Sales, o conteúdo – que pode ser blog post, vídeo, webinar, etc – é a principal ferramenta para a atração do lead \nII) A estratégia de Outbound Sales é necessariamente ativa',
    alternatives: [
      { answer: 'F - F - V - F - V', value: 0, class: 'wrong' },
      { answer: 'V - V - F - F - F', value: 10, class: 'right' },
      { answer: 'F - F - V - F - F', value: 0, class: 'wrong' },
      { answer: 'F - V - V - F - V', value: 0, class: 'wrong' },
      { answer: 'V - V - F - V - F', value: 0, class: 'wrong' },
    ],
    id: 'question6',
  },

    {question: '7. Sabemos que, quanto mais rápido o contato com um lead após ocorrer a “levantada de mão”, maiores são as chances de conversão em cliente. Você trabalha em uma empresa com a metodologia Inbound e acabou de chegar um lead no seu CRM que solicitou contato há 1 minuto atrás. Você sabe o nome e o telefone dele, qual é a sua próxima ação?',
    alternatives: [
      { answer: 'Pesquisar o perfil dele no Linkedin de forma detalhada com o intuito de descobrir a empresa em que trabalha e a função que ele exerce, além de verificar as conexões que ele possui em comum com você para fazer um contato quando possível', value: 10, class: 'right' },
      { answer: 'Buscar informações rápidas sobre o lead, através do Linkedin e/ou outras ferramentas, mas ainda buscar o contato entre 2 e 5 minutos após sua levantada de mão', value: 0, class: 'wrong' },
      { answer: 'Pesquisar no Facebook sobre a vida pessoal do lead e, para criar rapport, citar na ligação o quanto as fotos dele junto com a família na praia ficaram maravilhosas e dizer que você também costuma frequentar essa praia', value: 0, class: 'wrong' },
      { answer: 'Não ligar, pois você não tem informações suficientes sobre o lead no momento', value: 0, class: 'wrong' },
      { answer: 'Ligar imediatamente e descobrir as demais informações durante a ligação', value: 0, class: 'wrong' },
    ],
    id: 'question7',
  },

    {question: '8. Determine se é Verdadeiro (V) ou Falso (F).\nA venda para leads chamados “Ideal Customer Profile” ocasiona a médio e longo prazo:\nI) Aumento da taxa de churn\nII) Menor necessidade de qualificação\nIII) Um cliente mais satisfeito\nIV) Aumento do ciclo de vendas\nV) Maior engajamento',
    alternatives: [
      { answer: 'F - F - F - F - V', value: 0, class: 'wrong' },
      { answer: 'V - V - V - F - V', value: 0, class: 'wrong' },
      { answer: 'V - V - F - V - F', value: 0, class: 'wrong' },
      { answer: 'V - F - V - V - F', value: 0, class: 'wrong' },
      { answer: 'F - F - V - F - V', value: 10, class: 'right' },
    ],
    id: 'question8',
  },

    {question: '9. Qual das duas abordagens de e-mail parece fazer mais sentido para você e por quê?\nI) Assunto: Apresentação Gabriel - Olá, Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. É o caso de vocês? Faz sentido conversar 10 minutos sobre o assunto em algum horário após as 16:00 de quinta ou sexta?\nII) Assunto: Como melhorar seu recrutamento! Olá Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. Por favor me deixe saber se é um assunto importante para vocês. Obrigado!',
    alternatives: [
      { answer: 'A I, pois a personalização no assunto e a call-to-action no fim do e-mail tendem a aumentar os índices de abertura e resposta, respectivamente', value: 0, class: 'wrong' },
      { answer: 'A I, pois, apesar da sugestão final ter diferentes percepções por públicos mais ou menos corporativos, possui um assunto menos interruptivo', value: 0, class: 'wrong' },
      { answer: 'A II, pois o assunto é mais assetivo e a conclusão é menos invasiva', value: 0, class: 'wrong' },
      { answer: 'A II, pois, apesar do assunto menos efetivo, configura-se em uma metodologia consultiva, alinhando-se às tendências de mercado', value: 10, class: 'right' },
    ],
    id: 'question9',
  },

    {question: '10. Você está finalizando uma call com o lead e precisa decidir qual o próximo passo que realizará para avançar o deal, você tem duas opções:\nI) Ainda na ligação, agenda data e hora da próxima call e logo após envia um e-mail com breve resumo do que conversaram.\nII) Informa o lead que irá enviar um e-mail com todas as informações do produto, encerra a call e ao escrever o e-mail sugere uma data e horário para a tirar as dúvidas do lead e avançar o deal.',
    alternatives: [
      { answer: 'A I, pois com a próxima ação agendada, tenho maior controle da negociação e favorecimento para que meu pipeline seja verdadeiro, consistente e previsível', value: 10, class: 'right' },
      { answer: 'A II, pois, se o lead tiver alguma dúvida, pode consultar o meu e-mail com as informações detalhadas e o deixarei à vontade para marcar a próxima conversa comigo; assim não irei atrapalhá-lo, vou gerar relevância com as informações e isolar as possíveis objeções', value: 0, class: 'wrong' },
    ],
    id: 'question10',
  },


    {question: '11. O que são as Buyer Personas?',
    alternatives: [
      { answer: 'O público-alvo que se deseja atingir.', value: 0, class: 'wrong' },
      { answer: 'Uma simulação da identidade da marca da minha empresa, o mesmo que Brand Persona.', value: 0, class: 'wrong' },
      { answer: 'Uma simulação do que seria um cliente ideal, usada para direcionar as vendas e a criação de conteúdo.', value: 10, class: 'right' },
      { answer: 'São os prospects da sua empresa.', value: 0, class: 'wrong' },
      { answer: 'São os clientes que já compraram de sua empresa.', value: 0, class: 'wrong' },
    ],
    id: 'question11',
  },

  ];
  constructor(

    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
    
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  sumValue(){


    this.outro = [].slice.call(document.querySelectorAll(".right:checked"));
    console.log(this.outro);

    let result = (this.outro.length / this.questions.length) * 100;
    console.log(result);

}
}
