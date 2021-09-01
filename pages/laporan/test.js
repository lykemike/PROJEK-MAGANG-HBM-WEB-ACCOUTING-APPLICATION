// <<<<<<< HEAD
// import React, { useRef } from "react";
// import Layout from "../../components/layout";
// import TableDetailRow from "../../components/TableDetailRow";
// import TableDetailPenjualanRow from "../../components/TableDetailPenjualanRow";
// import Link from "next/link";
// import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export default function laporanjurnalumum({ header}) {
//   console.log(header);

//   return (
//     <Layout>
//       <div variant='container'>
//        <Row>

//        </Row>
//       </div>
// =======
// import React from "react";
// import { PrismaClient } from "@prisma/client";
// import Layout from "../../components/Layout";
// import Table from "@material-ui/core/Table";
// import TableContainer from "@material-ui/core/TableContainer";
// import Paper from "@material-ui/core/Paper";

// import Test from "../../components/Test";
// import Test2 from "../../components/Test2";
// const prisma = new PrismaClient();

// export default function laporanbukubesar({ header, header2 }) {
//   return (
//     <Layout>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           {header.map((data, index) => (
//             <Test data={data} key={index} />
//           ))}
//           {header2.map((data, index) => (
//             <Test2 key={index} data={data} index={index} />
//           ))}
//         </Table>
//       </TableContainer>
// >>>>>>> 971af7245a7a3e72e009c0d1c6257da6fcf22d83
//     </Layout>
//   );
// }

// export async function getServerSideProps() {

//   const header = await prisma.headerPenjualan.findMany({
//     orderBy: {
//       id: "asc",
//     },
// <<<<<<< HEAD
//     select: {
//       JurnalPenjualan: true
//     }
//   });

// =======
//     include: {
//       JurnalPenjualan: {
//         include: {
//           akun: true,
//         },
//       },
//     },
//   });

//   // const getPembelian = await prisma.headerPembelian.findMany({
//   //   orderBy: {
//   //     id: "asc",
//   //   },
//   //   include: {
//   //     JurnalPembelian: true,
//   //   },
//   // });
// >>>>>>> 971af7245a7a3e72e009c0d1c6257da6fcf22d83

//   return {
//     props: {
//       header: header,
// <<<<<<< HEAD

// =======
//       header2: getPenjualan,
//       // header3: getPembelian,
// >>>>>>> 971af7245a7a3e72e009c0d1c6257da6fcf22d83
//     },
//   };
// }
