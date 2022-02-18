import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import TableCompo from "./TableCompo";
import TableForm from "./TableForm";

interface TableData {
  id: String,
  date: String,
  detail: String,
  price: number
}

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
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/table")
      .then((res) => res.json())
      .then((res) => setTableData(res))
      .catch((err) => console.log("err", err));
  }, []);

  const handleDelete = (id: string) => {
    
    fetch(`http://localhost:8001/api/table/${id}`, { method: "DELETE" })
      .then((res) => {
        if(res.status === 200){
          return res.json()
        }else{
          throw new Error('Unable to delete entry')
        }
      })
      .then((data) => {
        setTableData(prev => prev?.filter(item => item?.id !== data.docs._id))
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <>
      <TableComponent>
        <TableForm setTableData={setTableData} />
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
            return <TableCompo key={data.id} data={data} handleDelete={handleDelete} />;
          })}
      </TableComponent>
    </>
  );
};
