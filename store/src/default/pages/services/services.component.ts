import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  contactForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public listSandbox: ListsSandbox) {}

  ngOnInit() {
  }
}
