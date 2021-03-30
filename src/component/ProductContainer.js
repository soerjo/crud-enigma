import { Component, Fragment } from "react";
import { Row } from "reactstrap";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import swal from "sweetalert";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // menyimpan pesan error bersifat sementara
      form: {
        name: "",
        quantity: "",
        price: "",
      },
      // menyimpan input data yg benar
      products: [],
    };
  }

  FormSubmit = (value) => {
    // console.log("value: ");
    const { products } = { ...this.state };
    products.push(value);
    this.setState({ ...this.state, products: products });
  };

  handleDelete = (id) => {
    console.log("ilangin di index yang ", id);
    const { products } = { ...this.state };
    // console.log("isi delProduct", products);

    //pake filter
    this.setState({
      products: products.filter((product, index) => index !== id),
    });

    // menggunakan splice
    // products.splice(id, 1);
    // this.setState({ ...this.state, products: products });
  };

  handleEdit = (value, id) => {
    console.log("id: ", id);
    const { products } = { ...this.state };
    console.log("isi delProduct", products);
    products[id] = value;
    console.log("isi delProductid", products);
    this.setState({ ...this.state, products: products });
    console.log("berhasil Edit sesuatu");
    swal("Yeay!", "berhasil Edit!", "success");
  };

  render() {
    const { form, products } = { ...this.state };
    console.log("product container: ", products);
    return (
      <Fragment>
        <Row>
          <ProductForm
            form={form}
            products={products}
            submit={this.FormSubmit}
          />
          <ProductTable
            products={products}
            edit={this.handleEdit}
            hapus={this.handleDelete}
            form={form}
          />
        </Row>
      </Fragment>
    );
  }
}

export default ProductContainer;
