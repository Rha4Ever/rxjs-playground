import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, timer, Subscription, takeWhile, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-unsubscribe.ng.html',
  imports: [HistoryWindow],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseUnsubscribe {

  logStream$ = new ReplaySubject<string | number>();

  interval$ = toSignal(timer(0, 1000).pipe(
    tap(console.log)
  ), { initialValue: 0 });

  /**
   * Öffne die Browser-Console: Dort siehst Du den Output eines Observables, das jede Sekunde einen Wert generiert.
   * Navigiere zurück auf die Startseite und beobachte die Console:
   * Die Subscription läuft weiter. Wir haben einen klassischen Memory Leak erzeugt ...
   * 
   * Sorge dafür, dass die Subscription in der Methode ngOnDestroy() beendet wird!
   * Sie wird beim Buttonklick und beim Wegnavigieren ausgelöst.
   * 
   * Es gibt noch weitere Wege, das Problem zu lösen ...
   */
  constructor() {
    // const interval$ = timer(0, 1000).pipe(
    //   tap(console.log)
    // );

    // interval$.pipe(

    //   /******************************/
    //   takeUntilDestroyed()
      
    //   /******************************/

    // ).subscribe({
    //   next: e => this.log(e),
    //   error: err => this.log('❌ ERROR: ' + err),
    //   complete: () => this.log('✅ COMPLETE')
    // });
  }

  log(msg: string | number) {
    console.log(msg);
    this.logStream$.next(msg);
  }
}
