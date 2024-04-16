export interface ISearch {
    idUser: number;
    query: string;
    sortBy: string;
    orderBy: string;
    type: number;
    page: number;
    dateFrom: string;
    dateTo: string;
    results: number;
    terms: string;
    date: string;
    popularity: number;
}