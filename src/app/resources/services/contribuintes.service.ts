import { Injectable } from "@angular/core";
import { ContribuinteDetalheResponse } from "../models/ContribuinteDetalheResponse";
import { ContribuinteConsultaResponse } from "../models/ContribuinteConsultaResponse";
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
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};


@Injectable({ providedIn: "root" })
export class ContribuintesService {


  //private baseURL: string = "http://nf2416:3001/legal-service/dirf/v1/";
  private baseURL: string = "http://" + environment.APIKeys.hostDirfApi + ":" + environment.APIKeys.portDirApi + "/legal-service/dirf/v1/";
  private serviceURL: string = this.baseURL + "contribuintes/";
  private detalhesURL: string = this.serviceURL + "detalhes/";
  private movimentosURL: string = this.serviceURL + "movimentos/";
  private movimentosNovoURL: string = this.movimentosURL + "novo/";
  private enquadramentoURL: string = this.baseURL + "enquadramento/";
  private retencoesURL = this.enquadramentoURL + "retencoes/";
  private extencoesURL = this.enquadramentoURL + "extensoes?nrRetencao=";
  private verbasURL = this.enquadramentoURL + "verbas?nrRetencao=";
  private verbasContURL = "&nrExtensao=";
  private matriculasURL = this.serviceURL + "matriculas?id=";

  constructor(private http: HttpClient) { }

  /** GET contribuintes from the server */
  getContribuintes(dados: ContribuinteConsultaRequest): Observable<ContribuinteConsultaResponse[]> {
    return this.http.post<ContribuinteConsultaResponse[]>(this.serviceURL, dados, httpOptions)
      .pipe(
        tap(_ => this.log("fetched contribuintes")),
        catchError(this.handleError<ContribuinteConsultaResponse[]>("getContribuintes", []))
      );
  }

  /** GET detalhes do contribuinte from the server */
  getContribuinteDetalhe(dados: ContribuinteDetalheRequest): Observable<ContribuinteDetalheResponse[]> {
    return this.http.post<ContribuinteDetalheResponse[]>(this.detalhesURL, dados, httpOptions)
      .pipe(
        tap(_ => this.log("fetched contribuintes detalhes")),
        catchError(this.handleError<ContribuinteDetalheResponse[]>("getContribuinteDetalhes", []))
      );
  }

  /** Update detalhes do contribuinte on the server */
  updateContribuinteDetalhe(dados: ContribuinteConsultaResponse): Observable<ContribuinteDetalheResponse> {
    return this.http.put<ContribuinteDetalheResponse>(this.serviceURL + dados.id, dados, httpOptions)
      .pipe(
        tap(_ => this.log("updated contribuintes detalhes")),
        catchError(this.handleError<ContribuinteDetalheResponse>("updateContribuinteDetalhes"))
      );
  }

  /** GET movimentos do contribuinte from the server */
  getContribuinteMovimentosAnalitico(dados: ContribuinteMovimentosRequest): Observable<MovimentoAnaliticoResponse[]> {
    // console.log("dados:" + dados.cpf + " - " + dados.tipoConsulta);
    return this.http.post<MovimentoAnaliticoResponse[]>(this.movimentosURL, dados, httpOptions)
      .pipe(
        tap(_ => this.log("fetched contribuintes movimentos analitico")),
        catchError(this.handleError<MovimentoAnaliticoResponse[]>("getContribuinteMovimentosAnalitico", []))
      );
  }

  /** Update movimento analitico do contribuinte on the server */
  updateContribuinteMovimentoAnalitico(dados: MovimentoAnaliticoRequest): Observable<MovimentoAnaliticoResponse> {
    // console.log(dados);
    return this.http.put<MovimentoAnaliticoResponse>(this.movimentosURL + dados.id, dados, httpOptions)
      .pipe(
        tap(_ => this.log("updated contribuintes movimento analitico")),
        catchError(this.handleError<MovimentoAnaliticoResponse>("updateContribuinteMovimentoAnalitico"))
      );
  }

  /** Insert movimento analitico do contribuinte on the server */
  insertContribuinteMovimentoAnalitico(dados: MovimentoAnaliticoRequest): Observable<MovimentoAnaliticoResponse> {
    return this.http.post<MovimentoAnaliticoResponse>(this.movimentosNovoURL, dados, httpOptions)
      .pipe(
        tap(_ => this.log("inserted contribuintes movimento analitico")),
        catchError(this.handleError<MovimentoAnaliticoResponse>("insertContribuinteMovimentoAnalitico"))
      );
  }

  /** GET movimentos do contribuinte from the server */
  getContribuinteMovimentosSintetico(dados: ContribuinteMovimentosRequest): Observable<MovimentoSinteticoResponse[]> {
    // console.log("dados:" + dados.cpf + " - " + dados.tipoConsulta);
    return this.http.post<MovimentoSinteticoResponse[]>(this.movimentosURL, dados, httpOptions)
      .pipe(
        tap(_ => this.log("fetched contribuintes movimentos sintetico")),
        catchError(this.handleError<MovimentoAnaliticoResponse[]>("getContribuinteMovimentosSintetico", []))
      );
  }

  /** GET retencoes from the server */
  getRetencoes(): Observable<RetencaoResponse[]> {
    return this.http.get<RetencaoResponse[]>(this.retencoesURL)
      .pipe(
        tap(_ => this.log("fetched retencoes")),
        catchError(this.handleError<RetencaoResponse[]>("getRetencoes", []))
      );
  }

  /** GET extencoes from the server */
  getExtencoes(codigoRetencao: string): Observable<ExtensaoResponse[]> {
    return this.http.get<ExtensaoResponse[]>(this.extencoesURL + codigoRetencao)
      .pipe(
        tap(_ => this.log("fetched retencoes")),
        catchError(this.handleError<ExtensaoResponse[]>("getExtensoes", []))
      );
  }

  /** GET verbas from the server */
  getVerbas(codigoRetencao: string, codigoExtensao: string): Observable<VerbaResponse[]> {
    return this.http.get<VerbaResponse[]>(this.verbasURL + codigoRetencao + this.verbasContURL + codigoExtensao)
      .pipe(
        tap(_ => this.log("fetched verbas")),
        catchError(this.handleError<VerbaResponse[]>("getVerbas", []))
      );
  }

  /** GET matriculas from the server */
  getMatriculas(idContribuinte: number): Observable<MatriculaResponse[]> {
    // console.log(this.matriculasURL + idContribuinte);
    return this.http.get<MatriculaResponse[]>(this.matriculasURL + idContribuinte)
      .pipe(
        tap(_ => this.log("fetched matriculas")),
        catchError(this.handleError<MatriculaResponse[]>("getMatriculas", []))
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
    //// console.log(message);
  }

}
