import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import AdminPage from 'src/sections/products/AdminPage';
import { CheckoutPage } from 'src/sections/products/checkout';

const metadata = { title: `Report - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminPage/>
    </>
  );
}
