import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { webSocket } from 'rxjs/webSocket';
import { Pauta } from 'src/app/model/pauta';
import * as SockJS from 'sockjs-client';
import { Votacao } from 'src/app/model/votacao';
import { Resultado } from 'src/app/model/resultado';


@Component({
  templateUrl: './dashboard-pautas.component.html',
  styleUrls: ['./dashboard-pautas.component.scss']
})
export class DashboardPautasComponent implements OnInit, OnDestroy {

  pautas: Pauta[] 
  dtOptions: DataTables.Settings = {};

  URL_API: string = 'http://18.229.39.117/pauta-websocket'

  public stompClient: CompatClient;
  public msg = [];
  
  constructor() {
    this.pautas = [];
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const context = this;
    let ws = new SockJS(this.URL_API);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/topic/pauta', (message) => {
        if (message.body) {
          context.processarResultado(message.body);
        }
      });
    }, function(frame) {
      context.initializeWebSocketConnection();
    });
  }

  processarResultado(body) {
    let pauta = new Pauta()
    let json = JSON.parse(body)
    pauta.codigo = json.codigo;
    let votacao = new Votacao();
    votacao.dataInicio = json.votacao.dataInicio
    votacao.duracaoMinutos = json.votacao.duracaoMinutos
    let resultado = new Resultado();
    resultado.totalNao = json.votacao.resultado.totalNao
    resultado.totalVotos = json.votacao.resultado.totalVotos
    resultado.totalSim = json.votacao.resultado.totalSim
    votacao.resultado = resultado
    pauta.votacao = votacao
    this.pautas.unshift(pauta);
  }
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

}
