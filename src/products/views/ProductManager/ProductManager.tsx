import Container from "@saleor/macaw-ui/Container";
import PageHeader from "@saleor/macaw-ui/PageHeader";
import React from "react";

import ProductCreateForm from "../../components/ProductCreatePage/form";

const ProductManager: React.FC = props => (
  <>
    <Container>
      <PageHeader title={"Agrega tus productos"} />
      <div>mira papu aca soy yo el que crea produtos</div>
      <form>{() => <input type="text" placeholder="hello papi" />}</form>
    </Container>
  </>
);

export default ProductManager;
