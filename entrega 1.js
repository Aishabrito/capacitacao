"use strict"
const prompt = require('prompt-sync')({sigint: true});
class Cliente {
    constructor(idc, nome, pets, telefone, endereco) {
      this.idc = idc;
      this.nome = nome;
      this.pets = pets;
      this.telefone = telefone;
      this.endereco = endereco;
      this.fidelizado = false;
    }
  
    adicionarPet(pet) {
      this.pets.push(pet);
      if (this.totalConsultas() > 4) {
        this.fidelizado = true;
      }
    }
  
    getTelefone() {
      return this.telefone;
    }
  
    getEndereco() {
      return this.endereco;
    }
  
    setTelefone(novoTelefone) {
      this.telefone = novoTelefone;
    }
  
    setEndereco(novoEndereco) {
      this.endereco = novoEndereco;
    }
    totalConsultas() {
        return this.pets.reduce((total, pet) => total + pet.totalConsultas(), 0);
      }
    
}
  
  class Funcionario {
    constructor(idf, usuario, senha, cargo) {
      this.idf = idf;
      this.usuario = usuario;
      this.#senha = senha; 
      this.cargo = cargo;
    }
  
    setSenha(novaSenha) {
      this.#senha = novaSenha;
    }
  
    validarSenha(nomeUsuario, senha) {
      return this.usuario === nomeUsuario && this.#senha === senha;
    }
  }
  
  class Animal {
    constructor(ida, nome, dono, especie, raca, consultas) {
      this.ida = ida;
      this.nome = nome;
      this.dono = dono;
      this.especie = especie;
      this.raca = raca;
      this.consultas = consultas;
    }
  
    adicionarConsulta(consulta) {
      this.consultas.push(consulta);
    }
  
    removerConsulta(consulta) {
      const index = this.consultas.indexOf(consulta);
      if (index !== -1) {
        this.consultas.splice(index, 1);
      }
    }
  
    totalConsultas() {
      return this.consultas.length;
    }
  }

  class Consulta {
    constructor(idcon, data, horario, pet, funcionario, status) {
      this.idcon = idcon;
      this.data = data;
      this.horario = horario;
      this.pet = pet;
      this.funcionario = funcionario;
      this.status = status;
    }
  
    setConsulta(data, horario) {
      this.data = data;
      this.horario = horario;
      console.log(`Consulta ${this.idcon} remarcada para ${this.data} às ${this.horario}`);
    }
  
    mudarStatusConsulta(status) {
        const possiveisStatus = ['Consulta pendente', 'Consulta Adiada', 'Consulta Realizada', 'Consulta Cancelada'];
    
        if (possiveisStatus.includes(status)) {
          this.status = status;
          console.log(`Status da consulta ${this.idcon} atualizado para ${this.status}`);
        } else {
          console.log(`Status inválido. Os possíveis valores são: ${possiveisStatus.join(', ')}`);
  } }}

  class Sistema {
    constructor() {
      this.clientes = [];
      this.pets = [];
      this.consultas = [];
      this.funcionarios = [];
      this.funcionarioLogado = null;
    }
   verMeusDados() {
      if (this.funcionarioLogado) {
        console.log('Dados do funcionário logado:');
        console.log(this.funcionarioLogado);
      } else {
        console.log('Nenhum funcionário está logado no momento.');
      }
    }
    modificarMeusDados(novoNome, novoCargo) {
      if (this.funcionarioLogado) {
        this.funcionarioLogado.nome = novoNome;
        this.funcionarioLogado.cargo = novoCargo;
        console.log('Dados do funcionário logado atualizados com sucesso!');
      } else {
        console.log('Nenhum funcionário está logado no momento.');
      }
    }
    verListaClientes() {
      if (this.clientes.length > 0) {
        console.log('Lista de clientes:');
        this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));// ordem alfabetica 
        this.clientes.forEach((cliente) => console.log(cliente));
      } else {
        console.log('Não há clientes cadastrados no momento.');
      } }
      verListaPets() {
        if (this.pets.length > 0) {
          console.log('Lista de pets:');
          this.pets.sort((a, b) => a.nome.localeCompare(b.nome)); // ordem alfabetica 
          this.pets.forEach((pet) => console.log(pet));
        } else {
          console.log('Não há pets cadastrados no momento.');
        }
      }
      verListaConsultas() {
        if (this.consultas.length > 0) {
          console.log('Lista de consultas:');
          this.consultas.sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario));
          this.consultas.forEach((consulta) => console.log(consulta)); // ordem cronologica 
        } else {
          console.log('Não há consultas cadastradas no momento.');
        }
      }
      verListaFuncionarios() {
        if (this.funcionarios.length > 0) {
          console.log('Lista de funcionários:');
          this.funcionarios.sort((a, b) => a.nome.localeCompare(b.nome));
          this.funcionarios.forEach((funcionario) => console.log(funcionario));
        } else {
          console.log('Não há funcionários cadastrados no momento.');
        }
      }
      marcarConsulta(cliente, pet, data, horario, funcionario) {
        const consulta = new Consulta(this.consultas.length + 1, data, horario, pet, funcionario, 'Pendente');
        this.consultas.push(consulta);
        pet.adicionarConsulta(consulta); 
      }
      mudarStatusConsulta(status) {
        const possiveisStatus = ['Consulta pendente', 'Consulta Adiada', 'Consulta Realizada', 'Consulta Cancelada'];
    
        if (possiveisStatus.includes(status)) {
          this.status = status;
          console.log(`Status da consulta ${this.idcon} atualizado para ${this.status}`);
        } else {
          console.log(`Status inválido. Os possíveis valores são: ${possiveisStatus.join(', ')}`);
  } }


          function  fazerLogin(usuario, senha) { {
        const funcionario = this.funcionarios.find((func) => func.usuario === usuario);
        if (funcionario && funcionario.validarSenha(usuario, senha)) {
          this.funcionarioLogado = funcionario;
          console.log('Login realizado com sucesso!');
        } else {
          console.log('Falha no login. Verifique o usuário e a senha.');
        }
    }
  
    function fazerCadastroFuncionario(funcionario) {
  const idExistente = this.funcionarios.some((f) => f.idf === funcionario.idf);
  if (idExistente) {
    console.log('ID do funcionário já existe. Por favor, escolha um  novo ID.');
  } else {
    this.funcionarios.push(funcionario);
    console.log('Funcionário cadastrado com sucesso!');
  }
}
function fazerCadastroConsulta(consulta) {
  
    const consulta = {};

    consulta.id = prompt('Digite o ID da consulta:');
    consulta.nomeCliente = prompt('Digite o nome do cliente:');
    consulta.nomePet = prompt('Digite o nome do pet:');
    consulta.nomeFuncionario = prompt('Digite o nome do funcionário que agendou:');
    consulta.status = prompt('Digite o status da consulta:');
    consulta.data = prompt('Digite a data da consulta:');

    const idExistente = this.consultas.some((c) => c.id === consulta.id);
    if (idExistente) {
      console.log('ID da consulta já existe. Por favor, escolha outro ID.');
    } else {
      this.consultas.push(consulta);
      console.log('Consulta cadastrada com sucesso!'); 
  }
}
function fazerCadastroCliente(); {
  console.log('==== Cadastro de Cliente ====');
  const idc = prompt('Digite o ID do cliente: ');
  const nome = prompt('Digite o nome do cliente: ');
  const telefone = prompt('Digite o telefone do cliente: ');
  const endereco = prompt('Digite o endereço do cliente: ');

  const cliente = new Cliente(idc, nome, [], telefone, endereco);
  this.clientes.push(cliente);
  console.log('Cliente cadastrado com sucesso!');
}

function fazerCadastroPet(); {
  console.log('==== Cadastro de Pet ====');
  const ida = prompt('Digite o ID do pet: ');
  const nome = prompt('Digite o nome do pet: ');
  const especie = prompt('Digite a espécie do pet: ');
  const raca = prompt('Digite a raça do pet: ');
  const donoNome = prompt('Digite o nome do dono do pet: ');

  const dono = this.clientes.find((cliente) => cliente.nome === donoNome);
  if (!dono) {
    console.log('Cliente não encontrado. Cadastre o cliente antes de cadastrar o pet.');
    return;
  }

  const pet = new Animal(ida, nome, dono, especie, raca, []);
  this.pets.push(pet);
  console.log('Pet cadastrado com sucesso!');
}
  
function  fazerLogout(); {
      this.funcionarioLogado = null;
      console.log('Logout realizado com sucesso!');
    }
  } 
  function  modificarMeusDados(novoNome, novoCargo); {
      if (this.funcionarioLogado) {
        this.funcionarioLogado.nome = novoNome;
        this.funcionarioLogado.cargo = novoCargo;
        console.log('Dados do funcionário logado atualizados com sucesso!');
      } else {
        console.log('Nenhum funcionário está logado no momento.');
      }
    }
    function verListaClientes(); {
    if (this.clientes.length > 0) {
      console.log('Lista de clientes:');
      this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));
      this.clientes.forEach((cliente) => console.log(cliente));
    } else {
      console.log('Não há clientes cadastrados no momento.');
    }
    }
    function verListaPets(); {
    if (this.pets.length > 0) {
      console.log('Lista de pets:');
      this.pets.sort((a, b) => a.nome.localeCompare(b.nome));
      this.pets.forEach((pet) => console.log(pet));
    } else {
      console.log('Não há pets cadastrados no momento.');
    }
    function verListaFuncionarios(); {
      if (this.funcionarios.length > 0) {
        console.log('Lista de funcionários:');
        this.funcionarios.forEach((funcionario) => console.log(funcionario.idf, funcionario.nome, funcionario.cargo));
      } else {
        console.log('Não há funcionários cadastrados no momento.');
      }
    }
  }
  function  marcarConsulta(cliente, pet, data, horario, funcionario); {
      const consulta = new Consulta(this.consultas.length + 1, data, horario, pet, funcionario, 'Pendente');
      this.consultas.push(consulta);
      pet.adicionarConsulta(consulta); 
    }
    
    function fazerLogin(sistema) {
        console.log('==== Fazer login ====');
        const usuario = prompt('Digite o usuário: ');
        const senha = prompt('Digite a senha: ');
        sistema.fazerLogin(usuario, senha);
      }
      
      function fazerCadastroFuncionario(sistema) {
        console.log('==== Cadastro de Funcionário ====');
        const idf = prompt('Digite o ID do funcionário: ');
        const usuario = prompt('Digite o usuário: ');
        const senha = prompt('Digite a senha: ');
        const funcionario = new Funcionario(idf, usuario, senha);
        sistema.fazerCadastroFuncionario(funcionario);
      }
      
      function sairDoPrograma() {
        console.log('Encerrando o programa...');
  
      }
      
      function exibirMenu() {
        console.log('==== Menu ====');
        console.log('1. Fazer login');
        console.log('2. Fazer cadastro de funcionário');
        console.log('0. Sair do programa');
        console.log('==============');
      }
      
      const sistema = new Sistema();
      let opcao;

do {
  exibirMenu();
  opcao = prompt('Digite a opção desejada: ');

  switch (opcao) {
    case '1':
      fazerLogin(sistema);
      break;
    case '2':
      fazerCadastroFuncionario(funcionario);
      break;
    case '0':
      sairDoPrograma();
      break;
    default:
      console.log('Opção inválida. Tente novamente.');
  }
} while (opcao !== '0');


function mostrarMenuFuncionario() {
  console.log('==== Menu do Funcionário ====');
  console.log('1. Ver meus dados');
  console.log('2. Modificar meus dados');
  console.log('3. Ver lista de Clientes ');
  console.log('4. Ver lista de Pets ');
  console.log('5. Ver lista de Consultas');
  console.log('6. Ver lista de Funcionários ');
  console.log('7. Marcar Consulta (ou remarcar)');
  console.log('8. Mudar Status de Consulta');
  console.log('9. Remover Cliente (e seus pets)');
  console.log('10. Remover Pet');
  console.log('11. Cancelar Consulta');
  console.log('12. Remover Funcionário');
  console.log('13. Fazer Logout');
  console.log('=============================');
}

function menuFuncionario(sistema, funcionario) {
  mostrarMenuFuncionario();

  let opcao = prompt('Digite o número da opção desejada: ');

  while (opcao !== '13') {
    switch (opcao) {
      case '1':
        verMeusDados(sistema)
        break;
      case '2':
        modificarMeusDados(funcionario);
        break;
      case '3':
        verListaClientes(sistema)
        break;
      case '4':
        verListaPets(sistema)
        break;
      case '5':
        verListaConsultas(sistema)
        break;
      case '6':
        verListaFuncionarios(sistema)
        break;
      case '7':
        marcarConsulta(sistema);
        break;
      case '8':
        mudarStatusConsulta(sistema);
        break;
      case '9':
        removerCliente(sistema);
        break;
      case '10':
        removerPet(sistema);
        break;
      case '11':
        removerConsulta(consulta);
        break;
      case '12':
        removerFuncionario(funcionario);
        break;
      case '13':
        fazerLogout(sistema)
      default:
        console.log('Opção inválida. Tente novamente.');
    }

    mostrarMenuFuncionario();
    opcao = prompt('Digite o número da opção desejada: ');
  }

}