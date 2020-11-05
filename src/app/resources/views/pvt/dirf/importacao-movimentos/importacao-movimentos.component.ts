import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ImportacaoService } from '../../../../services/importacao.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ImportacaoMovimentosRequest } from 'src/app/resources/models/ImportacaoMovimentosRequest';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importacao-movimentos',
  templateUrl: './importacao-movimentos.component.html',
  styleUrls: ['./importacao-movimentos.component.css'],
  providers: [MessageService, ConfirmationService, ProgressSpinner, DialogModule]
})
export class ImportacaoMovimentosComponent implements OnInit {

  public isLoading: boolean = false;

  public uploadedFiles: any[] = [];

  public importacaoMovimentosRequest: ImportacaoMovimentosRequest;

  public nomeArquivo: String;

  public isFilesLoad: boolean;

  constructor(private importacaoService: ImportacaoService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onUploadFile(event: any) {
    console.log(event.files[0].name);
    this.xlsxToJson(event.files[0]);
  }

  onSelectFile(event: any) {
    this.isFilesLoad = true;
  }

  onCancelUpload(event: any) {
    this.isFilesLoad = false;
  }

  xlsxToJson(file: any) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    //const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
    }
    reader.readAsBinaryString(file);
  }



}
