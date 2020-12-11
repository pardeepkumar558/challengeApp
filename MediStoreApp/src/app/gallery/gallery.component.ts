import { Component, OnInit, HostListener } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  items: Item[];
  allItems: Item[];
  pageCounter:number=0;

  constructor(private _mediaService: MediaService) { }

  ngOnInit(): void {
    this.items = [];
    this.allItems = [];
    this._mediaService.GetItems().subscribe(
      (items: Item[]) => {
        this.allItems = items;
        this.fetcNextPage();


      }
    )
  }

  public fetcNextPage() {
    this.pageCounter++;
    for (var i = 0; i <9; i++) {
      this.items.push(this.allItems.pop());
    }

  }

  

  @HostListener("window:scroll", [])
onScroll(): void {
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  this.fetcNextPage();
    }
}

}
