import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import fetch from 'isomorphic-fetch';
import SearchBar from "material-ui-search-bar";
import Rating from '@material-ui/lab/Rating';

import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const HOST_NAME = process.env.HOST_NAME || 'http://localhost:8080/events';

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  
  
class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '600000'};
      this.state = {rate: ''};
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
    
    state = {rate: 0};
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
        <div className={styles.footer}>
            <a>Do you find this useful?  &nbsp;&nbsp;</a>
            <Rating
                name="customized-icons"
                defaultValue={3}
                getLabelText={(value) => customIcons[value].label}
                onChange={(event, newValue) => {
                    console.log(`Someone rated it as: ${newValue}`);
                  }}
                IconContainerComponent={IconContainer}
            />
        </div>
        </div>
    );
    }
};


export default Home;