import React from 'react'

import Formulario from "./Formulario"

import "./style.CadastroUsuario.css"

const CadastroUsuario = () => {

  return (
    <div>
      <div className='container'>
        <h1><b>CADASTRO DE USUÁRIO</b></h1>
        <Formulario />
      </div>
    </div>
  )
}

export default CadastroUsuario;