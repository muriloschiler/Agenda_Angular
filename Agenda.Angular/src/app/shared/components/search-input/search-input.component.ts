import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchForm } from './classes/search-form';
import { SearchInputConfig } from './classes/search-input-config';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() config!: SearchInputConfig;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      field: [null, [Validators.required]],
      value: [null]
    });
  }

  ngOnInit(): void {
  }

  search(): void {
    this.config.searchAction(this.form.value);
    this.cdRef.detectChanges();
  }

  clear(): void {
    this.form.get("value")?.setValue("");
    this.config.searchAction(new SearchForm());
    this.cdRef.detectChanges();
  }

}
