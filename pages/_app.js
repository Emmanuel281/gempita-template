import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  // default theme setup
  //

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />

        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <Script
        id="adsbygoogle-init"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7318008351867392"
        onLoad={() => console.log("adsbygoogle-init")}
      />
      <Script
        id="analyticbygoogle-init"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
        src="https://www.googletagmanager.com/gtag/js?id=G-SB7NJ7M63B"
        onLoad={() => console.log("analyticbygoogle-init")}
      />
      <Script id="analynictbygoogle-code-init" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                      dataLayer.push(arguments);
                    }
                    gtag("js", new Date());
                  
                    gtag("config", "G-SB7NJ7M63B");
                `}
      </Script>
      <Component {...pageProps} />
    </>
  );
};

export default App;
