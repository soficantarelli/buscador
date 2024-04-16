import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faMicrophone, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IPreferences } from 'src/app/api/models/i-preferences';
import { IRes } from 'src/app/api/models/i-res';
import { IResults } from 'src/app/api/models/i-results';
import { SearchClientResourceService } from 'src/app/api/resources/search-client-resource.service';
import { SearchResourceService } from 'src/app/api/resources/search-resource.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css']
})
export class SearchClientComponent implements OnInit {
  formGroup!: FormGroup;
  preferences!: IPreferences;

  formSend!: FormGroup;

  faSearch = faSearch;
  faMic = faMicrophone;
  faTrash = faTrash;

  search_speech!: string;

  recognition: any;

  isListening: boolean = false;

  isHidden: boolean = true;

  @Input()
  token!: string;

  formGroupSend!: FormGroup;

  listResults!: IResults;
  time!: number;
  amount!: number;
  results!: IRes[];

  bR!: number;
  bW!:number

  reqCustomFinish = false;
  
  constructor(
    private api: SearchClientResourceService, 
    private formBuilder: FormBuilder,
    private apiResults: SearchResourceService
  ) { 
    //this.token = "6c0e466f-3bc2-4c11-81cb-a84098ee74fc"
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      borderRadius: [''],
      borderWith: [''],
      iconUrl: [''],
      search: [''],
      color: [''],
      iconSize: ['30'],
      timeMetadata: [''],
      transcript: [''],
      query: [''],
      sortBy: [''],
      orderBy: [''],
      dateFrom: [''],
      dateTo: [''],
      results: [''],
      date: [''],
      popularity: null,
      type: ['']
    });

    this.api.getByToken({token: this.token}).subscribe(
      (res) => {
         console.log(res);
         this.bR = res.borderRadius;
         this.bW = res.borderWith;
         this.preferences = res;

         this.formGroup.patchValue({
          borderRadius: this.preferences.borderRadius,
          borderWith: this.preferences.borderWith,
          iconUrl: this.preferences.iconUrl,
          search: this.preferences.search,
          color: this.preferences.color,
          iconSize: this.preferences.iconSize,
          timeMetadata: this.preferences.timeMetadata,
          transcript: [''],
          query: [''],
          sortBy: [''],
          orderBy: [''],
          dateFrom: [''],
          dateTo: [''],
          results: [''],
          date: [''],
          popularity: null,
          type: ['']
        });
      }).add(() => {
        this.reqCustomFinish = true;
    });

    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      this.formGroup.get('transcript')!.setValue(transcript);
    };
  }

  toggleRecognition() {
    console.log(this.isListening);
    if (this.isListening) {
      this.stopRecognition();
    } else {
      this.formGroup.get('transcript')!.setValue('');
      this.startRecognition();
    }
  }

  startRecognition() {
    this.recognition.start();
    this.isListening = true;
  }

  stopRecognition() {
    this.recognition.stop();
    this.isListening = false;
  }

  searchFor(): void {
    console.log(this.formGroup.get('transcript')!.value);
    console.log(this.formGroup.get('type')!.value);
    console.log(this.formGroup.get('sortBy')!.value);
    console.log(this.formGroup.get('popularity')!.value);

   
      this.formGroupSend = this.formBuilder.group({
        query: this.formGroup.get('transcript')!.value,
        type: this.formGroup.get('type')!.value,
        sortBy: this.formGroup.get('sortBy')!.value,
        popularity: this.formGroup.get('popularity')!.value
      });

    
    this.apiResults.post(this.formGroupSend.value, null, { token: this.token }).subscribe({
      next: (res) => {
        this.listResults = res;

        this.time = this.listResults.time;
        this.amount = this.listResults.resultsAmount;
        
        this.results = this.listResults.results;
      }
    })

  }

  clickUrl(data: any) {
    console.log("entre", data);
    this.apiResults.popular({id: data.id}).subscribe(data => {
      console.log(data);
    })
  }

  delete() {
    this.formGroup.get('transcript')!.setValue('');
    this.results = [];
  }

  get borderWith() {
    return this.formGroup.get('borderWith')!.value;
  }

  get borderRadius() {
    return this.formGroup.get('borderRadius')!.value;
  }

  get iconUrl() {
    return this.formGroup.get('iconUrl')!.value;
  }

  get iconSize() {
    return this.formGroup.get('iconSize')!.value;
  }

  get color() {
    return this.formGroup.get('color')!.value;
  }

  get search() {
    return this.formGroup.get('search')!.value;
  }

  get timeMetadata() {
    return this.formGroup.get('timeMetadata')!.value;
  }

  hidden() {
    if (this.isHidden) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
  }

}
