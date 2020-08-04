import React, { Component } from 'react'

import './ErrorBoundary.styles.css'

export default class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
      error: "ERROR"
    }
  }

  // getError() {
  //   const root = JSON.parse(localStorage.getItem('persist:root'));
  //   const { sideEffects } = root;
  //   const { error } = JSON.parse(sideEffects)
  //   return error;
  // }

  componentDidCatch(error, info) {
    console.log(error)
    this.setState({ error: error })
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true }
  }
  render() {

    if (this.state.hasErrored) {
      return (
        <div className="error-overlay">
          <div className="error-svg-container">
            <img alt="TELA DE ERRO" src={require("../../assets/error.svg")} />
            <h2 className="error-text">Esta pagina está quebrada ;-;</h2>
          </div>
          <h2 className="error-text">{this.state.error}</h2>
          <a href="/">Tente Novamente</a>
        </div>
      )
    }
    return this.props.children;
  }
}