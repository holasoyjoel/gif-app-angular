import { NgModule } from "@angular/core";
import { GifsPageComponent } from "./gifsPage/gifsPage.component";
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { ResultadosComponent } from "./resultados/resultados.component";
import { GifsService } from "./services/gifs.service";

@NgModule({
    declarations:[
        GifsPageComponent,
        BusquedaComponent,
        ResultadosComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[
        GifsPageComponent
    ]
})
export class GifsModule{}