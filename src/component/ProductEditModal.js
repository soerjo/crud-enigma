import React, { Component } from "react";
import {
  ModalBody,
  ModalHeader,
  Modal,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const productName = RegExp("^(?=.*[A-Za-z])");
const quantity = RegExp("^(?=.*[0-9])");
const price = RegExp("^(?=.*[0-9])");

const formValid = ({ form, submitEnable, ...name }) => {
  let valid = true;

  // form adalah properti objek
  // name adalah kumpulan properti biasa

  // variabel ini gunanya untuk konversi
  // undefined atau null menjadi sebuah objek
  // console.log("isi dari form di formValid", form);
  const newObj = form || {};
  // console.log("isi dari form di newObje", newObj);
  // console.log("isi name", name);

  // validasi ketika form error atau empty
  if (Object.keys(newObj).length > 0) {
    Object.values(newObj).forEach((val) => {
      // console.log("object empty: ", val);
      val.length > 0 && (valid = false);
    });
  } else {
    valid = false;
  }

  // console.log("isi dari objectkeys", Object.keys(name).length);
  // console.log("isi dari objectkeys", Object.keys(newObj).length);
  if (Object.keys(name).length === Object.keys(newObj).length) {
    //validasi ketika ada yg salah satu kosong
    Object.values(name).map((val) => {
      //kalo pake map musti siapin nilai return
      // console.log("object 2: ", val);
      val === null && (valid = false);
      return (valid = true);
    });
  } else {
    valid = false;
  }

  return valid;
};

export class ProductEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      quantity: this.props.quantity,
      price: this.props.price,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("gue mau ngecek", this.state);
    if (formValid(this.state)) {
      const { form, ...data } = this.state;
      this.props.edit(data, this.props.id);
    } else {
      alert("kayaknya ada yang salah");
    }
    this.props.toggle();
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { form } = this.props;
    let submitEnable = true;
    switch (name) {
      case "name":
        form.name = productName.test(value)
          ? ""
          : "Cannot be input number first and empty";
        break;
      case "quantity":
        form.quantity = quantity.test(value)
          ? ""
          : "Cannot be input character and empty";
        break;
      case "price":
        form.price = price.test(value)
          ? ""
          : "Cannot be input character and empty";
        break;
      default:
        console.log("do nothing");
        break;
    }
    this.setState({ form, [name]: value, submitEnable: submitEnable });
  };
  render() {
    const { toggle, modal, form } = { ...this.props };
    const { name, quantity, price } = { ...this.state };
    console.log("isi state sekarang: ", this.state);
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="name" sm="4">
                  Name
                </Label>
                <Col sm="8">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter name"
                    onChange={this.handleInputChange}
                    className={form.name.length > 0 ? "error" : null}
                  />
                  {form.name.length > 0 ? (
                    <span className="errorMessage">{form.name}</span>
                  ) : null}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="quantity" sm="4">
                  Quantity
                </Label>
                <Col sm="8">
                  <Input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    placeholder="Enter quantity"
                    onChange={this.handleInputChange}
                    className={form.quantity.length > 0 ? "error" : null}
                  />
                  {form.quantity.length > 0 ? (
                    <span className="errorMessage">{form.quantity}</span>
                  ) : null}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="price" sm="4">
                  Price
                </Label>
                <Col sm="8">
                  <Input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    placeholder="Enter price"
                    onChange={this.handleInputChange}
                    className={form.price.length > 0 ? "error" : null}
                  />
                  {form.price.length > 0 ? (
                    <span className="errorMessage">{form.price}</span>
                  ) : null}
                </Col>
              </FormGroup>
              <Button type="submit" color="primary" size="sm">
                Edit
              </Button>
              {"  "}
              <Button color="danger" size="sm" onClick={toggle}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ProductEditModal;
