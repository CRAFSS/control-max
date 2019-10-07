import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//Model
export interface registro{
  id:number,
  lugar: string,
  valor: number,
  modificado:number;
  tipo: string;
  credito: boolean;
  debito: boolean
}

const REGISTRO_KEY = 'meus-registros';
const historico_KEY = 'historico';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  addRegistro(registro:registro): Promise<any>{
    return this.storage.get(REGISTRO_KEY).then((registros:registro[]) => {
      if(registros){
        registros.push(registro);
        return this.storage.set(REGISTRO_KEY, registros);
      }else{
        return this.storage.set(REGISTRO_KEY, [registro]);
      }
    });
  }

  listaRegistros(): Promise<registro[]>{
    return this.storage.get(REGISTRO_KEY);
  }

  deletarRegistro(id:number): Promise<registro>{
    return this.storage.get(REGISTRO_KEY).then((registros:registro[]) => {
      if(!registros || registros.length === 0){
        return null;
      }

      let toKeep: registro[] = [];

      for(let r of registros){
        if(r.id !== id){
          toKeep.push(r);
        }
      }
      return this.storage.set(REGISTRO_KEY, toKeep);
    })
  }

  ///historico service

  addhistoric(registro:registro): Promise<any>{
    return this.storage.get(historico_KEY).then((registros:registro[]) => {
      if(registros){
        registros.push(registro);
        return this.storage.set(historico_KEY, registros);
      }else{
        return this.storage.set(historico_KEY, [registro]);
      }
    });
  }

  listaHistorico(): Promise<registro[]>{
    return this.storage.get(historico_KEY);
  }

  deletarHistorico(id:number): Promise<registro>{
    return this.storage.get(historico_KEY).then((historico:registro[]) => {
      if(!historico || historico.length === 0){
        return null;
      }
      
      let toKeep: registro[] = [];
      
      for(let r of historico){
        if(r.id !== id){
          toKeep.push(r);
        }
      }
      console.log("foi")
      return this.storage.set(historico_KEY, toKeep);
    })
  }
}
