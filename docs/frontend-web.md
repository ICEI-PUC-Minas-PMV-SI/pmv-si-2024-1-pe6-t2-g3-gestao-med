# Front-end Web

Gestão Med é uma aplicação desenvolvida para a organização e gestão da administração de medicamentos, visando facilitar o dia a dia das pessoas que dependem da ingestão de medicamentos regularmente.  O objetivo é promover o bem-estar dos usuários através de uma solução integrada para a gestão de medicamentos e acompanhamento da saúde, garantindo administração correta e segura dos medicamentos e melhorando a qualidade de vida de todos os envolvidos.

## Tecnologias Utilizadas

NEXTJS 14 TS </br>
HTML </br>
CSS (Cascading Style Sheets) </br>
JavaScript

## Arquitetura

O Front end é o componente com o qual o usuário interage. O front end fornece uma interface de usuário amigável para cadastrar os usuários e os medicamentos, editar medicamentos, entre outras funcionalidades. Ele envia solicitações à API web para que o alerta de horário de tomada do medicamento seja disparado como um alarme por meio de tela de alerta, no horário cadastrado para a tomada do medicamento.

## Modelagem da Aplicação

![modelagem](img/fluxo-requisicao-next-js.png)

## Projeto da Interface Web

### Protótipos

Tela de Login 

![login](img/login.jpg)

Tela de cadastro de usuário

![cadastrousu](img/cadastro-usuario-1.jpg)

Tela home

![home](img/home.jpg)

Tela perfil

![perfil](img/meu-perfil.jpg)

Tela de cadastro de medicamentos

![cadastromed](img/cadastro-medicamentos.jpg)

Tela de medicamentos

![medicamentos](img/medicamentos.jpg)

Tela de Lembrete/Alerta

![lembrete](img/alerta-lembrete.jpg)


### Design Visual

- Paleta de Cores </br>
Optamos por uma paleta predominante de tons azuis para o front end para proporcionar uma experiência de usuário agradável pois o azul é uma cor associada à tranquilidade, calma, confiança. A cor primária tem o código #2CA3D7. </br>

- Tipografia</br>
A fonte principal usada no corpo do texto é "Roboto”. A fonte é legível e possui uma aparência moderna.

- Botões</br>
Os botões na interface têm bordas arredondadas e prevalência na cor de fundo verde (#009588) com texto em branco para criar um contraste com o fundo escuro e facilitar a leitura para o usuário.

- Campos</br>
Os campos de preenchimento de texto têm bordas arredondadas e uma cor de fundo branca que contrasta com os textos de instrução de escrita na cor cinza, código #A5A5A5.

### Layout Responsivo

O desenvolvimento do front end responsivo tem como parte essencial a adaptação da interface do projeto para diferentes tamanhos de tela e dispositivos. Seguem abaixo maneiras de adaptação da interface: </br>

- Media Queries: Utilizaremos media queries em nosso CSS para aplicar estilos específicos com base na largura da tela. Isso permite a personalização de estilos, como alterar o tamanho das fontes, reorganizar os elementos na página e ocultar ou exibir certos conteúdos com base na resolução da tela.</br>

- Layout Flexível: O layout da página será projetado com unidades flexíveis, como porcentagens, em vez de unidades fixas, como pixels. Isso permite que os elementos da página se ajustem dinamicamente ao tamanho da tela, preenchendo o espaço disponível de forma adequada. </br>

- Menu de Navegação Adaptável: Em dispositivos móveis e tablets, podemos substituir o menu de navegação tradicional por um menu de hambúrguer, economizando espaço na tela e tornando a navegação por toque mais fácil. </br>

- Imagens Responsivas: As imagens serão configuradas para serem responsivas. Isso significa que as imagens se redimensionarão automaticamente para se ajustar ao tamanho da tela, economizando largura de banda e melhorando o desempenho.</br>

- Fontes Flexíveis: O tamanho e o estilo das fontes também serão ajustados para garantir que o texto seja legível em diferentes dispositivos. Usaremos unidades relativas, como "em" e "rem", para manter a consistência. </br>

- Testes em Múltiplos Dispositivos: A interface será testada em uma variedade de dispositivos e tamanhos de tela, desde smartphones até monitores de alta resolução. Isso ajuda a identificar problemas e garantir que a experiência do usuário seja otimizada em todos os contextos.</br>

- Componentes Interativos: Elementos interativos, como botões e caixas de entrada, serão dimensionados e espaçados adequadamente para garantir que sejam fáceis de usar em telas sensíveis ao toque e com dispositivos de entrada variados.</br>

### Interações do Usuário

O projeto foi desenvolvido com o objetivo de oferecer uma experiência prática, permitindo que pessoas de todas as idades realizem facilmente os cadastros do usuário e de medicamentos a serem tomados, além de gerarem relatórios envolvendo o histórico de ingestão de medicamentos. É esperado que o alarme retornado pelo sistema também seja compreendido facilmente.

## Fluxo de Dados

1.	O usuário fornecerá dados para cadastro do usuário e posteriormente do cadastro do medicamento. O cliente solicitará uma requisição via HTTPS utilizando o método POST / registerUser  e registerMedicate  para ambas funcionalidades;</br>
2.	A API receberá os dados do lado do cliente e irá validá-los antes de enviar ao banco de dados Postgres; </br>
3.	Após o registro no banco de dados, a API retornará com a resposta com o status 201, caso os cadastros sejam realizados com sucesso;</br>
4.	Após o retorno da API, o usuário terá seu perfil cadastro e será capaz de visualizar o medicamento registrado em sua tela de acesso.

## Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Gerenciar usuário paciente | ALTA |
|RF-002| Fazer *login*  | ALTA |
|RF-003| Gerenciar medicamentos | ALTA |
|RF-004| Disparar lembrete no horário com orientações para tomar o medicamento  | ALTA |
|RF-005| Disparar alerta de fim de estoque de medicamentos, onde a quantidade mínima para o disparo do alerta pode ser configurada pelo usuário | ALTA |
|RF-006| Gerenciar medicamentos  | MÉDIA |
|RF-007| Permitir geração de relatório de medicamentos ingeridos por meio de inteligência artificial| MÉDIA |
|RF-008| Permitir que o paciente confirme a ingestão ao ser notificado | MÉDIA |


## Requisitos Não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema atenderá ao requisito de **PORTABILIDADE** - deverá executar em qualquer plataforma | ALTA |
|RNF-002| O sistema atenderá a Lei de Geral de Proteção de Dados pessoais nº 13.709/2018 | ALTA |
|RNF-003| O sistema deverá atender ao requisito de **USABILIDADE** - facilidade no uso do sistema | ALTA |
|RNF-004| O sistema deverá atender ao requsiito de **CONFIABILIDADE** - terá alta disponibilidade 99% do tempo | ALTA |
|RNF-005| O sistema deverá usar arquitetura em camadas para desacoplamento | MÉDIA |
|RNF-006| O *Layout* do sistema deverá usar *design* responsivo, para que renderize bem em qualquer dispositivo | MÉDIA |
|RNF-007| O sistema deverá processar requisições do usuário em no máximo 3s | BAIXA |


## Considerações de Segurança

A segurança é um ponto crítico para a garantia da integridade e confiabilidade do funcionamento da aplicação. Seguem algumas considerações de segurança relacionadas ao front-end:</br>

- Autenticação e autorização da api com criação do token JWT. </br>
- Validação de dados de entrada retornando campos cuidadosamente avaliados.


## Implantação

A implantação do front end exige criar um projeto na Vercel, importando o repositório do github relacionado ao projeto desejado. É necessário inserir as variáveis de ambiente que o projeto exige e que estão listadas abaixo, e depois fazer o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da Vercel.</br>

Variáveis de ambiente:</br>
- AUTH_URL=http://localhost:3000/api/auth </br>
- AUTH_SECRET=testsecret </br>
- JWT_SECRET=secretjwt </br>
- BASE_URL=http://localhost:3333.


## Testes

1 - Preparação dos Casos de Teste</br>

1.1. Os casos de testes incluem a validação de todos os casos de uso, de acordo com a regra de negócio, verificando se as requisições atendem ao desejado.</br>

1.2. Com base nos requisitos de negócio identificados, foram criados casos de teste que cobriram todos os cenários possíveis, incluindo casos de sucesso e casos de erro.

2 – Testes </br>

2.1. Os testes realizados serão manuais, de integração e de carga.

# Referências

GANDEE, Todd; AQUINO, Chris. Front-End Web Development: The Big Nerd Ranch Guide. Big Nerd Ranch Guides (O’Reilly). ISBN: 9780134432595.</br>
Entendendo Next.js e aplicando suas funcionalidades. Em: https://blog.geekhunter.com.br/o-que-e-next-js/</br>
Next.js on Vercel. Em: https://vercel.com/docs/frameworks/nextjs</br>

