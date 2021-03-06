import { Component, OnInit } from '@angular/core';
import { ContentfulService, Coach } from '../shared/contentful.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sn-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent implements OnInit {
  coaches: Observable<Coach[]> = this.content.coaches.map(coaches => coaches.filter(coach => coach.firstName.toLowerCase() !== 'clare'));
  constructor(private content: ContentfulService) { }

  ngOnInit() {
  }

}
