# MAK Embreagens — Site institucional

Site da **MAK Embreagens**, oficina de embreagem e transmissão em Contagem/MG. Objetivo claro: mostrar a empresa, os serviços e mandar o cliente pro WhatsApp pra orçamento.

Freela real — HTML, CSS e JS puro, mobile-first, com fotos da fachada e das peças.

**No ar:** https://eukevytosdev.github.io/mak-embreagens/

## O que o site entrega

- Hero com slides da fachada (desktop) e das peças (mobile)
- Seções de diferenciais, sobre, serviços e contato
- CTA fixo / botões pro WhatsApp
- Menu responsivo
- Animações leves no scroll (reveal + contadores)

Nada de formulário complexo: o caminho principal é conversa no WhatsApp.

## Stack

HTML5 · CSS3 (variáveis de marca) · JavaScript vanilla

Fontes: Barlow Condensed + Manrope.

## Pastas

```text
mak-embreagens/
├── index.html
├── css/
│   ├── variaveis.css
│   └── styles.css
├── js/
│   └── main.js          # menu, scroll, slides, contadores
├── assets/img/          # fachada, peças, logo, marcas
└── stories/             # materiais de divulgação (stories/mockups)
```

## JS no `main.js`

- Sombra no header ao rolar
- Menu mobile com `aria-expanded`
- `IntersectionObserver` pra revelar blocos
- Contadores animados (`data-count`)
- Carrossel simples no hero

## Rodar local

```bash
git clone https://github.com/euKevytosDev/mak-embreagens.git
cd mak-embreagens
```

Abre o `index.html` no navegador ou com Live Server.

## Autor

Raian Kevin — [@euKevytosDev](https://github.com/euKevytosDev) · [portfólio](https://github.com/euKevytosDev/portfolio-raian)
