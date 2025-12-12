# profile-website

## Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

- Styling using Tailwindcss - https://tailwindcss.com/docs/guides/nuxtjs
- Nuxt Images - https://image.nuxt.com/get-started/installation
- Markdown content pages - https://content.nuxt.com/get-started/installation

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

Start the development server on `http://localhost:3000`

```bash
yarn dev -o
```

### Production

Build the application for production:

```bash
yarn generate
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

### Updating packages

Update all dependencies to their latest versions within the constraints specified in package.json:
`yarn upgrade --latest`

## Added Testing with Vitest and Vue Testing Library

`yarn add --dev @nuxt/test-utils vitest @vue/test-utils happy-dom playwright-core`

See more here: https://nuxt.com/docs/4.x/getting-started/testing

### Running Tests

`yarn test`

Run Vitest in watch mode: runs the test suite and automatically re-runs the affected tests when you change source or test files.
