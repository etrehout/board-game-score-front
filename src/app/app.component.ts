import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private httpClient: HttpClient,
              private router: Router ){ }
  
  ngOnInit(): void { }

  title = 'board-game-score-front';

  logout() {
    this.httpClient.post('http://localhost:8080/login', {}).subscribe(
      data => { 
        this.router.navigateByUrl("/"); 
      });
  }
}
