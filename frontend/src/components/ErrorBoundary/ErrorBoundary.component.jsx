import React, { Component } from 'react'

import './ErrorBoundary.styles.css'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
      errorMessage: "errrinho"
    }
  }

  // getError() {
  //   const root = JSON.parse(localStorage.getItem('persist:root'));
  //   const { sideEffects } = root;
  //   const { error } = JSON.parse(sideEffects)
  //   return error;
  // }

  componentDidCatch(error, info) {
    console.log(error, "info ", info)
    this.setState({...this.state, errorMessage:info})
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
            <h2 className="error-text">{this.state.errorMessage}</h2>
          </div>
          <Link to="/">Tente novamente</Link>
        </div>
      )
    }
    return this.props.children;
  }
}