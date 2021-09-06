import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import AsetTetap from "../../components/Neraca/AsetTetap";
import AsetLancar from "../../components/Neraca/AsetLancar";
import AsetLainnya from "../../components/Neraca/AsetLainnya";
import LiabilitasJangkaPendek from "../../components/Neraca/LiabilitasJangkaPendek";
import LiabilitasJangkaPanjang from "../../components/Neraca/LiabilitasJangkaPanjang";
import Modal from "../../components/Neraca/Modal";
import { Button, Table, DropdownButton,Row,Col,Form,FormControl,InputGroup, Dropdown } from 'react-bootstrap';


export default function laporan_neraca({ header, header2,header3,header4,header5,header6}) {
    const tgl_mulai = useRef(null);
    const tgl_akhir = useRef(null);
    const onClick = () => {
      // Axios.get()
    };

    return (
        <Layout>
        <div variant="container">
        <div></div>
        <h4 class="mb-6 mt-2">Trial Balance</h4>
        <div class="mb-10">
          <Row>
            <Col sm="3">
              <Form.Label>Tanggal Mulai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_mulai} />
              </InputGroup>
            </Col>
            <Col sm="3">
              <Form.Label>Tanggal Selesai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_akhir} />
              </InputGroup>
            </Col>

            <Col>
              <Button variant="primary mr-2 mt-7" onClick={onClick}>
                {" "}
                Filter
              </Button>
            </Col>
          </Row>

          <div class="flex flex-row-reverse">
            <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
              <Dropdown.Item>
                <Link href="#">
                  <a>PDF</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
              <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <table class="min-w-full table-auto">
          <thead class="justify-between">
            <tr class="bg-dark">
              <th class="px-2 py-2" colSpan="3">
                <span class="text-gray-300">Data</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
              <th>Aset</th>
              <AsetLancar label="Aset Lancar" data={header} />
              <AsetTetap label="Aset Tetap" data={header2} />
              <AsetLainnya label="Aset Lainnya" data={header3} />
              <th>Liabilitas dan Modal</th>
              <LiabilitasJangkaPendek label="Liabilitas Jangka Pendek" data={header4} />
              <LiabilitasJangkaPanjang label="Liabilitas Jangka Panjang" data={header5} />
              <Modal label="Modal" data={header6} />
          </tbody>
          <tfoot>
            <tr>
              <td class='px-2 py-1' align='right'>
                Grand Total
              </td>
              {/* <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
     </Layout>	
    )
}


export async function getServerSideProps() {

    const asetLancar = await prisma.akun.findMany({
      where: {
       kategoriId :{
           in: [3,1,2,4],
       }
      },
    });

    const asetTetap = await prisma.akun.findMany({
        where: {
         kategoriId :{
             in: [5,7],
         }
        },
      });

      const asetLainnya = await prisma.akun.findMany({
        where: {
         kategoriId :{
             in: [6],
         }
        },
      });

      const liabilitasjkpendek = await prisma.akun.findMany({
        where: {
         kategoriId :{
             in: [8,10],
         }
        },
      });
  
      const liabilitasjkpanjang = await prisma.akun.findMany({
        where: {
         kategoriId :{
             in: [11],
         }
        },
      });

      const modal = await prisma.akun.findMany({
        where: {
         kategoriId :{
             in: [12],
         }
        },
      });
  
 
    return {
      props: {
        header: asetLancar,
        header2: asetTetap,
        header3: asetLainnya,
        header4: liabilitasjkpendek,
        header5: liabilitasjkpanjang,
        header6: modal,
      },
    };
  }
  