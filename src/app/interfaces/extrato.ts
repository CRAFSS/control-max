export interface Extrato {
    id?:string,
    lugar?: string,
    valor?: number,
    modificado?:number;
    tipo?: string;
    credito?: boolean;
    debito?: boolean;
}
