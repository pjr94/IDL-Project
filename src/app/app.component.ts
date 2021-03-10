import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import json from '../data/input.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  // Parse data from JSON file
  puzzleBoards = json.puzzleBoards;


  control = [];
  constructor() {
    this.control = this.buildControlArray();

  }

  // Takes in puzzleboards, return control
  // Is this. better or better to pass puzzleBoards as parameter
  // Why does item have to be in an array?
  buildControlArray(): Array<any>[][] {
    let control = [];
    //  console.log(this.control1);

    // For all puzzleBoards
    for (let i = 0; i < this.puzzleBoards.length; i++) {
      let tempArray = [];

      // If there are Items
      if (Object.keys(this.puzzleBoards[i].Items[0]).length !== 0) {
        // Fill with items
        for (let j = 0; j < this.puzzleBoards[i].Items[0]['amount']; j++) {
          tempArray.push([j]);
        }

      // Else populate with empty arrays
      } else {
        for (let j = 0; j < this.puzzleBoards[i].slots[0]['amount']; j++) {
          tempArray.push([]);
        }
      }

      control.push(tempArray);
    }
    console.log(control);
    return control;
  }

  // Solution to ng only iterating on arrays from https://lishman.io/using-ngfor-to-repeat-n-times-in-angular
  arrayOne(n: number): any[] {
    return Array(n);
  }

  //This handles the sorting and drop work by using the moveItemArray() and transferArrayItem() methods available in the drag-drop package
  drop(event: CdkDragDrop<string[]>) {
    if (event.container.data.length === 0){
       if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // If length is not 0 then it means that slot is occupied
    } else  {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    }
   
    console.log(this.control);
  }
}