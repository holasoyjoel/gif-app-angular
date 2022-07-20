import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchGifsResponse } from "../interfaces/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService{
    private apiKey: string = 's1s7CN6QmDMOlK8pWssoPjIKXGZU4ZNg';
    private _historial: string[] = [];
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    public resultados: Gif[] = [];


    get historial(): string[]{
        return [... this._historial];
    }

    constructor(private http: HttpClient){
      if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!);
      }

      if(localStorage.getItem('resultados')){
        this.resultados = JSON.parse(localStorage.getItem('resultados')!);
      }
    }

    buscarGifs(query: string = ''){
        query = query.trim().toLocaleLowerCase();

        if(!this._historial.includes(query)){
            this._historial.unshift(query);
            this._historial = this._historial.splice(0,10);
            localStorage.setItem('historial' , JSON.stringify(this._historial));
        }

        // me permite construir todos los parametros de una manera sencilla
        const params = new HttpParams()
          .set('api_key' , this.apiKey)
          .set('limit' , '10')
          .set('q' , query);


        // peticion http GET, POST, PUT, DELETE (el http trabaja en base a observable)
        this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search` , {params: params})
        .subscribe((resp) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados' , JSON.stringify(this.resultados));
        })
    }
}
