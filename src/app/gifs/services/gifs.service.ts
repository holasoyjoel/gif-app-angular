import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchGifsResponse } from "../interfaces/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService{
    private apiKey: string = 's1s7CN6QmDMOlK8pWssoPjIKXGZU4ZNg';
    private _historial: string[] = [];
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

        // peticion http GET, POST, PUT, DELETE (el http trabaja en base a observable)
        this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=s1s7CN6QmDMOlK8pWssoPjIKXGZU4ZNg&q=${query}&limit=10`)
        .subscribe((resp) => {
            this.resultados = resp.data;
            localStorage.setItem('resultados' , JSON.stringify(this.resultados));
        })
    }
}
