import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/(ui)/Navbar';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config/wagmi';
import Web3ModalProvider from '@/context/web3modal';
import { ReduxProvider } from '@/redux/reduxProvider';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dryp Finance',
  description: 'Crosschain lending and borrowing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang='en'>
      <body className='bg-[#111111] min-h-[100vh] font-grotesk text-white bg-[url("/assets/images/bg6.svg")] bg-cover bg-no-repeat'>
        <Web3ModalProvider initialState={initialState}>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
