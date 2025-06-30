// ______________________________________________________

// ____________________________________________________________/

const ROOTS = {
  DASHBOARD: "/dashboard",
};

export const paths = {
  dashboard: {
    product: {
      root: `${ROOTS.DASHBOARD}`,
      cart: `${ROOTS.DASHBOARD}/product/add-cart`,
      checkout: (id: string)=>`${ROOTS.DASHBOARD}/product/checkout/${id}`,
      details:  (id: string)=>`${ROOTS.DASHBOARD}/product/product-details/${id}`,
      addproduct:`${ROOTS.DASHBOARD}/product/addproduct`
    },
  },
};

