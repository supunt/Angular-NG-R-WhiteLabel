import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public Message = '';
  constructor() { }

  // DO not attempt to fix the 'Expression has changed after it was checked.' issue
  // This is angular and is by design. This error will not appear in prod mode
  // https://github.com/ng-bootstrap/ng-bootstrap/issues/1159
  ngOnInit() {
  }
}
