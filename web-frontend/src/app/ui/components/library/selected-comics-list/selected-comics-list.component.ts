/*
 * ComiXed - A digital comic book library management application.
 * Copyright (C) 2019, The ComiXed Project
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.package
 * org.comixed;
 */

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Comic } from "../../../../models/comics/comic";
import { Library } from "../../../../models/actions/library";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.state";
import { Observable, Subscription } from "rxjs";
import * as LibraryActions from "../../../../actions/library.actions";

@Component({
  selector: "app-selected-comics-list",
  templateUrl: "./selected-comics-list.component.html",
  styleUrls: ["./selected-comics-list.component.css"]
})
export class SelectedComicsListComponent implements OnInit, OnDestroy {
  @Input() display: boolean = false;
  @Input() rows: number;
  @Input() cover_size: number;
  @Input() same_height: boolean;

  @Output() onHide = new EventEmitter<boolean>();

  private library$: Observable<Library>;
  private library_subscription: Subscription;
  protected library: Library;

  constructor(private store: Store<AppState>) {
    this.library$ = this.store.select("library");
  }

  ngOnInit() {
    this.library_subscription = this.library$.subscribe((library: Library) => {
      this.library = library;
    });
  }

  ngOnDestroy() {
    this.library_subscription.unsubscribe();
  }

  set_selected(comic: Comic): void {
    this.store.dispatch(
      new LibraryActions.LibrarySetSelected({
        comic: comic,
        selected: false
      })
    );
  }
}