import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { InformeConsultaRequest } from '../../../../models/InformeConsultaRequest'
import { InformesService } from '../../../../services/informes.service';
import { AnoConsultaResponse } from 'src/app/resources/models/AnoConsultaResponse';

import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-informe-rendimentos',
  templateUrl: './informe-rendimentos.component.html',
  styleUrls: ['./informe-rendimentos.component.css'],
  providers: [MessageService, ConfirmationService, ProgressSpinner, DialogModule]
})
export class InformeRendimentosComponent implements OnInit {

  public informeConsultaRequest: InformeConsultaRequest;
  public anos: SelectItem[];
  public anosResponse: AnoConsultaResponse[];
  public anoResponse: AnoConsultaResponse;

  private tituloMensagem = 'Atenção';
  private tituloMensagemErro = this.tituloMensagem + "! Ocorreu um erro na operação: ";

  public isLoading: boolean = false;

  constructor(private informesService: InformesService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.informeConsultaRequest = new InformeConsultaRequest();
    this.informeConsultaRequest.cpf = null;
    this.informeConsultaRequest.cnpj = null;
    this.informeConsultaRequest.ano = null;

  }

  enviar() {


    if ((this.informeConsultaRequest.cpf != null && this.informeConsultaRequest.cpf != '') &&
      (this.informeConsultaRequest.cnpj != null && this.informeConsultaRequest.cnpj != '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe um campo [ CPF ou CNPJ ] apenas!', life: 3000 });
      this.informeConsultaRequest.cnpj = null;
      this.informeConsultaRequest.cpf = null;

    } else if ((this.informeConsultaRequest.cpf == null || this.informeConsultaRequest.cpf == '') &&
      (this.informeConsultaRequest.cnpj == null || this.informeConsultaRequest.cnpj == '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe ao mennos um campo [ CPF ou CNPJ ] !', life: 3000 });
      this.informeConsultaRequest.cnpj = null;
      this.informeConsultaRequest.cpf = null;
    } else if (this.informeConsultaRequest.ano == null) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe o ano do informe!', life: 3000 });
    } else {
      this.donwloadPDF(this.informeConsultaRequest);
     
    }
  }


  limparConsulta(silient:boolean) {

    this.informeConsultaRequest.cpf = null;
    this.informeConsultaRequest.cnpj = null;
    this.informeConsultaRequest.ano = null;
    this.anosResponse = null;
    if(silient == false){
    this.messageService.add({ severity: 'info', summary: this.tituloMensagem, detail: 'Filtro de pesquisa limpo!', life: 3000 })
    }
  }

  preencherAnos() {

    if ((this.informeConsultaRequest.cpf == null || this.informeConsultaRequest.cpf == '') &&
      (this.informeConsultaRequest.cnpj == null || this.informeConsultaRequest.cnpj == '')) {
      this.messageService.add({ severity: 'warn', summary: this.tituloMensagem, detail: 'Informe ao mennos um campo [ CPF ou CNPJ ]  para continuar!', life: 3000 });
      this.informeConsultaRequest.cnpj = null;
      this.informeConsultaRequest.cpf = null;
    } else {
      this.anosResponse = null;
      this.isLoading = true;
      this.informesService.getAnos(this.informeConsultaRequest.cpf)
        .subscribe(years => { this.anosResponse = years; this.isLoading = false;}, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err });  this.isLoading = false; });     }
  }

  anoOnChange(event) {
    console.log(event.value.ano);
    this.informeConsultaRequest.ano = event.value.ano;
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
      link.download = "ir" + (request.cpf == null ?  'pj' : 'pf') + '_' + (request.cpf == null ?  request.cnpj : request.cpf) + "_" + request.ano + ".pdf";
      link.click();
      this.isLoading = false;

      this.limparConsulta(true);

    }, err => { this.messageService.add({ severity: 'error', summary: this.tituloMensagemErro, detail: err }); this.isLoading = false; });

  }



}
