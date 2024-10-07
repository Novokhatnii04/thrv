import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Thrive',
  description:
    'Get exclusive deals and discounts from the best brands and stores quickly and easily. Try it now!',
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="1cad7fdd-5bf1-4a3c-8f08-17ef10979b08"
        />
        <Script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                function OptanonWrapper() { }
              `,
          }}
        />
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          
           const list = ['localhost'];
           if (list.includes(window.location.hostname)) {
               window.fbq = function() {};
           }
          
           fbq('consent', 'revoke');
          `}
        </Script>
        <meta charSet="UTF-8" />
        <meta name="robots" content="follow, index" />
        <meta name="keywords" content="thrive, card, thrive card, promo code" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://info.thrivecard.co.uk/favicon/apple-touch-icon.png?v=1.4"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://info.thrivecard.co.uk/favicon/favicon-32x32.png?v=1.4"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://info.thrivecard.co.uk/favicon/favicon-16x16.png?v=1.4"
        />
        <link
          rel="manifest"
          href="https://info.thrivecard.co.uk/favicon/site.webmanifest?v=1.4"
        />
        <link
          rel="mask-icon"
          href="https://info.thrivecard.co.uk/favicon/safari-pinned-tab.svg?v=1.4"
          color="#000000"
        />
        <link
          rel="shortcut icon"
          href="https://info.thrivecard.co.uk/favicon/favicon.ico?v=1.4"
        />
        <meta
          name="msapplication-config"
          content="https://info.thrivecard.co.uk/favicon/browserconfig.xml?v=1.4"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        {/* Verifications */}
        <meta name="webgains-site-verification" content="jmhajtmh" />
        <meta name="fo-verify" content="137981e0-2b0a-4abe-8e0c-dbab9c487f20" />
        <meta name="verify-admitad" content="557d7b5b11" />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
};

export default RootLayout;
