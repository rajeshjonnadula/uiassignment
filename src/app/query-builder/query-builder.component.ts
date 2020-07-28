import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {

  queryForm: FormGroup;
  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.queryForm = this.fb.group({
   
      ruleSet: this.fb.array([
        this.initRuleGroup()
      ])
    })
  }


  initRuleGroup() {
    return this.fb.group({
      condition: [''],
      rules: this.fb.array([
        this.initRule()
      ])
    })
  }

  initRule() {
    return this.fb.group({
      field: [''],
      operator: ['']
    })
  }

  

  addGroup() {
    const control = <FormArray>this.queryForm.controls['ruleSet'];
    control.push(this.initRuleGroup());
  }

  addCond(ix) {
    // const control = this.queryForm.controls['rules'] as FormArray;
    const control = (<FormArray>this.queryForm.controls['ruleSet']).at(ix).get('rules') as FormArray;
    control.push(this.initRule());
  }

  delGroup(ix) {
    const control = <FormArray>this.queryForm.controls['ruleSet'];
    control.removeAt(ix);
  }

  delRow(ix,iy) {
    const control = (<FormArray>this.queryForm.controls['ruleSet']).at(ix).get('rules') as FormArray;
    control.removeAt(iy);

  }

}
