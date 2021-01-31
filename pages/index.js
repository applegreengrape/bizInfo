import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React from 'react';
import fetch from 'isomorphic-fetch';

const HOST_NAME = process.env.HOST_NAME || 'http://localhost:8080/events/600000';

export default class extends React.Component {
    static async getInitialProps() {
        const data = await fetch(`${HOST_NAME}`);
        const item = await data.json();
        return {
            item
        };
    }
    render() {
        const { item } = this.props;
        return (
            <section>
                <h1>📇 company profile</h1>
                <ul>sse code: { item.CODE }</ul>
                <ul>company name: { item.CompanyName }</ul>
                <ul>company english name: { item.CompanyNameEn }</ul>
                <ul>city: { item.Area }</ul>
                <ul>address: { item.CompanyAddr }</ul>
            </section>
        );
    }
}