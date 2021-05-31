import Head from 'next/Head';
import Layout from '../components/Layout';
import Link from 'next/Link';
import { Form, Row, Col, FormCheck, Button, Card } from 'react-bootstrap';
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function Home({ data }) {

    // const router = useRouter()
    // console.log(data)
    // if (typeof window !== "undefined") {


    // 	if (!localStorage.getItem('user')) {
    // 		router.push('/login')
    // 	}

    // }
    // useEffect(async () => {
    // 	const fetchUser = async () => {
    // 		const response = await fetch(`http://localhost:3000/api/user/getUser`)

    // 		console.log(response.data)
    // 	}
    // 	fetchUser()
    // }, [])
    return (
        <Layout>
            <div>
                <h1> <HomeIcon fontSize="medium" />Ini adalah dashboard</h1>
            </div>
        </Layout>
    );
}


export async function getServerSideProps() {
    const akuns = await prisma.user.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ]
    });

    return {
        props: {
            data: akuns
        }

    }
}