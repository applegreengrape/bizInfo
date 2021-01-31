// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';

const HOST_NAME = process.env.HOST_NAME || 'http://localhost:8080/events';

const Home = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    const handleInput = e => {
        const txt = e.target.value;
        setInput(txt);
      };
    
    const handleSearch = async () => {
        try {
            const res = await fetch(`${HOST_NAME}/${input}`, {
                method: "GET",
                headers: {
                  "Content-type": "application/json"
                }
              });
            const data = await res.json();
            setResults(data)
        }catch (e) {
            console.log(e)
        };
    };

    return (
        <div>
        <h1>📇 company profile</h1>
          <label>
          🔎 <input placeholder="600000" value={input} onChange={handleInput} onkeyup={handleSearch}/>
          <button onClick={_ => handleSearch()}>search</button>
          </label>
          <ul>sse code: { results.CODE }</ul>
          <ul>company name: { results.CompanyName }</ul>
          <ul>company english name: { results.CompanyNameEn }</ul>
          <ul>city: { results.Area }</ul>
          <ul>address: { results.CompanyAddr }</ul>
        </div>

    );
};

/*
Home.getInitialProps = async () => {
  const res = await fetch(`${HOST_NAME}/600000`);
  const data = await res.json();

  return { propItems: data };
};
*/

export default Home;