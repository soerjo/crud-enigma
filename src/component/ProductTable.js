import { Component } from "react";
import { Button, Card, CardHeader, Container, Table } from "reactstrap";
import ProductEditModal from "./ProductEditModal";

class ProductTable extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    console.log("panggil toggle");
    this.setState({ modal: !this.state.modal });
  };

  generateTableRow = () => {
    const { products, edit, hapus } = this.props;
    let rows = (
      <tr>
        <td colSpan="10" className="table-warning text-center">
          <strong>
            <em>No Product(s) yet</em>
          </strong>
        </td>
      </tr>
    );

    if (products.length > 0) {
      rows = products.map((product, index) => {
        return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <Button color="info" size="sm" onClick={this.toggle}>
                edit
              </Button>{" "}
              <Button onClick={() => hapus(index)} color="danger" size="sm">
                hapus
              </Button>
              <ProductEditModal
                edit={edit}
                toggle={this.toggle}
                modal={this.state.modal}
                product={product}
                form={this.props.form}
                id={index}
              />
            </td>
          </tr>
        );
      });
    }
    return rows;
  };

  render() {
    // console.log(this.props);
    const { products } = this.props;
    return (
      <Container>
        <Card className="shadow">
          <CardHeader tag="strong">Products ({products.length})</CardHeader>
          <Table striped hover responsive className="m-0">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th colSpan="2" width="20%">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>{this.generateTableRow(products)}</tbody>
          </Table>
        </Card>
      </Container>
    );
  }
}

export default ProductTable;
