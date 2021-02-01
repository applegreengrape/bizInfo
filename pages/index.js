// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import SearchBar from "material-ui-search-bar";

const HOST_NAME = process.env.HOST_NAME || 'http://localhost:8080/events';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '600000'};
      this.state = {result: [
          "600000",
          "上海",
          "🏦 浦发银行 🏦",
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
            this.setState({result : [
                data.CODE,
                data.Area,
                data.CompanyName,
                data.CompanyNameEn,
                data.CompanyAddr
            ]})
        }catch (e) {
            console.log(e)
        };
    };

    render() {
    return (
        <div>
        <h1>📇 company profile</h1>
          <label>
          <SearchBar
            value={this.state.value}
            onChange={(newValue) => this.setState({ value: newValue })}
            onRequestSearch={() => this.handleSearch(this.state.value)}
            />
          </label>
          <ul>sse code: { this.state.result[0] }</ul>
          <ul>city: { this.state.result[1] }</ul>
          <ul>company name: { this.state.result[2] }</ul>
          <ul>company english name: { this.state.result[3] }</ul>
          <ul>company address: { this.state.result[4] }</ul>

        </div>

    );
    }
};

export default Home;