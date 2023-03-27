import { Component, OnInit } from '@angular/core';
import { BoardGame } from 'src/app/model/board-game';
import { BoardGameService } from 'src/app/service/board-game.service';

@Component({
  selector: 'app-board-game-list',
  templateUrl: './board-game-list.component.html',
  styleUrls: ['./board-game-list.component.css']
})
export class BoardGameListComponent implements OnInit {

  boardGames: BoardGame[] = [];

  constructor(private boardGameService: BoardGameService) { }

  ngOnInit(): void {
    this.getAllBoardGames();
  }

  getAllBoardGames() {
    this.boardGameService.getAllBoardGames().subscribe(data => {
      this.boardGames = data;
    });
  }
}
