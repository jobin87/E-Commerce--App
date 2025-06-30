import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProductDetailPage } from 'src/sections/products/product-details';

const metadata = { title: `Report - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailPage/>
    </>
  );
}
