import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { HomePage } from 'src/sections/products/home';

const metadata = { title: `Report - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomePage/>
    </>
  );
}
