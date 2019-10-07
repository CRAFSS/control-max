export interface Extrato {
    id?:number,
    lugar?: string,
    valor?: number,
    modificado?:number;
    tipo?: string;
    credito?: boolean;
    debito?: boolean
}
