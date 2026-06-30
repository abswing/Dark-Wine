# Contos da Adega

Site fictício temático de vinhos com design editorial e atmosfera sofisticada.

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Página inicial — hero, galeria, processo, depoimentos, CTA para o SAC |
| `collection.html` | A Coleção — catálogo de vinhos com filtros por tipo |
| `club.html` | Clube da Adega — planos de assinatura |
| `sac.html` | Atendimento ao Cliente — formulário de contato |

## Tech Stack

| Categoria | Tecnologia |
|---|---|
| Markup | HTML5 semântico |
| Estilo | Tailwind CSS (CDN) + CSS customizado |
| Ícones | Bootstrap Icons |
| Carrossel | Swiper.js (apenas `index.html`) |
| Scripts | JavaScript vanilla |

## Estrutura de pastas

```
Dark-Wine/
├── index.html              # Página inicial (raiz)
├── tailwind.config.js
├── pages/
│   ├── collection.html     # A Coleção
│   ├── club.html           # Clube da Adega
│   └── sac.html            # Atendimento ao Cliente
├── js/
│   └── script.js           # Navbar, scroll, reveal, modal, SAC form
├── styles/
│   └── style.css           # Estilos customizados (navbar scrolled, active, reveal, etc.)
└── assets/
    └── images/
        ├── home/           # Imagens da página inicial (hero, galeria, coleção)
        ├── collection/     # Imagens dos vinhos (tintos, brancos, espumantes)
        ├── club/           # Imagens do Clube da Adega
        └── sac/            # Imagens do SAC
```

## Como rodar

Projeto estático — basta abrir qualquer `.html` diretamente no navegador ou servir com um servidor local:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

## Funcionalidades

- Navbar com efeito *pill scrolled*, active state por página e menu mobile
- Hero com animações CSS de entrada
- Galeria com Swiper.js (drag, paginação, navegação)
- Contador de estatísticas animado ao entrar em viewport
- Carrossel de depoimentos com rotação automática
- Filtros de coleção com scroll horizontal no mobile
- Modal de autenticação (login / cadastro) com validação e medidor de senha
- Formulário SAC com validação de campos e toast de confirmação
- Barra de progresso de leitura e botão "voltar ao topo"
