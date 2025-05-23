import { Component, signal } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  templateUrl: './exercise-gamescore.ng.html',
  imports: [HistoryWindow]
})
export class ExerciseGamescore {

  logStream$ = new ReplaySubject<unknown>();
  readonly score$ = new Subject<number>();

  readonly currentScore = signal(0);
  readonly finalScore = signal<number | undefined>(undefined);

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    // this.score$.pipe(
    //   scan((acc, item) => acc + item, 0)
    // ).subscribe(score => this.currentScore.set(score));

    this.score$.pipe(
      scan((acc, item) => acc + item, 0),
    ).subscribe({
      next: score => this.currentScore.set(score),
      complete: () => this.finalScore.set(this.currentScore())
    });
    
    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
