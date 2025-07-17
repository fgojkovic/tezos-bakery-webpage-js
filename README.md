# TezBake - Premium Tezos Baking Services

A modern, high-performance website for a Tezos baking service built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🚀 **Next.js 14** - Latest version with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Smooth animations and interactions
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance Optimized** - Fast loading and smooth scrolling
- 🔍 **SEO Optimized** - Meta tags and structured data
- 🎯 **Modern UI/UX** - Contemporary design with engaging visuals

## Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
tezos-bakery-site/
├── app/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Customization

### Colors
Update the Tezos brand colors in `tailwind.config.js`:
```javascript
colors: {
  tezos: {
    blue: '#2d7ff9',
    dark: '#1a1a1a',
    gray: '#6b7280',
  }
}
```

### Content
- Update baker information in `app/lib/constants.js`
- Modify sections in `app/page.js`
- Add your baker address and social links

### Deployment

Deploy to Vercel:
```bash
npm run build
vercel --prod
```

## Performance Features

- Optimized images with Next.js Image component
- Lazy loading for smooth scrolling
- Minimal bundle size with tree shaking
- Fast refresh during development

## License

MIT License - feel free to use this for your Tezos baking service!

## Support

For questions or support, please contact the development team.