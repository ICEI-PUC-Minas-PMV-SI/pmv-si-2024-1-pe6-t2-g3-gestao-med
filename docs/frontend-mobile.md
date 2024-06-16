# Front-end Móvel

Gestão Med é uma aplicação desenvolvida para a organização e gestão da administração de medicamentos, visando facilitar o dia a dia das pessoas que dependem da ingestão de medicamentos regularmente.  O objetivo é promover o bem-estar dos usuários através de uma solução integrada para a gestão de medicamentos e acompanhamento da saúde, garantindo administração correta e segura dos medicamentos e melhorando a qualidade de vida de todos os envolvidos.


## Tecnologias Utilizadas
 1) React Native
 2) Typescript
 3) Figma


## Arquitetura

Arquitetura _mobile_ é distribuída em _multilayers_ de camadas lógicas da aplicação.

As camadas podem ser assim divididas:

**Interface do Usuário (UI):** Esta camada é responsável pela apresentação da interface gráfica para o usuário. Ela engloba todos os elementos visuais, como botões, _menus_ e _layouts_, proporcionando a experiência de interação do usuário com o aplicativo.

**Lógica de Apresentação:** Lógica responsável por controlar como os dados são apresentados na _interface_ do usuário. Inclui a manipulação de eventos de usuário, a atualização da interface em resposta a mudanças nos dados e a navegação entre diferentes telas e seções do aplicativo.

**Lógica de Negócios:** Esta camada representa o núcleo da aplicação, sendo responsável por todas as operações e regras de negócios. Engloba o processamento de dados, validações e quaisquer outras operações que não estejam diretamente ligadas à interface do usuário.

**Acesso a Dados:** Responsável por interagir com o banco de dados ou serviço _web_, neste caso, o _Neon Tech_. Suas funcionalidades incluem operações como consultas para recuperar dados do banco de dados, inserções para adicionar novos dados, atualizações para modificar dados existentes e exclusões para remover dados.

**Integração com Serviços Externos:** Esta camada integra o aplicativo com serviços externos, especialmente os serviços de nuvem da _Neon Tech_. Isso envolve a comunicação com _APIs (Application Programming Interface)_ ou endpoints fornecidos por esses serviços para enviar solicitações, receber respostas e integrar os dados retornados na lógica de negócios do aplicativo.

São duas camadas do tipo _Tyers_ , camadas físicas, sendo elas  Servidor - Cliente, onde o Servidor é o backend e o cliente é a aplicação móvel. 

A seguir uma imagem que ilustra uma Arquitetura Cliente e Servidor em aplicações móveis:

<p align="center">
  <img width="460" height="300" src="https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2024-1-pe6-t2-g3-gestao-med/blob/main/docs/img/mobile%20architecture.png">
</p>


## Modelagem da Aplicação

A aplicação GestãoMed possui uma estrutura de dados que envolve principalmente informações relevantes sobre as medicações, instrução sobre as formas corretas de administração e alertas para lembrar aos seus usuários os horários de administração de medicamentos.  
 
 **Estrutura de dados e Entidades Principais:**  

 
1. **Usuário**

**name:**  Representa o nome do usuário.

**email:** Representa o email do usuário.

**phone:** Representa o número de telefone do usuário. 

**date_of_birth:** Representa a data de nascimento do usuário. 

**gender:** Representa o sexo do usuário.  

**password:** Representa a senha do usuário. 

 
2. **Medicação** 

**id:** Identificador da medicação. 

**name:** Representa o nome da medicação. 

**description:** Representa informações sobre determinado medicamento, incluindo nome, posologia e demais informações associadas. 

**stock:** Representa a quantidade de medicamentos ao iniciar um tratamento. 

**time_to_take:** Representa o horário que a medicação deve ser administrada.  


3. **Registro de tomada do medicamento** 
 
**Medication_id:** Representa o identificador da medicação tomada. 

**Medication_name:** Representa o nome da medicação tomada. 

**Time_taken:** Representa o horário em que a medicação foi tomada.

**Medication_taken:** Representa a informação se a medicação programada foi ou não administrada.


## Projeto da Interface
[Descreva o projeto da interface móvel da aplicação, incluindo o design visual, layout das páginas, interações do usuário e outros aspectos relevantes.]

### Wireframes
[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual
[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

### Layout Responsivo
[Discuta como a interface será adaptada para diferentes tamanhos de tela e dispositivos.]

### Interações do Usuário
[Descreva as interações do usuário na interface, como animações, transições entre páginas e outras interações.]

## Fluxo de Dados

A aplicação consiste em um front end desenvolvido em React Native, que proporciona uma interface móvel interativa e responsiva para os usuários. Este front end se comunica com o back end, implementado em Node.js, através de requisições HTTP. O back end é responsável por processar essas requisições, executar a lógica de negócios necessária e interagir com o banco de dados para armazenar e recuperar informações, retornando respostas adequadas ao front end para atualização e apresentação na interface do usuário. O fluxo de dados consiste no seguinte:

1. **Usuário** interage com o aplicativo mobile (por exemplo, clica em um botão).
2. **Aplicativo Mobile** (React Native) processa a entrada do usuário e prepara uma requisição HTTP.
3. **Requisição HTTP** é enviada para o back end (APIs NodeJS).
4. **Back end (APIs)** recebe a requisição, executa a lógica necessária (validações, acesso ao banco de dados, etc.), e processa a solicitação.
5. **Back end** retorna os dados solicitados ou uma mensagem de confirmação.
6. **Aplicativo Mobile** recebe a resposta, atualiza a interface do usuário (UI) conforme necessário.

Exemplos de fluxos de dados da aplicação:

**Cadastro de medicamento:**

1. **Usuário** preenche informações do medicamento na tela de cadastro de medicamentos: Nome, Descrição, Estoque inicial e Período de uso; e clica em Cadastrar.
2. **Aplicativo Mobile** verifica se todos os campos obrigatórios foram preenchidos e se os dados estão no formato correto e envia requisição no endpoint “/medication” com o verbo “POST”.
3. **Back end** recebe a requisição, faz as validações, caso os dados estejam válidos salva as informações do medicamento no banco de dados e retorna uma resposta com código de status 201, caso alguma informação informada não seja válida é retornado um erro com o respectivo código de status.
4. **Aplicativo Mobile** recebe a resposta e informa ao usuário o sucesso ou falha no cadastro do medicamento.


**Consulta dos medicamentos:**

1. **Usuário** acessa a tela de medicamentos.
2. **Aplicativo Mobile** envia requisição no endpoint “/medications” com o verbo “GET”.
3. **Back end** recebe a requisição, faz as validações, caso a requisição esteja correta e o usuário logado na aplicação tenha medicamentos cadastrados é retornada uma lista com os medicamentos do usuário, caso o usuário não tenha medicamentos cadastrados o retorno será vazio com o código de status 204.
4. **Aplicativo Mobile** recebe a resposta do back end e exibe a lista de medicamentos do usuário, caso a resposta seja vazia é exibida uma mensagem informando que ainda não há nenhum medicamento cadastrado.

## Requisitos Funcionais

[Liste os principais requisitos funcionais da aplicação.]

## Requisitos Não Funcionais

[Liste os principais requisitos não funcionais da aplicação, como desempenho, segurança, escalabilidade, etc.]


## Considerações de Segurança

[Discuta as considerações de segurança relevantes para a aplicação distribuída, como autenticação, autorização, proteção contra ataques, etc.]

## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

**Testes Unitários:**

- Objetivo: Validar unidades individuais de código, como funções, métodos e classes, para garantir que cada parte isolada funcione conforme o esperado.

- Ferramentas:
  -  JavaScript: Vitest versão 1.4.0
    
- Caso de teste:
  -  **Teste de validação:** onde irá testar se as entradas de dados é validada corretamente
  -  **Teste de modelo:** onde verifica se um modelo de usuário salva e recupera os dados corretamente.
  -  **Teste de serviço:** onde verifica se um serviço de autenticação valida corretamente as credenciais
  -  **Testes de API:** onde verifica se um endpoint de criação de usuário cria um usuário corretamente


**Testes de integração:**

- Objetivo: Verificar a interação correta entre diferentes componentes ou módulos da aplicação.
 
- Ferramentas:
  -  Cypress
   
- Caso de teste:
  -  **Testes de Integração de API:** Testar se uma chamada de API para criar um usuário também atualiza corretamente o banco de dados e retorna a resposta esperada.
  -  **Testes de Integração de Banco de Dados:** Testar se a criação de um registro de usuário atualiza as tabelas relacionadas corretamente.
  -  **Testes de Integração de Frontend e Backend:** Testar se um formulário de login no frontend envia a requisição correta ao backend e processa a resposta adequadamente.


**Caso de testes**

**Requisitos Funcionais:**

**1)  Cadastro de Usuários**
- Clicar em Criar Usuário na tela de login.
- Preencher os campos: nome, sobrenome, e-mail, senha, Estado, Cidade, gênero, data de nascimento.
- Clicar em Criar Usuário, para verificar se a aplicação é bem-sucedida caso os dados sejam válidos, ou se dá erro caso os dados sejam inválidos.

**2) Autenticação de Usuários**
- Preencher as credenciais (e-mail e senha).
- Verificar se o login é bem-sucedido ou mal-sucedido clicando em entrar.

**3) Cadastro de Medicamentos e Alarmes**
- Selecionar a opção Cadastro de Medicamentos que fica na home da aplicação.
- Preencher os campos: nome do medicamento, estoque Inicial, período de uso e  horários programados para alarme.
- Clicar em adicionar.

**4)  Editar medicamentos cadastrados**
- Selecionar a opção Cadastro de Medicamentos que fica na home da aplicação.
- Selecionar o medicamento que deseja editar.
- Editar a opção desejada. 
- Clicar na opção Guardar Alteração.

**5)  Confirmar ingestão de medicamento**
- Tocar na notificação que aparece na tela do celular que indica o horário correto para a ingestão do medicamento.
- Clicar no botão “Confirmar Ingestão”.

**6)  Consultar Histórico de Ingestão de Medicamentos**
- Selecionar a opção Histórico de ingestão.
- Selecionar o período desejado (dia, semana, mês, ano), onde será retornado o histórico de ingestão de medicamento desse período.


**Requisitos Não Funcionais:**

**1) Portabilidade**
- Testar a responsividade em diferentes dispositivos e tamanho de tela.
- Avaliar a navegabilidade do usuário.
 
**2) Segurança**
- Testar a aplicação contra Injeção SQL.
- Verificar a proteção contra ataques de XSS e CSRF.
- Testar a sobrecarga do sistemas contra ataques DDOs.
  
	**3) Desempenho**
- Medir o tempo de resposta para operações críticas sob carga normal.
- Testar a estabilidade da aplicação durante picos de carga.
  
**4) Usabilidade**
- Testar a facilidade de aprendizado do sistema.
- Testar a eficiência de uso da aplicação.
  
**5) Confiabilidade**
- Testar a disponibilidade referindo-se ao tempo em que o sistema está acessível aos usuários.
- Verificar a capacidade do sistema de continuar operando corretamente mesmo diante de falhas ou condições adversas.
- Testar a habilidade do sistema de se recuperar rapidamente e eficientemente após uma falha.


# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
