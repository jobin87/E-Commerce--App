import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CartPage } from 'src/sections/products/add-cart';

const metadata = { title: `Report - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CartPage/>
    </>
  );
}
