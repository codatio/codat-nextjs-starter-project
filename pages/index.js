import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Codat X Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nextjs.org">Next.js</a> X <a href="https://www.codat.io">Codat!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {
            props.data.results?.length >= 1
              ? props.data.results.map(company => {
                return <a key={company.id} href={`https://app.codat.io/companies/${company.id}`} target="_blank" rel="noreferrer" className={styles.card}>
                  <h2>{company.name}</h2>
                  <p>{company.id}</p>
                </a>
              })
              : <div className={styles.card}>
                  <h2>No companies</h2>
                  <p>Head to the <a key={company.id} href="https://app.codat.io/companies" target="_blank" rel="noreferrer">Codat Portal</a> to add your first company</p>
                </div>
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  // Encode your API key
  const encodedKey = Buffer.from(process.env.CODAT_API_KEY).toString(
    "base64"
  );

  // Add auth to the headers
  const headers = {
    method: "GET",
    headers: {
      authorization: "Basic " + encodedKey,
      "Access-Control-Allow-Origin": "*",
    },
  }

  // Fetch data from external API
  const res = await fetch(`https://api.codat.io/companies?page=1&pageSize=50`, headers)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}


export default Home;