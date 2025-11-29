# MatchUP — Conecte-se com Pessoas Próximas

O **MatchUP** é um aplicativo de encontros baseado em geolocalização, desenvolvido com o objetivo de aproximar pessoas que estão realmente próximas. Inspirado no modelo de apps tradicionais de match, o MatchUP traz como diferencial o foco em conexões locais, facilitando encontros presenciais, rolês casuais e até divisão de custos entre pessoas da mesma região.

## 🚀 Funcionalidades Principais
- Cadastro e Login (Firebase Authentication)
- Criação e edição de perfil (foto, bio, idade, interesses)
- Localização em tempo real e definição de raio de busca
- Sistema de Likes
- Match automático quando há interesse mútuo
- Chat em tempo real (Firestore)
- Upload de fotos (Firebase Storage)
- Interface Web (Next.js)
- App Mobile Android (Kotlin)

## 🧱 Tecnologias Utilizadas
### Front-end Web
- Next.js  

### Mobile
- Kotlin (Android)  

### Backend / Serviços
- Firebase Authentication  
- Firebase Firestore  
- Firebase Storage  
- Firebase Hosting  

## 🏗️ Arquitetura do Projeto
O MatchUP utiliza o conceito de **BaaS (Backend as a Service)** através do Firebase.  
Fluxo Geral:
1. Usuário cria conta via Firebase Auth  
2. Dados são armazenados no Firestore  
3. Fotos enviadas ao Firebase Storage  
4. Aplicação filtra perfis por localização e preferências  
5. Quando ocorre interesse mútuo, um Match é gerado  
6. Chat é habilitado em tempo real  

## 📦 Instalação e Execução

### Requisitos
- Node.js 18+
- Android Studio
- Firebase
- Git

### Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/matchup.git
cd matchup
```

### Configurar Firebase
1. Criar projeto
2. Ativar Authentication, Firestore e Storage  
3. Inserir firebaseConfig no projeto

### Rodar versão Web
```bash
cd web
npm install
npm run dev
```

### Rodar versão Mobile
Abrir no Android Studio e executar.

## 🗄️ Estrutura do Firestore
```
users/
likes/
matches/
messages/
```

## 🧪 Testes
- Testes de autenticação
- Match
- Localização
- Chat em tempo real
- Upload de fotos

## 📌 Melhorias Futuras
- Verificação de identidade
- Sistema premium
- Chamada de vídeo
- Filtros avançados

## 👤 Autor
Alex Expedito Silva Santos

## 📚 Licença
MIT License
