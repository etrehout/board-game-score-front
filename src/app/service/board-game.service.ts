import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BoardGame } from '../model/board-game';

@Injectable({
  providedIn: 'root'
})
export class BoardGameService {

  private baseUrl = environment.backApiUrl + '/boardgames';

  constructor(private httpClient: HttpClient) { }

  getAllBoardGames(): Observable<BoardGame[]> {
    return this.httpClient.get<BoardGame[]>(this.baseUrl);
  }
}
