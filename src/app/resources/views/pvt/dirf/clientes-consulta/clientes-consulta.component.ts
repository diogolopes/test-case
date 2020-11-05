import { Component, OnInit } from '@angular/core';
import { ContribuinteDetalheResponse } from '../../../../models/ContribuinteDetalheResponse';
import { ContribuinteConsultaResponse } from '../../../../models/ContribuinteConsultaResponse';

import { ContribuinteConsultaRequest } from '../../../../models/ContribuinteConsultaRequest';
import { ContribuinteDetalheRequest } from '../../../../models/ContribuinteDetalheRequest';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { ContribuintesService } from '../../../../services/contribuintes.service';
import { InformesService } from '../../../../services/informes.service';
import { ContribuinteMovimentosRequest } from 'src/app/resources/models/ContribuinteMovimentosRequest';
import { MovimentoAnaliticoResponse } from 'src/app/resources/models/MovimentoAnaliticoResponse';
import { MovimentoSinteticoResponse } from 'src/app/resources/models/MovimentoSinteticoResponse';
import { RetencaoResponse } from 'src/app/resources/models/RetencaoResponse';
import { ExtensaoResponse } from 'src/app/resources/models/ExtensaoResponse';
import { VerbaResponse } from 'src/app/resources/models/VerbaResponse';
import { MovimentoAnaliticoRequest } from 'src/app/resources/models/MovimentoAnaliticoRequest';
import { MatriculaResponse } from 'src/app/resources/models/MatriculaResponse';
import { DatePipe } from '@angular/common'; //import do datePipe
import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InformeConsultaRequest } from 'src/app/resources/models/InformeConsultaRequest';

@Component({
  selector: 'app-clientes-consulta',
  templateUrl: './clientes-consulta.component.html',
  styleUrls: ['./clientes-consulta.component.css'],
  providers: [MessageService, ConfirmationService, DatePipe, ProgressSpinner, DialogModule]
})
export class ClientesConsultaComponent implements OnInit {

  public contribuinteConsultaRequest: ContribuinteConsultaRequest;
  public contribuinteDetalheRequest: ContribuinteDetalheRequest;
  public contribuinteDetalheResponse: ContribuinteDetalheResponse;
  public contribuintes: ContribuinteConsultaResponse[];
  public cadastrais: ContribuinteDetalheResponse[];
  public contribuinteSelecionado: ContribuinteConsultaResponse;

  public isContribuinteSelecionado: boolean = false;

  public cols: any[];
  public cols0: any[];
  public exportColumns: any[];

  public submitted = false;
  public locale = 'pt-br';

  private tituloMensagem = 'Atenção';
  private tituloMensagemErro = this.tituloMensagem + "! Ocorreu um erro na operação: ";

  public analitico: MovimentoAnaliticoResponse;
  public sintetico: MovimentoSinteticoResponse;
  private contribuinteMovimentosRequest: ContribuinteMovimentosRequest;
  public movimentosAnaliticoResponse: MovimentoAnaliticoResponse[];
  public movimentosSinteticoResponse: MovimentoSinteticoResponse[];
  public retencoesResponse: RetencaoResponse[];
  public retencaoResponse: RetencaoResponse;
  public extensoesResponse: ExtensaoResponse[];
  public extensaoResponse: ExtensaoResponse;
  public verbasResponse: VerbaResponse[];
  public verbaResponse: VerbaResponse;
  public matriculasResponse: MatriculaResponse[];
  public matriculaResponse: MatriculaResponse;

  public unidades: SelectItem[];
  public retencoes: SelectItem[];
  public verbas: SelectItem[];
  public tiposCadastro: SelectItem[];
  public matriculas: SelectItem[];

  public isMovimentoButtonDisabled: boolean = false;
  public isInsertingMovimento: boolean = false;
  public isUpdatingMovimento: boolean = false;


  public isCadastroButtonDisabled: boolean = false;
  public isInsertingCadastro: boolean = false;
  public isUpdatingCadastro: boolean = false;


  public movimentoAnaliticoResponse: MovimentoAnaliticoResponse;

  private indexMovimento: number = -1;
  private indexDetalhe: number = -1;

  public displayModal: boolean;

  public isLoading: boolean = false;

  constructor(private datePipe: DatePipe, private informesService: InformesService, private contribuintesService: ContribuintesService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'nome', header: 'Nome do Contribuinte' },
      { field: 'documento', header: 'CPF/CNPJ' },
      { field: 'matricula', header: 'Matrícula' },
      { field: 'data', header: 'Data' },
      { field: 'codigoRetencao', header: 'Cód Retenção' },
      { field: 'codigoExtensao', header: 'Cód Extensão' },
      { field: 'descricaoRetencao', header: 'Descrição Retenção' },
      { field: 'codigoVerba', header: 'CódVerba' },
      { field: 'descricaoVerba', header: 'Descrição Verba' },
      { field: 'valor', header: 'Valor R$' },
      { field: 'dataCriacao', header: 'Data Criação' },
      { field: 'criadoPor', header: 'Criado por' },
      { field: 'dataAlteracao', header: 'Data Alteração' },
      { field: 'alteradoPor', header: 'Alterado por' }
    ];

    this.cols0 = [
      { field: 'nome', header: 'Nome do Contribuinte' },
      { field: 'documento', header: 'CPF/CNPJ' },
      { field: 'codigoRetencao', header: 'Cód Retenção' },
      { field: 'codigoExtensao', header: 'Cód Extensão' },
      { field: 'descricaoRetencao', header: 'Descrição Retenção' },
      { field: 'codigoVerba', header: 'CódVerba' },
      { field: 'descricaoVerba', header: 'Descrição Verba' },
      { field: 'valor', header: 'Valor R$' }
    ];


    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.contribuinteConsultaRequest = new ContribuinteConsultaRequest();
    this.contribuinteSelecionado = new ContribuinteDetalheResponse();

    this.unidades = [
      { label: 'Selecione a Unidade', value: null },
      { label: 'BRASILPREV SEGUROS E PREVIDNCIA S/A', value: '1' }
    ];

    this.tiposCadastro = [
      { label: '', value: '' },
      { label: 'Pessoa Física', value: 'PF' },
      { label: 'Pessoa Jurídica', value: 'PJ' },
    ];

    this.retencoes = [
      { label: '', value: '' }
    ];

    this.isMovimentoButtonDisabled = true;
    this.isInsertingMovimento = false;

    this.isCadastroButtonDisabled = true;
    this.isInsertingCadastro = false;

    /// ##### TODO DESCOMENTAR ISSO TESTES
   // this.contribuinteConsultaRequest = new ContribuinteConsultaRequest();
   // this.contribuinteConsultaRequest.cpf = '29252667890';
    //this.contribuinteConsultaRequest.dtInicial = new Date('01-01-2000');
  //  this.contribuinteConsultaRequest.dtFinal = new Date();
   // this.contribuinteConsultaRequest.unidade = '1';

  }

  limparConsulta() {

    this.contribuinteConsultaRequest.unidade = null;
    this.contribuinteConsultaRequest.nome = null;
    this.contribuinteConsultaRequest.cpf = null;
    this.contribuinteConsultaRequest.cnpj = null;
    this.contribuinteConsultaRequest.dtInicial = null;
    this.contribuinteConsultaRequest.dtFinal = null;
    this.cadastrais = null;
    this.contribuintes = null;
    this.movimentosAnaliticoResponse = null;
    this.movimentosSinteticoResponse = null;
    this.messageService.add({ severity: 'info', summary: this.tituloMensagem, detail: 'Filtro de Consulta limpo!', life: 3000 });

  }

  validarForm(): boolean {

    if (this.contribuinteConsultaRequest.unidade == null) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a Unidade de Negócio!', life: 3000 });
      return false;
    } else if (this.contribuinteConsultaRequest.dtInicial == null) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a Data Inicial!', life: 3000 });
      return false;
    } else if (this.contribuinteConsultaRequest.dtFinal == null) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a Data Final!', life: 3000 });
      return false;
    } else if ((this.contribuinteConsultaRequest.nome == null || this.contribuinteConsultaRequest.nome == '') &&
      (this.contribuinteConsultaRequest.cpf == null || this.contribuinteConsultaRequest.cpf == '') &&
      (this.contribuinteConsultaRequest.cnpj == null || this.contribuinteConsultaRequest.cnpj == '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe ao menos um dos campos:\nNome, CPF ou CNPJ!', life: 3000 });
      return false;
    } else if (this.contribuinteConsultaRequest.nome != null && this.contribuinteConsultaRequest.nome.length < 5 &&
      (this.contribuinteConsultaRequest.cpf == null || this.contribuinteConsultaRequest.cpf == '') &&
      (this.contribuinteConsultaRequest.cnpj == null || this.contribuinteConsultaRequest.cnpj == '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o campo Nome corretamente!', life: 3000 });
      return false;
    } else if ((this.contribuinteConsultaRequest.cpf != null && this.contribuinteConsultaRequest.cpf != '') &&
      (this.contribuinteConsultaRequest.cnpj != null && this.contribuinteConsultaRequest.cnpj != '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe um campo [ CPF ou CNPJ ] apenas!', life: 3000 });
      this.contribuinteConsultaRequest.cnpj = null;
      this.contribuinteConsultaRequest.cpf = null;
      return false;
    } else {
      return true;
    }

  }

  consultar(): void {
    if (this.validarForm()) {
      this.contribuinteConsultaRequest.dataInicial = this.contribuinteConsultaRequest.dtInicial.toLocaleDateString(this.locale);
      this.contribuinteConsultaRequest.dataFinal = this.contribuinteConsultaRequest.dtFinal.toLocaleDateString(this.locale);
      this.consultarContribuintes(this.contribuinteConsultaRequest);
      // console.log(this.contribuinteConsultaRequest);
    }
  };

  preencherDetalhes(): void {
    this.isLoading = true;

    this.contribuinteDetalheRequest = new ContribuinteDetalheRequest();
    this.contribuinteDetalheRequest.unidade = this.contribuinteConsultaRequest.unidade;
    this.contribuinteDetalheRequest.nome = this.contribuinteSelecionado.nome;
    this.contribuinteDetalheRequest.cpf = this.contribuinteSelecionado.cpf;
    this.contribuinteDetalheRequest.cnpj = this.contribuinteSelecionado.cnpj;
    this.consultarContribuinteDetalhe(this.contribuinteDetalheRequest);
    this.consultarContribuinteMovimentos(this.contribuinteConsultaRequest);
    this.isContribuinteSelecionado = true;
  }

  consultarContribuintes(dados: ContribuinteConsultaRequest) {
    this.isLoading = true;
    this.contribuintesService.getContribuintes(dados)
      .subscribe(contribuintes => {
        if (contribuintes != null) {
          contribuintes.map(contribuinte => contribuinte.cpf != null ? contribuinte.documento = contribuinte.cpf : contribuinte.cnpj);
          this.contribuintes = contribuintes

          if (this.contribuintes.length == 0) {
            this.messageService.add({ severity: 'info', summary: this.tituloMensagem, detail: "A sua pesquisa não retornou resultados..." });
          }

          this.isLoading = false;

        }
      }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.isLoading = false; }
      );
  };

  consultarContribuinteDetalhe(dados: ContribuinteDetalheRequest) {
    // console.log(dados);
    this.contribuintesService.getContribuinteDetalhe(dados)
      .subscribe(cadastrais => {
        this.cadastrais = cadastrais;
        if (cadastrais.length > 0) {
          this.isCadastroButtonDisabled = false;
        }
      }, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    // console.log(this.cadastrais);
  };

  atualizarContribuinteDetalhe(dados: ContribuinteDetalheResponse, index: number) {
    if (this.validaLinhaDetalhe(dados, index) == true) {
      this.contribuintesService.updateContribuinteDetalhe(dados)
        .subscribe(contribuinteDetalheResponse => {
          this.contribuinteDetalheResponse = contribuinteDetalheResponse
          // console.log(contribuinteDetalheResponse);
          this.messageService.add({ severity: 'success', summary: this.tituloMensagem, detail: "Cadastro atualizado com sucesso!" });
          this.desabilitaBotes(true, 'Cadastro');
          this.contribuinteConsultaRequest.nome = dados.nome;
          this.contribuinteDetalheRequest.nome = dados.nome;
          this.contribuinteSelecionado.nome = dados.nome;
          // console.log(this.contribuinteConsultaRequest.nome );
          // console.log( this.contribuinteDetalheRequest.nome );
          this.preencherDetalhes();
        }, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    }

  };


  validaLinhaDetalhe(dados: ContribuinteDetalheResponse, index: number): boolean {
    if (this.indexDetalhe != -1 && this.indexDetalhe != index) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Existem linhas na tabela sem atualizar. Cancele no X para continuar...', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.nome == null || dados.nome == '' || dados.nome.length < 5) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o nome!', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if ((dados.cpf == null || dados.cpf == '') && (dados.cnpj == null || dados.cnpj == '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a CPF ou CNPJ', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.nascimento == null) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe data de nascimento!', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.logradouro == null || dados.logradouro == '' || dados.logradouro.length < 5) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o logradouro!', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.numero == null || dados.numero == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o número!', life: 3000 });
      this.desabilitaBotes(false, 'Cadastro');
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.bairro == null || dados.bairro == '' || dados.bairro.length < 5) {
      this.desabilitaBotes(false, 'Cadastro');
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o bairro!', life: 3000 });
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.cep == null || dados.cep == '' || dados.cep.length < 8) {
      this.desabilitaBotes(false, 'Cadastro');
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o CEP!', life: 3000 });
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.cidade == null || dados.cidade == '' || dados.cidade.length < 5) {
      this.desabilitaBotes(false, 'Cadastro');
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a cidade!', life: 3000 });
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    } else if (dados.estado == null || dados.estado == '' || dados.estado.length < 2) {
      this.desabilitaBotes(false, 'Cadastro');
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o estado!', life: 3000 });
      this.isInsertingCadastro = !this.isUpdatingCadastro;
      return false;
    }

    return true;

  }

  consultarContribuinteMovimentos(dados: ContribuinteConsultaRequest) {

    this.contribuinteMovimentosRequest = new ContribuinteMovimentosRequest();
    this.contribuinteMovimentosRequest.unidade = dados.unidade;
    this.contribuinteMovimentosRequest.cpf = dados.cpf;
    this.contribuinteMovimentosRequest.cnpj = dados.cnpj;
    this.contribuinteMovimentosRequest.dtInicial = dados.dataInicial;
    this.contribuinteMovimentosRequest.dtFinal = dados.dataFinal;
    this.contribuinteMovimentosRequest.nome = this.contribuinteSelecionado.nome;

    this.contribuinteMovimentosRequest.tipoConsulta = 'S';
    this.contribuintesService.getContribuinteMovimentosSintetico(this.contribuinteMovimentosRequest)
      .subscribe(movimentos => this.movimentosSinteticoResponse = movimentos,
        err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));

    this.contribuinteMovimentosRequest.tipoConsulta = 'A';
    this.contribuintesService.getContribuinteMovimentosAnalitico(this.contribuinteMovimentosRequest)
      .subscribe(movimentos => {
        this.movimentosAnaliticoResponse = movimentos
        // console.log("Tamanho movimentos: ");
        // console.log(movimentos.length);
        if (this.movimentosAnaliticoResponse.length > 0) {
          this.isMovimentoButtonDisabled = false;
          this.preencherRetencoes();
        }

        this.isLoading = false;
      }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.isLoading = false; });

  }

  preencherRetencoes() {
    // console.log('Preencher retencoes');
    // // console.log(this.retencoesResponse)
    this.retencoesResponse = null;
    this.contribuintesService.getRetencoes()
      .subscribe(retencoesResponse => this.retencoesResponse = retencoesResponse, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    // this.retencaoResponse = null;
  }

  preencherMatriculas() {
    // console.log('Matriculas retencoes');
    // // console.log(this.retencoesResponse)
    this.matriculasResponse = null;
    this.contribuintesService.getMatriculas(this.contribuinteSelecionado.id)
      .subscribe(matriculasResponse => this.matriculasResponse = matriculasResponse, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    // this.retencaoResponse = null;
  }

  preencherExtensoes(codRetencao: string) {
    this.extensoesResponse = null;
    this.contribuintesService.getExtencoes(codRetencao)
      .subscribe(extensoes => this.extensoesResponse = extensoes, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    //this.extensaoResponse = null;
  }

  preencherVerbas(codRetencao: string, codExtensao: string, index: number) {
    this.verbasResponse = null;
    this.contribuintesService.getVerbas(codRetencao, codExtensao)
      .subscribe(verbas => {
        this.verbasResponse = verbas;
        verbas.forEach(v => this.movimentosAnaliticoResponse[index].descricaoRetencao = v.descricaoRetencao);
      }, err => this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }));
    // this.verbaResponse = null;
  }

  onRowSelect(event) {
    // console.log('Contirbuinte Selecionado: ' + event.data.documento + '-' + event.data.nome + '-' + event.data.id)
    this.preencherDetalhes();
  }

  onRowUnselect(event) {
    this.contribuinteDetalheResponse = null;
  }

  onRowEditInit(cadastro: ContribuinteDetalheResponse, index: number) {

    if (this.indexDetalhe == -1 || this.indexDetalhe == index) {
      this.contribuinteDetalheResponse = this.cadastrais[index];
      this.isCadastroButtonDisabled = true;
      // console.log(this.isUpdatingMovimento + ' - ' + this.isInsertingMovimento);
      this.indexDetalhe = index;
    } else {
      this.isCadastroButtonDisabled = true;
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Existem linhas na tabela sem atualizar. Cancele no X para continuar...', life: 3000 });
    }

    console.log(this.isCadastroButtonDisabled);
  }

  onRowEditSave(cadastro: ContribuinteDetalheResponse, index: number) {
    this.contribuinteDetalheResponse = cadastro;
    this.atualizarContribuinteDetalhe(this.contribuinteDetalheResponse, index);
    this.onRowEditCancel(cadastro, null);
  }

  onRowEditCancel(cadastro: ContribuinteDetalheResponse, index: number) {
    // console.log(cadastro);
    //this.consultarContribuinteDetalhe(this.contribuinteDetalheRequest);
    this.indexDetalhe = -1;
    //this.desabilitaBotes(false, 'Cadastro');
  }

  onRowAnaliticEditCancel(analitico: MovimentoAnaliticoResponse, index: number) {
    // console.log(analitico);
    this.consultarContribuinteMovimentos(this.contribuinteConsultaRequest);
    this.clearDropDowns();
    this.desabilitaBotes(false, 'Movimento');
    this.indexMovimento = -1;

    this.resetMovimentoTable();
  }

  clearDropDowns() {
    this.retencoesResponse = null;
    this.extensoesResponse = null;
    this.verbaResponse = null;
    this.matriculaResponse = null;
  }

  onRowAnaliticEditInit(analitico: MovimentoAnaliticoResponse, index: number) {
    console.log(this.indexMovimento + ' | ' + index);

    if (analitico != null) {
      if (analitico.id != null) {
        console.log(analitico.id);
        this.isUpdatingMovimento = true;
        this.isInsertingMovimento = false;
      } else {
        this.isUpdatingMovimento = false;
        this.isInsertingMovimento = true;
      }
    }

    console.log(this.isUpdatingMovimento + '|' + this.isInsertingMovimento);
    if (this.indexMovimento == -1 || this.indexMovimento == index) {
      this.analitico = this.movimentosAnaliticoResponse[index];
      if (this.isUpdatingMovimento == true || this.isInsertingMovimento == true) {
        this.analitico.codigoRetencao = null;
        this.analitico.codigoExtensao = null;
        this.analitico.codigoVerba = null;
      }

      // console.log("Editar Analitico Init: " + index)
      this.isMovimentoButtonDisabled = true;
      //this.isUpdating = !this.isInserting;
      // console.log(this.isUpdatingMovimento + ' - ' + this.isInsertingMovimento);
      this.indexMovimento = index;
    } else {
      this.isMovimentoButtonDisabled = true;
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Existem linhas na tabela sem atualizar. Cancele no X para continuar...', life: 3000 });
    }
  }

  onRowAnaliticEditSave(analitico: MovimentoAnaliticoResponse, index: number) {
    // console.log("Editar Analitico Save")
    // console.log(this.isUpdatingMovimento + ' - ' + this.isInsertingMovimento);
    if (this.validaLinhaMovimentoAnalitico(analitico, index)) {
      if (this.isInsertingMovimento == false) {
        this.movimentosAnaliticoResponse[index].dataAlteracao = new Date().toLocaleDateString(this.locale),
          this.movimentosAnaliticoResponse[index].alteradoPor = 'f2415', // ##### vai precisar pegar o user logado na sessão
          this.atualizarMovimentoAnalitico(this.movimentosAnaliticoResponse[index]);
      } else {
        this.criarMovimentoAnalitico(this.movimentosAnaliticoResponse[index]);
      }
      this.analitico = this.movimentosAnaliticoResponse[index];
      this.desabilitaBotes(false, 'Movimento');
      this.consultarContribuinteMovimentos(this.contribuinteConsultaRequest);
    } else {
      if (this.isInsertingMovimento == true) {
        this.isInsertingMovimento = false;
      }
      if (this.isUpdatingMovimento == true) {
        this.isUpdatingMovimento = false;
      }
    }
    this.indexMovimento = index;
  }

  desabilitaBotes(value: boolean, tipo: String) {
    if (tipo == 'Movimento') {
      this.isMovimentoButtonDisabled = value;
      this.isInsertingMovimento = value;
    } else if (tipo == 'Cadastro') {
      this.isCadastroButtonDisabled = value;
      this.isInsertingCadastro = value;
    }
  }

  validaLinhaMovimentoAnalitico(dados: MovimentoAnaliticoResponse, index: number): boolean {
    // console.log(this.movimentosAnaliticoResponse[index].data);
    // console.log(this.movimentosAnaliticoResponse[index].codigoRetencao);
    // console.log(this.movimentosAnaliticoResponse[index].codigoExtensao);
    // console.log(this.movimentosAnaliticoResponse[index].codigoVerba);   
    console.log(this.indexMovimento + '|' + index)
    if (this.indexMovimento != -1 && this.indexMovimento != index) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Existem linhas na tabela sem atualizar. Cancele no X para continuar...', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.data == null || dados.data == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Data inválida!', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.matricula == null || dados.matricula == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe a Matrícula!', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.codigoRetencao == null || dados.codigoRetencao == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o Codigo Retenção!', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      dados.codigoRetencao = null;
      dados.codigoExtensao = null;
      dados.codigoVerba = null;
      dados.descricaoRetencao = '';
      dados.descricaoVerba = '';
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.codigoExtensao == null || dados.codigoExtensao == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o Codigo Extensão!', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      dados.codigoExtensao = null;
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.codigoVerba == null || dados.codigoVerba == '') {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o Codigo da Verba!', life: 3000 });
      this.desabilitaBotes(false, 'Movimento');
      dados.codigoVerba = null;
      dados.descricaoVerba = null;
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    } else if (dados.valor == null) {
      this.desabilitaBotes(false, 'Movimento');
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o valor!', life: 3000 });
      this.isInsertingMovimento = !this.isUpdatingMovimento;
      return false;
    }

    return true;

  }

  dataOnChange(event, index: number) {

    // console.log('######## data changed')
    // console.log(event);
    this.analitico = this.movimentosAnaliticoResponse[index];
  }

  matriculaOnChange(event, index: number) {
    this.movimentosAnaliticoResponse[index].matricula = event.value.matricula;
  }

  retencaoOnChange(event, index: number) {
    this.extensoesResponse = null;
    this.retencaoResponse = new RetencaoResponse();
    this.retencaoResponse.codigoRetencao = event.value.codigoRetencao;
    this.preencherExtensoes(event.value.codigoRetencao);
    this.verbaResponse = null;
    this.movimentosAnaliticoResponse[index].descricaoVerba = '';
    this.movimentosAnaliticoResponse[index].descricaoRetencao = '';
    this.movimentosAnaliticoResponse[index].codigoRetencao = event.value.codigoRetencao;
    this.analitico = this.movimentosAnaliticoResponse[index];

  }

  extensaoOnChange(event, index: number) {
    this.extensaoResponse = new ExtensaoResponse();
    this.extensaoResponse.codigoExtensao = event.value.codigoExtensao;
    // console.log(this.retencaoResponse.codigoRetencao + ' ' + this.extensaoResponse.codigoExtensao);
    this.movimentosAnaliticoResponse[index].codigoRetencao = this.retencaoResponse.codigoRetencao;
    this.movimentosAnaliticoResponse[index].codigoExtensao = this.extensaoResponse.codigoExtensao;
    this.verbaResponse = null;
    this.movimentosAnaliticoResponse[index].descricaoVerba = '';
    this.movimentosAnaliticoResponse[index].descricaoRetencao = '';
    this.movimentosAnaliticoResponse[index].codigoExtensao = event.value.codigoExtensao;
    this.preencherVerbas(this.retencaoResponse.codigoRetencao, this.extensaoResponse.codigoExtensao, index);
    this.analitico = this.movimentosAnaliticoResponse[index];
  }

  verbaOnChange(event, index: number) {
    // console.log(event.value.codigoVerba);
    let verbaResponseAux;
    let verbasResponseAux = this.verbasResponse.filter(verba => verba.codigoVerba == event.value.codigoVerba);
    verbasResponseAux.forEach(verbaResponse => verbaResponseAux = verbaResponse);
    this.movimentosAnaliticoResponse[index].descricaoVerba = verbaResponseAux.descricaoVerba;
    this.movimentosAnaliticoResponse[index].codigoVerba = event.value.codigoVerba;
    this.analitico = this.movimentosAnaliticoResponse[index];
  }

  inserindo(tipo: String) {
    if (tipo == 'Movimento') {
      this.isInsertingMovimento = true;
      this.isMovimentoButtonDisabled = true;
    } else {
      this.isInsertingCadastro = true;
      this.isCadastroButtonDisabled = true;
    }
  }

  newRow() {

    if (this.movimentosAnaliticoResponse != null && this.movimentosAnaliticoResponse.length > 0) {

      this.analitico = this.movimentosAnaliticoResponse[this.movimentosAnaliticoResponse.length - 1];

      return {
        nome: this.analitico.nome,
        documento: this.analitico.documento,
        matricula: this.analitico.matricula,
        data: new Date().toLocaleDateString(this.locale),
        codigoRetencao: '',
        codigoExtensao: '',
        descricaoRetencao: '',
        codigoVerba: '',
        descricaoVerba: '',
        valor: '',
        dataCriacao: new Date().toLocaleDateString(this.locale),
        criadoPor: 'f2415', // ##### vai precisar pegar o user logado na sessão
        dataAlteracao: '',
        alteradoPor: ''
      };

    }
  }

  atualizarMovimentoAnalitico(movimento: MovimentoAnaliticoResponse) {

    let dados = new MovimentoAnaliticoRequest();
    dados.id = movimento.id;
    dados.cpf = this.contribuinteSelecionado.cpf;
    dados.cnpj = this.contribuinteSelecionado.cnpj;
    dados.nomeContribuinte = this.contribuinteSelecionado.nome;
    dados.codigoRetencao = movimento.codigoRetencao;
    dados.codigoExtensao = movimento.codigoExtensao;
    dados.codigoVerba = movimento.codigoVerba;
    dados.valor = movimento.valor;
    dados.usuario = movimento.alteradoPor;
    dados.data = this.datePipe.transform(movimento.data, 'dd/MM/yyyy');

    this.contribuintesService.updateContribuinteMovimentoAnalitico(dados)
      .subscribe(movimentoAnaliticoResponse => {
        this.movimentoAnaliticoResponse = movimentoAnaliticoResponse
        // console.log(movimentoAnaliticoResponse);
        this.messageService.add({ severity: 'success', summary: this.tituloMensagem, detail: "Movimento atualizado com sucesso!" });
        this.resetMovimentoTable();
      }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.resetMovimentoTable(); });


  }

  resetMovimentoTable() {
    this.clearDropDowns();

    if (this.isUpdatingMovimento == true) {
      this.isUpdatingMovimento = false;
    }

    if (this.isInsertingMovimento == true) {
      this.isInsertingMovimento = false;
    }

    this.preencherDetalhes();
    this.indexMovimento = -1;
  }

  criarMovimentoAnalitico(movimento: MovimentoAnaliticoResponse) {

    let dados = new MovimentoAnaliticoRequest();
    dados.cpf = this.contribuinteSelecionado.cpf;
    dados.cnpj = this.contribuinteSelecionado.cnpj;
    dados.nomeContribuinte = this.contribuinteSelecionado.nome;
    dados.data = this.datePipe.transform(movimento.data, 'dd/MM/yyyy');
    dados.matricula = movimento.matricula;
    dados.codigoRetencao = movimento.codigoRetencao;
    dados.codigoExtensao = movimento.codigoExtensao;
    dados.codigoVerba = movimento.codigoVerba;
    dados.valor = movimento.valor;
    dados.usuario = movimento.criadoPor;

    this.contribuintesService.insertContribuinteMovimentoAnalitico(dados)
      .subscribe(movimentoAnaliticoResponse => {
        this.movimentoAnaliticoResponse = movimentoAnaliticoResponse
        // console.log(movimentoAnaliticoResponse);
        this.messageService.add({ severity: 'success', summary: this.tituloMensagem, detail: "Movimento criado com sucesso!" });
        this.resetMovimentoTable();
      }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.resetMovimentoTable(); });

  }

  gerarInformeRendimento() {
    if ((this.contribuinteSelecionado == null || this.contribuinteSelecionado == '' || this.contribuinteSelecionado == undefined) || (this.contribuinteSelecionado.cpf == null || this.contribuinteSelecionado.cpf == '' || this.contribuinteSelecionado.cpf == undefined)) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Selecione o contribuinte para continuar!', life: 3000 });

    } else {
      let request = new InformeConsultaRequest()
      request.ano = new Date().getFullYear();
      request.cpf = this.contribuinteSelecionado.cpf;
      request.cnpj = this.contribuinteSelecionado.cnpj;
      console.log(request);
      this.donwloadPDF(request);
    }

  }

  donwloadPDF(request: InformeConsultaRequest) {
    this.isLoading = true;
    request.empresaId = 1;
    this.informesService.getInforme(request).subscribe((data) => {

      this.messageService.add({ severity: 'success', summary: this.tituloMensagem, detail: 'Solicitação da 2ªVIA do informe enviada com sucesso!', life: 3000 });


      let blob = new Blob([data], { type: 'application/pdf' });

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "ir" + (request.cpf == null ? 'pj' : 'pf') + '_' + (request.cpf == null ? request.cnpj : request.cpf) + "_" + request.ano + ".pdf";
      link.click();
      this.isLoading = false;

    }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.isLoading = false; });

  }


}