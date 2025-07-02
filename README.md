# Portfolio

Este é um projeto de **portfólio pessoal** desenvolvido com **React** e **Material UI**, com foco em uma interface limpa, moderna e responsiva. Ele apresenta temas customizados (claro e escuro), gerenciamento centralizado de estilos e potencial para expansão com novas seções.

## ✨ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [Vite](https://vitejs.dev/) _(opcional, dependendo da sua stack)_
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [React Router](https://reactrouter.com/) _(se houver navegação)_

## 🌗 Tema Personalizado

O sistema de temas foi customizado com base no Material UI, permitindo alternância entre os modos **claro** e **escuro**.

### Exemplo de uso:

```tsx
const theme = createAppTheme("light"); // ou 'dark'
```

## 📁 Estrutura de Pastas

```
portfolio/
├── public/
│ ├── locales/ # Traduções reutilizáveis
├── src/
│ ├── assets/ # Componentes reutilizáveis
│ ├── components/ # Componentes reutilizáveis
│ ├── pages/ # Páginas principais do site
│ ├── routes/ # Sistema de rotas do site
│ ├── store/ # Gerenciador de estado global
│ ├── theme/ # Arquivo createAppTheme.ts
│ ├── utils/ # Funções utilitárias
│ └── App.tsx
├── .eslintrc.json
├── tsconfig.json
└── README.md
```

## 📦 Instalação

Clone o projeto e instale as dependências:

```
git clone https://github.com/guilhermesenci/new_portfolio
cd portfolio
npm install
```

## 🧪 Lint + Formatação

```
npm run lint
```

Analisar o código com ESLint

```
npm run format
```

Formatar com Prettier (se configurado)

## 🚀 Rodar Localmente

```
npm run dev
```

## ✅ Todo

✅ - Estrutura inicial com React + MUI

✅ - Tema claro/escuro com customizações

✅ - Traduções inglês/português

✅ - Responsividade mobile

Seções: Página inicial, Sobre, Projetos, História, Contato

Deploy (Vercel ou GitHub Pages)
