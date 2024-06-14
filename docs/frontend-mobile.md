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

 
**1. Usuário**

**name:**  Representa o nome do usuário.

**email:** Representa o email do usuário.

**phone:** Representa o número de telefone do usuário. 

**date_of_birth:** Representa a data de nascimento do usuário. 

**gender:** Representa o sexo do usuário.  

**password:** Representa a senha do usuário. 

 
**2. Medicação** 

**id:** Identificador da medicação. 

**name:** Representa o nome da medicação. 

**description:** Representa informações sobre determinado medicamento, incluindo nome, posologia e demais informações associadas. 

**stock:** Representa a quantidade de medicamentos ao iniciar um tratamento. 

**time_to_take:** Representa o horário que a medicação deve ser administrada.  


**3. Registro de tomada do medicamento** 
 
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

[Diagrama ou descrição do fluxo de dados na aplicação.]

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

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.
