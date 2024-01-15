import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import './globals.css'

export const metadata = {
  title: 'Crop Image app',
  description: 'Project Created by Ankit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body>
        <MantineProvider theme={{primaryColor: 'teal'}} defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}