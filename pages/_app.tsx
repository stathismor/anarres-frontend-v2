import React from "react";
import App from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
// TODO: Check Next.js how to add this in the component rather than globally
import "../styles/SoundBar.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      // All pages share the same, persistent layout
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
