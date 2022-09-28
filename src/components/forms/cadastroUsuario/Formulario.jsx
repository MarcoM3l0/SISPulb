import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "./data"


import "./style.CadastroUsuario.css";

const Formulario = () => {
    const titul = data
  // Estados e Municipios
  /*===============================================================================*/

  const [ufs, setUfs] = useState([]); //Estados
  const [municipio, setMunicipio] = useState([]); //Municipios
  const [ufSelecionada, setUfSelecionada] = useState("0");

  //baixando dados dos Estados com a API do IBGE
  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        setUfs(res.data);
      });
  }, []);

  //baixando dados dos Municipios com a API do IBGE
  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelecionada}/municipios`
      )
      .then((res) => {
        setMunicipio(res.data);
      });
  }, [ufSelecionada]);

  //Definição do ufSelecionada
  const handleSelecaoUf = (e) => {
    const uf = e.target.value;
    setUfSelecionada(uf);
  };

  /*===============================================================================*/

  // Mascara do telefone
  /*===============================================================================*/

  const formatTel = (e) => {
    const elementoAlvo = e.target;
    const telAtual = e.target.value;

    let telAtualizado;

    telAtualizado = telAtual.replace(
      /(\d{2})(\d{5})(\d{4})/,
      function (regex, dd, primerionum, ultimonum) {
        return "(" + dd + ") " + primerionum + "-" + ultimonum;
      }
    );

    elementoAlvo.value = telAtualizado;
  };
  /*===============================================================================*/

  // Mascara e validação do CPF
  /*===============================================================================*/

  const formatCpf = (e) => {
    const elementoAlvo = e.target;
    const cpfAtual = e.target.value;

    let cpfAtualizado;

    cpfAtualizado = cpfAtual.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      function (regex, digito1, digito2, digito3, digitoVerificador) {
        return (
          digito1 + "." + digito2 + "." + digito3 + "-" + digitoVerificador
        );
      }
    );

    elementoAlvo.value = cpfAtualizado;
  };

  const _cpf = (cpf) => {
    let i;

    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf === "") return false;
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;

    let add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  };

  const validarCPF = (e) => {
    if (!_cpf(e.value)) {
      alert("CPF inválido!" + e.value);

      // apaga o valor
      e.value = "";
    }
  };
  /*===============================================================================*/

  // Mascara do CEP
  /*===============================================================================*/

  const formatCep = (e) => {
    const elementoAlvo = e.target;
    const cepAtual = e.target.value;

    let cepAtualizado;

    cepAtualizado = cepAtual.replace(
      /(\d{5})(\d{3})/,
      function (regex, digito1, digito2) {
        return digito1 + "-" + digito2;
      }
    );

    elementoAlvo.value = cepAtualizado;
  };

  /*===============================================================================*/

    // Mascara de data
  /*===============================================================================*/

  const formatData = (e) => {
    const elementoAlvo = e.target;
    const dataAtual = e.target.value;

    let dataAtualizada;

    dataAtualizada = dataAtual.replace(
      /(\d{2})(\d{2})(\d{4})/,
      function (regex, dia, mes, ano) {
        return dia + "/" + mes + "/" + ano;
      }
    );

    elementoAlvo.value = dataAtualizada;
  };

  /*===============================================================================*/

  // Tratamento do formulário
  /*===============================================================================*/

  const [formvalue, setFormValue] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("*** handleSubmit ", data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formvalue, [name]: value });
  };
  /*===============================================================================*/

  // Verificador de senha
  /*===============================================================================*/
  const verificadorForm = () => {
    if (formvalue.senha && formvalue.senhaVeri) {
      if (formvalue.senha !== formvalue.senhaVeri) {
        alert("As senhas devem ser iguais!");
      }
    }
  };

  /*===============================================================================*/

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome:"
          onChange={handleInputChange}
          value={formvalue.nome || ""}
        />
        <input
          type="text"
          maxLength="14"
          name="cpf"
          placeholder="Digite seu cpf:"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*?)\..*/g, "$1");
          }}
          onChange={handleInputChange}
          onChangeCapture={formatCpf}
          onBlur={(e) => {
            validarCPF(e.target);
          }}
        />
        <input
          type="text"
          maxLength="8"
          name="dt_Nascimento"
          placeholder="Data de nascimento:"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*?)\..*/g, "$1");
          }}
          onChange={handleInputChange}
          onBlur={formatData}
          value={formvalue.dt_Nascimento || ""}
        />
        <input
          type="url"
          name="lattes"
          placeholder="Formato: http://lattes.cnpq.br/<seu identificador>"
          onChange={handleInputChange}
          value={formvalue.lattes || ""}
        />
        <input
          type="text"
          name="instituicao"
          placeholder="Instituição onde está matriculado:"
          onChange={handleInputChange}
          value={formvalue.instituicao || ""}
        />

        <select
          name="titulacao"
          onChange={handleInputChange}
          value={formvalue.titulacao || ""}
        >
          <option value="0 ">Selecione a sua titulação </option>
          {titul.map((e) => (
            <option value={e.value}>{e.intext}</option>
          ))}
           
        </select>

        <select name="estado" onChange={handleSelecaoUf}>
          <option value="0">Selecione seu Estado</option>
          {ufs.map((uf) => (
            <option key={uf.id} value={uf.sigla}>
              {uf.nome}
            </option>
          ))}
        </select>
        <select name="cidade">
          <option value="0">Selecione seu Municipio</option>
          {municipio.map((mun) => (
            <option key={mun.id} value={mun.nome}>
              {mun.nome}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="endereco"
          placeholder="Digite seu endereço:"
          onChange={handleInputChange}
          value={formvalue.endereco || ""}
        />
        <input
          type="text"
          name="bairro"
          placeholder="Digite o bairro:"
          onChange={handleInputChange}
          value={formvalue.bairro || ""}
        />
        <input
          type="text"
          name="cep"
          maxLength="9"
          placeholder="Digite o cep da região:"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*?)\..*/g, "$1");
          }}
          onChange={formatCep}
        />

        <input
          type="text"
          name="usuario"
          placeholder="Digite seu usuário:"
          onChange={handleInputChange}
          value={formvalue.usuario || ""}
        />
        <input
          type="email"
          name="email"
          placeholder="Digite seu email:"
          onChange={handleInputChange}
          value={formvalue.email || ""}
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Digite seu telefone:"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*?)\..*/g, "$1");
          }}
          onChange={formatTel}
        />
        <input
          type="password"
          name="senha"
          placeholder="Digite uma senha:"
          onChange={handleInputChange}
          value={formvalue.senha || ""}
          onBlur={formvalue.senhaVeri === "" || verificadorForm}
        />
        <input
          type="password"
          name="senhaVeri"
          placeholder="Digite a mesma senha:"
          onChange={handleInputChange}
          onBlur={verificadorForm}
          value={formvalue.senhaVeri || ""}
        />
        <button type="submit">Cadastra</button>
      </form>
    </div>
  );
};

export default Formulario;
