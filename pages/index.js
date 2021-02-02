import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import SearchBar from "material-ui-search-bar";

const HOST_NAME = process.env.HOST_NAME || 'http://localhost:8080/events';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '600000'};
      this.state = {profile: [
          "600000",
          "上海",
          "浦发银行",
          "SPD BANK",
          "上海市中山东一路12号"
      ]};

      this.handleSearch = this.handleSearch.bind(this);
    }
    
    handleSearch = async () => {
        var input = this.state.value
        try {
            const res = await fetch(`${HOST_NAME}/${input}`, {
                method: "GET",
                headers: {
                  "Content-type": "application/json"
                }
              });
            const data = await res.json();
            this.setState({profile : [
                data.CODE,
                data.Area,
                data.CompanyName,
                data.CompanyNameEn,
                data.CompanyAddr
            ]})
        }catch (e) {
            alert(e)
        };
    };

    render() {
    return (
        <div className={styles.container}>
            <Head>
                <title>
                📇 company profile 🇨🇳
                </title>
            </Head>
            <main>
                <h1 className={styles.title}>📇 company profile 🇨🇳</h1>
                <label className={styles.searchbar}>
                <SearchBar
                    placeholder="Search SSE (Shanghai Stock Exchange) listed company number (i.e. 600000)"
                    value={this.state.value}
                    onChange={(newValue) => this.setState({ value: newValue })}
                    onRequestSearch={() => this.handleSearch(this.state.value)}
                />
            </label>
            <div className={styles.grid}>
                <a className={styles.card}>
                    <h4>Basic Info:</h4>
                    <p>SSE Code: { this.state.profile[0] }</p>
                    <p>City: { this.state.profile[1] }</p>
                    <p>Company Name: { this.state.profile[2] }</p>
                    <p>Company English Name: { this.state.profile[3] }</p>
                    <p>Company Address: { this.state.profile[4] }</p>
                </a>
                <a className={styles.card}>
                    <h4>Company Announcements:</h4>
                    <p>place holder for announcements</p>
                </a>
                <a className={styles.card}>
                    <h4>Company Court Records:</h4>
                    <p>place holder for court records</p>
                </a>
            </div>

            </main>
            
        </div>
    );
    }
};

export default Home;