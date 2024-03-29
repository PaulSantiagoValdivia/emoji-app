import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html >
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,900&family=Outfit:wght@400;700&family=Poppins:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body style={{ margin: 0, backgroundColor: '#030303' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
