Simple Chrome extension developed in ReactJs TypeScript utilizing TailwindCSS and Plasmo, that allows you to select content on a page and run available prompts against ChatGPT with the selected content.

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

NOTE: This personal project was rushed as a learning/upskilling exercise and is not production quality.

## Prerequisite before running in development or building to production
When running the chrome extension in local development or production, create a `.env.development` and `.env.production` file and use refer to `.env.example` on how to populate it. Initialize `CRX_PUBLIC_KEY` with your ChatGPT API Key in order your the requests to be successful.


## Showcase

![Alt text](./assets/extension.png?raw=true 'Selecting keywords prompt and response')


## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
