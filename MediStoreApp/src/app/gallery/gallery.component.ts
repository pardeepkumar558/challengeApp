import { Component, OnInit, HostListener } from '@angular/core';
import { MediaService } from '../services/media.service';
import { Item } from '../models/item';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  selectedItem: Item;
  items: Item[];
  allItems: Item[];
  pageCounter: number = 0;
  showModal:boolean=false;
  galleryIndex:number=2;
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(private _mediaService: MediaService) { }

  ngOnInit(): void {
    this.items = [];
    this.allItems = [];
    this.selectedItem=new Item();
    this._mediaService.GetItems().subscribe(
      (items: Item[]) => {
        this.allItems = items;
        this.fetcNextPage();
      }
    )
  }

  public fetcNextPage() {
    this.pageCounter++;
    for (var i = 0; i < 9; i++) {
      this.items.push(this.allItems.pop());
    }

  }



  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.fetcNextPage();
    }
  }
  SelectItem(Id) {
    this.showModal=true;
    
    let selectedItems = this.items.filter(x => x.Id == Id);
    if (selectedItems != undefined) {
      this.selectedItem = selectedItems[0];
    }
    var counter=0;
    for(var i=0;i<this.items.length;i++)
    {
       if(this.items[i].Id==Id)
       {
         this.galleryIndex=counter;
       }
       counter++;
    }

  }
  onSwipeLeft(event)
  {
    (document.getElementsByClassName("p-galleria-item-prev")[0] as HTMLButtonElement).click();
  }
  onSwipeRight(event)
  {
    (document.getElementsByClassName("p-galleria-item-next")[0] as HTMLButtonElement).click();
  }

}
