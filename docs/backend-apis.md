# APIs e Web Services

A API foi criada para fornecer informações de tomada de medicamentos para a aplicação web e aplicação móvel do GestãoMed, que tem como objetivo principal de alertar horário de tomada de medicações.

## Objetivos da API

O objetivo da API é fornecer às aplicações web e móvel o acesso ao cadastro de usuários, autenticação de usuário, cadastro de medicamentos, alerta de tomada de medicamentos e consulta ao histórico de medicações. A API não será disponibilizada para consulta externa.

## Arquitetura

A API visa fornecer informações de tomada de medicamentos tendo como ponto principal o alerta de horário a serem tomadas as medicações. 
As aplicações web e aplicações móveis farão as solicitações para uma API usando protocolo HTTPS. O modelo de arquitetura monolítico tem-se uma única aplicação de software em camadas no qual a interface de usuário e código de acesso aos dados são combinados em um único programa a partir de uma única plataforma. Ela foi feita com módulos diferentes não só para poder facilitar a organização do código mas também para facilitar em caso de necessidade de escalabilidade futura.

## Modelagem da Aplicação

A aplicação GestãoMed tem uma estrutura de dados que envolve principalmente informações de medicamentos e de formas de administração e alertas dos horários de administração.

**API Cadastro de Medicamentos**

 - Entidades Principais:<br/>
1 - Nome do medicamento: Representa informações sobre um medicamento, incluindo nome, posologia, horários de tomada e demais informações associadas.<br/>
2 - Estoque: Quantidade de medicamentos ao iniciar um tratamento.<br/>
3 - Usuário: Armazena dados de usuários da aplicação, incluindo informações de autenticação e permissões.<br/>
4 - Horário da tomada do medicamento: Representa o horário em que o alerta de tomada de medicamento será disparado.

## Fluxo de Dados

**API  Cadastro de Medicamentos**

1 - O Usuário fornecerá dados do medicamento a ser cadastrado. O cliente solicitará uma requisição via HTTPS utilizando o método POST /registerMedicate; <br/>
2 - A API receberá os dados do lado do cliente e irá validá-los antes de enviar ao banco de dados Postgres;<br/>
3 - Após o registro no banco de dados, a API retornará com a resposta com o status 201, caso o cadastro seja realizado com sucesso;<br/>
4 - Após o retorno da API, o usuário será capaz de visualizar o medicamento registrado em sua tela de acesso.

## Requisitos Funcionais

1 - A aplicação deve permitir aos usuários se cadastrarem, fazerem log-in no sistema, cadastrar medicamentos e suas informações, incluindo alertas de tomada de medicações, além de acessarem a listagem dos medicamentos cadastrados e gerarem relatórios de medicamentos por um período específico.<br/>
2 - Os usuários devem ser capazes de cadastrar as informações e horários das medicações.<br/>
3 - A API deve autenticar os usuários antes de permitir o uso do sistema. <br/>
4 - A API deve gerar o alerta de tomada de medicamentos no horário programado além do alerta de proximidade do fim do estoque de medicações.

## Requisitos Não Funcionais

1 - Desempenho: A API deverá processar as requisições do usuário em 3s.<br/>
2 - Portabilidade: A API deverá ser executada em qualquer plataforma.<br/>
3 - LGPD: A API atenderá à Lei Geral de Proteção de Dados Pessoais nº 13.709/2018. <br/>
4 - Usabilidade – A API deverá ser de fácil uso. <br/>
5 - Disponibilidade  – terá alta disponibilidade 99% do tempo. <br/>
6 - Responsividade – O layout do sistema deverá usar design responsivo, para que renderize bem em qualquer dispositivo. <br/>
7 - Arquitetura em camadas - O sistema deverá usar arquitetura em camadas para desacoplamento. 


## Tecnologias Utilizadas

- NodeJs<br/>
- Typescript <br/>
- Cors <br/>
- Vitest <br/>
- ORM Prisma <br/>
- Banco de Dados Postgres <br/>
- JWT Auth <br/>
- Bcryptjs <br/>
- Express <br/>
- JsonWebToken <br/>
- Swagger


## API Endpoints

[Liste os principais endpoints da API, incluindo as operações disponíveis, os parâmetros esperados e as respostas retornadas.]

### Endpoint 1
- Método: GET
- URL: /endpoint1
- Parâmetros:
  - param1: [descrição]
- Resposta:
  - Sucesso (200 OK)
    ```
    {
      "message": "Success",
      "data": {
        ...
      }
    }
    ```
  - Erro (4XX, 5XX)
    ```
    {
      "message": "Error",
      "error": {
        ...
      }
    }
    ```


## Considerações de Segurança

A segurança é uma consideração crítica para garantir a integridade e confiabilidade da API. Abaixo estão algumas considerações de segurança importantes:<br/>

- Autenticação e autorização da api com criação do token JWT. <br/>
- Validação de dados de entrada retornando campos cuidadosamente avaliados.<br/>
- Prevenção de SQL Injection ao realizar comunicação com o banco de dados somente no backend e também utilizando a biblioteca Prisma (robusta em termos de segurança).<br/>
- Criptografia de senha com a biblioteca bcrypt. <br/>
- Variáveis de ambiente para proteger chaves sigilosas.


## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

1. COULOURIS, George F. et al. Sistemas distribuídos: conceitos e projeto. 5. ed. Porto Alegre: Bookman, 2013.<br/>
2. Documentação NodeJs -W3 School – Disponível em: https://www.w3schools.com/nodejs/nodejs_intro.asp . <br/>
3. Documentação Insomnia – Disponível em: https://docs.insomnia.rest/insomnia/get-started .

