import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Item} from '../models/item'

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private Http:HttpClient) { }

  GetItems() {
    return this.Http.get(environment.url+"GetItems");
  }
}
