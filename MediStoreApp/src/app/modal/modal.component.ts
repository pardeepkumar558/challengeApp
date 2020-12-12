import { Component, OnInit,Input } from '@angular/core';
import {Item} from '../models/item';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }
  @Input() currentItem: Item;
  @Input() fetchedItems: Item[];

  ngOnInit(): void {
  }
  swipe(id)
  {
alert("id");
  }
}
