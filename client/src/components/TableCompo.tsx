import React from "react";
import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import { RiDeleteBinFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

interface TableCompoProps {
  data: any;
  handleDelete: Function;
}

const ExpenseTableContainer = styled.div`
  background-color: #78e1f0;
  margin-bottom: 0.7rem;
`;

const TableCompo = ({ data, handleDelete }: TableCompoProps) => {
  
  return (
    <>
      <ExpenseTableContainer>
        <Row>
          <Col>{data.date}</Col>
          <Col xs={6}>{data.detail}</Col>
          <Col>${data.price}</Col>
          <Col xs={1}>
            <Button variant="light">
              <AiFillEdit />
            </Button>
          </Col>
          <Col xs={1}>
            <Button variant="light">
              <RiDeleteBinFill onClick={() => handleDelete(data._id)} />
            </Button>
          </Col>
        </Row>
      </ExpenseTableContainer>
    </>
  );
};

export default TableCompo;
