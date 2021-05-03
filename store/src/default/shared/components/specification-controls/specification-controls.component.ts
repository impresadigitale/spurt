import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../../core/service/config.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-specification-controls',
  templateUrl: './specification-controls.component.html',
  styleUrls: ['./specification-controls.component.scss']
})
export class SpecificationControlsComponent implements OnInit {

  @Input() attribute: any;
  public imagePath: string;
  public groupAttribute = [];

  constructor(public configService: ConfigService) { }

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
    if (this.attribute && this.attribute.length > 0) {
      this.doGroup()
    }
  }

  doGroup() {
    let object = _.groupBy(this.attribute, 'attributeGroupName');    
    this.groupAttribute = Object.keys(object).map(function(key){
      return {group: key, value: object[key]};
    });

  }
}
