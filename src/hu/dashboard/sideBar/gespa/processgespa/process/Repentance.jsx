import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";

const Repentance = () => {
  const [cartera, setCartera] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const handleBuscar = () => {
    console.log("Buscar:", {
      cartera,
      cuenta,
      busqueda,
    });
  };

  return (
    <Container fluid className="py-4">
      {/* Logos */}
      <Row className="mb-4 justify-content-center">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-3">
            <Image
              src="/path/to/consorcio-logo.png"
              alt="Consorcio Jurídico"
              height={60}
            />
            <Image
              src="/path/to/proyecto-logo.png"
              alt="Proyecto"
              height={60}
            />
          </div>
        </Col>
      </Row>

      {/* Formulario */}
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="d-flex flex-column gap-3">
            {/* Select Cartera */}
            <Form.Group controlId="cartera">
              <Form.Select
                value={cartera}
                onChange={(e) => setCartera(e.target.value)}
                className="bg-light"
              >
                <option value="">Cartera</option>
                <option value="amex">American Express</option>
                <option value="banamex">Banamex</option>
                <option value="santander">Santander</option>
                <option value="hsbc">HSBC</option>
              </Form.Select>
            </Form.Group>

            {/* Select Cuenta */}
            <Form.Group controlId="cuenta">
              <Form.Select
                value={cuenta}
                onChange={(e) => setCuenta(e.target.value)}
                className="bg-light"
              >
                <option value="">Cuenta</option>
                <option value="individual">Individual</option>
                <option value="archivo">Archivo</option>
                <option value="lote">Lote</option>
              </Form.Select>
            </Form.Group>

            {/* Input + Botón */}
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-grow-1"
              />
              <Button 
                variant="success" 
                onClick={handleBuscar}
                className="px-4"
              >
                Buscar
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Repentance;