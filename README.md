This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## This project is using Tailwind CSS
This project is using Tailwind CSS, so please make sure that Tailwind CSS already installed. If not, then you may need to install it first.

## Make sure dependecies below are installed:
- @heroicons/react (npm install @heroicons/react) collection of icons
- @headlessui/react (npm install @headlessui/react)
- zustand (npm install zustand) is used for state management
- appwrite (npm install appwrite) is used for storing data

## Make sure directories below are exist:
- store, contains 4 files: `AlertStore.ts, Board.ts, ModalStore.ts, InviteeStore.ts`;
- lib, this directory contains  a file: `service.ts` which is used for APIs integration

## File .env.local
Please check and make sure that file `.env.local` contains credentials below:
- NEXT_PUBLIC_APPWRITE_ENDPOINT
- NEXT_PUBLIC_APPWRITE_PROJECT_ID
- NEXT_PUBLIC_APPWRITE_DATABASE_ID
- NEXT_PUBLIC_APPWRITE_COLLECTION_ID

The credentials above are used for Appwrite configurations. Please visit https://appwrite.io/docs for more details.
