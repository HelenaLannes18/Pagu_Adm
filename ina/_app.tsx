import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { ModalProvider } from '@/providers/modal-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Dashboard',
    description: 'E-Commerce Dashboard',
};

//@ts-ignore
export default async function App({ Component, pageProps }) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId,
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    };


    const router = useRouter();

    useEffect(() => {
        //@ts-ignore
        const handleRouteChange = (url) => {
            // Perform any necessary actions when the route changes
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{metadata.title}</title>
                    <meta name="description" content={metadata.description} />
                </head>
                <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <ToastProvider />
                        <ModalProvider />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
