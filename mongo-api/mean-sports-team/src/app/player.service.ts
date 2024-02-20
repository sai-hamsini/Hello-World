import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private apiUrl = 'http://localhost:3000/api/players';

    constructor(private http: HttpClient) {}

    addPlayer(player: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, player);
    }

    updatePlayer(id: string, player: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, player);
    }

    deletePlayer(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    getAllPlayers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    performQuery(query: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}/query`, query);
    }
}
