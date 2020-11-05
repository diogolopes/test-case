import { Injectable } from "@angular/core";
import { ContribuinteDetalheResponse } from "../models/ContribuinteDetalheResponse";
import { InformeConsultaResponse } from "../models/InformeConsultaResponse";
import { RetencaoResponse } from "../models/RetencaoResponse";
import { ExtensaoResponse } from "../models/ExtensaoResponse";
import { VerbaResponse } from "../models/VerbaResponse";
import { MatriculaResponse } from "../models/MatriculaResponse";
import { MovimentoAnaliticoResponse } from "../models/MovimentoAnaliticoResponse";
import { MovimentoAnaliticoRequest } from "../models/MovimentoAnaliticoRequest";
import { MovimentoSinteticoResponse } from "../models/MovimentoSinteticoResponse";

import { ContribuinteConsultaRequest } from "../models/ContribuinteConsultaRequest";
import { ContribuinteDetalheRequest } from "../models/ContribuinteDetalheRequest";
import { ContribuinteMovimentosRequest } from "../models/ContribuinteMovimentosRequest";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { throwError } from 'rxjs';
import { InformeConsultaRequest } from '../models/InformeConsultaRequest';
import { AnoConsultaResponse } from '../models/AnoConsultaResponse';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

const httpOptionspdf = {
  responseType: 'blob' as 'json',
  headers: new HttpHeaders().append("Content-Type", "application/json")
};



@Injectable({ providedIn: "root" })
export class InformesService {

  //private baseURL: string = "http://nf2416:3001/legal-service/dirf/v1/";
  private baseURL: string = "http://" + environment.APIKeys.hostDirfApi + ":" + environment.APIKeys.portDirApi + "/legal-service/dirf/v1/";
  private serviceURL: string = this.baseURL + "informes/";
  private anosURL: string = this.serviceURL + "anos/";
  private pdfURL: string = this.serviceURL + "gerar/pdf/"

  constructor(private http: HttpClient) { }

  /** GET informe from the server */
  getInforme(dados: InformeConsultaRequest): Observable<any> {
    return this.http.post<InformeConsultaResponse>(this.pdfURL, dados, httpOptionspdf)
      .pipe(
        tap(_ => this.log("fetched informe")),
        catchError(this.handleError<any>("getInforme"))
      );
  }

  

  /** GET informe from the server */
  getAnos(cpf: string): Observable<AnoConsultaResponse[]> {
    console.log(this.anosURL + cpf);
    return this.http.get<AnoConsultaResponse[]>(this.anosURL + cpf, httpOptions)
      .pipe(
        tap(_ => this.log("fetched anos")),
        catchError(this.handleError<AnoConsultaResponse[]>("getAnos", []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      let errorMessage = 'Erro Desconhecido!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Cód. Erro: ${error.status}\nMensagem: ${error.error.error}`;
      }
      // window.alert(errorMessage);
      if (error.status != 200 && error.status != 201) {
        return throwError(errorMessage);
      }

    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    //console.log(message);
  }
}