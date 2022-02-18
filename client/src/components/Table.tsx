import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import TableCompo from "./TableCompo";
import TableForm from "./TableForm";

// interface TableData = {
//   date: string,
//   detail: string,
//   price: number
// }

const TableComponent = styled.header`
  padding: 5rem 2rem;
  //   height: 60vh;
`;

const ExpenseTableContainer = styled.div`
  //   background-color: #63c5da;
  background-color: #52b2bf;
  margin-bottom: 1rem;
`;
export const Table = () => {
  const [tableData, setTableData] = useState<string[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/api/table")
      .then((res) => res.json())
      .then((res) => setTableData(res))
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <>
      <TableComponent>
        <TableForm />
        <ExpenseTableContainer>
          <Row>
            <Col>Date</Col>
            <Col xs={6}>Expense detail</Col>

            <Col>Price</Col>
            <Col xs={1}></Col>
            <Col xs={1}></Col>
          </Row>
        </ExpenseTableContainer>
        {tableData != null &&
          tableData.map((data: any) => {
            return <TableCompo key={data.id} data={data} />;
          })}
      </TableComponent>
    </>
  );
};
