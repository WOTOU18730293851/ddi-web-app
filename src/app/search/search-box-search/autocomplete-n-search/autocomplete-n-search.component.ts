import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {AppConfig} from "../../../app.config";
import {SearchService} from "../../../services/search.service";
import {AutocompleteResult} from "../../../model/AutocompleteResult";


@Component({
  selector: 'app-autocomplete-n-search',
  templateUrl: './autocomplete-n-search.component.html',
  styleUrls: ['./autocomplete-n-search.component.css']
})
export class AutocompleteNSearchComponent implements OnInit {
  selected: string;
  @Output() submit = new EventEmitter();
  @ViewChild('txtInput') txtInput: ElementRef;

  constructor(private http:Http, private appConfig: AppConfig, private searchService: SearchService) {
  }

  ngOnInit() {
  }

  observableSource(keyword: any) {
    return this.http.get(this.appConfig.getAutocompleteUrl(keyword))
      .map(this.extractData);
  }

  private extractData(res: Response) : string[] {
    let body = res.json();
    //return body || { };
    var searchResult : AutocompleteResult;
    searchResult = (body || { }) as AutocompleteResult;
    return searchResult.items.map(x => x.name);
  }

  valuechange(event){
    if(this.searchService.fullQuery != event){
      this.searchService.fullQuery = event;
    }
  }

  downArrowPressed: Boolean = false;
  keydown(event) {
    switch (event.keyCode) {
      case 40:
        this.downArrowPressed = true;
      case 13: {
        if(!this.downArrowPressed) {
          this.submit.emit();
          event.stopPropagation();
          var self = this;
          var searchText = self.searchService.fullQuery;
          setTimeout(function () {
            self.txtInput.nativeElement.value = searchText;
            self.searchService.fullQuery = searchText;
          }, 100);
        }
      }
    }
  }

}