import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  players: any[] = [];

  constructor(private playerService: PlayerService) {
    this.playerService.getAllPlayers().subscribe((players) => {
      this.players = players;
    });
    }

  addPlayer() {
    const newPlayer = { name: 'New Player', position: 'Unknown' };
    this.playerService.addPlayer(newPlayer).subscribe(() => {
      this.players.push(newPlayer);
    });
  }

  updatePlayer(id: string) {
    const updatedPlayer = { ...this.players[0], name: 'Updated Player' };
    this.playerService.updatePlayer(this.players[0]._id, updatedPlayer).subscribe(() => {
      this.players[0] = updatedPlayer;
    });
  }

  deletePlayer(id: string) {
    this.playerService.deletePlayer(this.players[0]._id).subscribe(() => {
      this.players.splice(0, 1);
    });
  }

  performQuery(query: any) {
    this.playerService.performQuery(query).subscribe((result) => {
      console.log('Query result:', result);
    });
  }
title="MEAN Stack Players";
}
