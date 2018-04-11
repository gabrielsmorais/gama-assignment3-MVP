import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})


export class UserComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  questions = 
  [

    {question: 'No primeiro contato com um prospect que você acredita que pode trazer grandes retornos à empresa, você:',
    answer1: 'Busca explicar a solução da sua empresa, com todas as funcionalidades do produto, de modo a ajudar o prospect a entender exatamente o que a empresa faz.',
    answer2: 'Fala da história da empresa para criar credibilidade e, em seguida, explica a solução detalhadamente.',
    answer3: 'Buscar entender qual problema o prospect possui.',
    answer4: 'Fala da história da empresa para criar credibilidade, explica detalhadamente a solução, contextualizando qual problema ela resolve.',
    value1: 0,
    value2: 0,
    value3: 10,
    value4: 0},

    {question: 'Como vendedor:',
    answer1: 'Você é excelente comunicador e vende mesmo para clientes clientes que não precisam da solução/produto.',
    answer2: 'Você vende para clientes que precisam da solução/produto e descarta os clientes que não precisam.',
    answer3: 'Você busca entender o problema dos clientes que não precisam da solução/produto, convence-os de que precisam e consegue vender.',
    answer4: 'Você entende que os clientes se incomodam com vendedores e espera eles demonstrarem interesse na sua solução/produto para fazer a venda; de modo a não incomodar os clientes com abordagens frias.',
    value1: 0,
    value2: 10,
    value3: 0,
    value4: 0},

    {question: 'Quando você desiste de um prospect?',
    answer1: 'Eu não incomodo o prospect e caso ele não demonstre interesse, eu não entrarei em contato e nem venderei.',
    answer2: 'Eu crio um loop infinito de conversas até que eu feche com o cliente ou ele diga "Não".',
    answer3: 'Eu nunca desisto do prospect. Quando ele me diz um "Não", eu agendo para voltar a falar com ele depois de um tempo.',
    answer4: 'Eu sou razoável. Eu entro em contato com o prospect e caso ele não responda, eu o respeito e não faço novo contato.',
    value1: 0,
    value2: 10,
    value3: 0,
    value4: 0},

    // {question: 'Como estruturar seus processos para bater a meta! Definir quantos “Contatos a capturar” e SDRs precisamos para bater uma meta de R$100.000,00/mês, se:'},

    {question: 'Assinale a alternativa mais correta:',
    answer1: 'A única forma de se conseguir leads é por meio de estratégia de inbound marketing.',
    answer2: 'Além do Inbound Marketing, é possível captar leads por meio de indicações de amigos e clientes. Essas leads oriundas de indicação são as que fecham contratos mais rapidamente. Não é interessante buscar ativamente por leads, já que a estratégia de abordagem fria incomoda as pessoas.',
    answer3: 'As leads oriundas do Inbound Marketing, podem não ser suficientes para gerar os resultados que o negócio precisa, por isso, é importante também buscar de forma ativa possíveis clientes',
    answer4: 'A captação ativa de leads é a estratégia que traz mais resultado, entretanto, é importante buscar também fazer um bom inbound marketing e entregar um excelente produto para os clientes para que eles façam indicações e evangelizem o produto.',
    value1: 0,
    value2: 0,
    value3: 10,
    value4: 0},

    {question: 'Alessandra é a melhor vendedora na Goal Hunter, conhecida por trabalhar com foco no cliente. Seu gestor, no mês passado, escreveu uma recomendação para Alessandra no LinkedIn. Como você completaria o texto conforme a ordem acima? “Aprendi, na teoria e prática, que um bom vendedor ao iniciar uma negociação necessita compreender de forma clara os objetivos que _______ possui a curto, médio e longo prazo. Alessandra, além disso, apresenta _________ para sanar as dores do lead, estabelece relações ________, criando valor e aumentando o engajamento. Por conta disso, ________ realiza a venda de produtos desnecessários para aumentar a receita e alcançar o 1º lugar no ranking de vendas da Goal Hunter, pois está constantemente focado nos objetivos _________. Recomendo Alessandra, mas espero que ela faça parte do meu time por muito tempo.”',
    answer1: 'O lead / a solução ideal / humanizadas / nunca / do lead',
    answer2: 'A empresa / o maior desconto / perde-ganha / sempre / da empresa',
    answer3: 'A empresa / diversos produtos / perde-perde / na maioria das vezes / da empresa',
    answer4: 'O vendedor / as soluções ideiais / humanizadas / às vezes / dela',
    value1: 10,
    value2: 0,
    value3: 0,
    value4: 0},

    {question: 'Determine se é Verdadeiro (V) ou Falso (F): \nI) Na estratégia de Inbound Sales, o conteúdo – que pode ser blog post, vídeo, webinar, etc – é a principal ferramenta para a atração do lead \nII) A estratégia de Outbound Sales é necessariamente ativa',
    answer1: 'F - F - V - F - V',
    answer2: 'V - V - F - F - F',
    answer3: 'F - F - V - F - F',
    answer4: 'F - V - V - F - V',
    value1: 0,
    value2: 10,
    value3: 0,
    value4: 0},

    {question: 'Sabemos que, quanto mais rápido o contato com um lead após ocorrer a “levantada de mão”, maiores são as chances de conversão em cliente. Você trabalha em uma empresa com a metodologia Inbound e acabou de chegar um lead no seu CRM que solicitou contato há 1 minuto atrás. Você sabe o nome e o telefone dele, qual é a sua próxima ação?',
    answer1: 'Pesquisar o perfil dele no Linkedin de forma detalhada com o intuito de descobrir a empresa em que trabalha e a função que ele exerce, além de verificar as conexões que ele possui em comum com você para fazer um contato quando possível',
    answer2: 'Buscar informações rápidas sobre o lead, através do Linkedin e/ou outras ferramentas, mas ainda buscar o contato entre 2 e 5 minutos após sua levantada de mão',
    answer3: 'Pesquisar no Facebook sobre a vida pessoal do lead e, para criar rapport, citar na ligação o quanto as fotos dele junto com a família na praia ficaram maravilhosas e dizer que você também costuma frequentar essa praia',
    answer4: 'Ligar imediatamente e descobrir as demais informações durante a ligação',
    value1: 0,
    value2: 10,
    value3: 0,
    value4: 0},

    {question: 'Determine se é Verdadeiro (V) ou Falso (F).\nA venda para leads chamados “Ideal Customer Profile” ocasiona a médio e longo prazo:\nI) Aumento da taxa de churn\nII) Menor necessidade de qualificação\nIII) Um cliente mais satisfeito\nIV) Aumento do ciclo de vendas\nV) Maior engajamento',
    answer1: 'V - V - V - F - V',
    answer2: 'V - V - F - V - F',
    answer3: 'V - F - V - V - F',
    answer4: 'F - F - V - F - V',
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 10},

    {question: 'Qual das duas abordagens de e-mail parece fazer mais sentido para você e por quê?\nI) Assunto: Apresentação Gabriel - Olá, Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. É o caso de vocês? Faz sentido conversar 10 minutos sobre o assunto em algum horário após as 16:00 de quinta ou sexta?\nII) Assunto: Como melhorar seu recrutamento! Olá Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. Por favor me deixe saber se é um assunto importante para vocês. Obrigado!',
    answer1: 'A I, pois a personalização no assunto e a call-to-action no fim do e-mail tendem a aumentar os índices de abertura e resposta, respectivamente',
    answer2: 'A I, pois, apesar da sugestão final ter diferentes percepções por públicos mais ou menos corporativos, possui um assunto menos interruptivo',
    answer3: 'A II, pois o assunto é mais assetivo e a conclusão é menos invasiva',
    answer4: 'A II, pois, apesar do assunto menos efetivo, configura-se em uma metodologia consultiva, alinhando-se às tendências de mercado',
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 10},

    // {question: 'Qual das duas abordagens de e-mail parece fazer mais sentido para você e por quê?\nI) Assunto: Apresentação Gabriel - Olá, Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. É o caso de vocês? Faz sentido conversar 10 minutos sobre o assunto em algum horário após as 16:00 de quinta ou sexta?\nII) Assunto: Como melhorar seu recrutamento! Olá Pedro, Aqui é o Gabriel, da Goal Hunter. Nós ajudamos empresas a encontrar talentos nas áreas de vendas e CS, e vi que possuem várias semelhanças com empresas de software que atendemos hoje. Outros CEOs que ajudo atualmente estão especialmente preocupados em encontrar os melhores profissionais de mercado de forma mais prática. Por favor me deixe saber se é um assunto importante para vocês. Obrigado!',
    // answer1: 'A I, pois a personalização no assunto e a call-to-action no fim do e-mail tendem a aumentar os índices de abertura e resposta, respectivamente',
    // answer2: 'A I, pois, apesar da sugestão final ter diferentes percepções por públicos mais ou menos corporativos, possui um assunto menos interruptivo',
    // answer3: 'A II, pois o assunto é mais assetivo e a conclusão é menos invasiva',
    // answer4: 'A II, pois, apesar do assunto menos efetivo, configura-se em uma metodologia consultiva, alinhando-se às tendências de mercado',
    // value1: 10,
    // value2: 0},

    {question: 'O que são as Buyer Personas?',
    answer1: 'O público-alvo que se deseja atingir.',
    answer2: 'Uma simulação da identidade da marca da minha empresa, o mesmo que Brand Persona.',
    answer3: 'São os prospects da sua empresa.',
    answer4: 'São os clientes que já compraram de sua empresa.',
    value1: 0,
    value2: 10,
    value3: 0,
    value4: 0},

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

  }
}
