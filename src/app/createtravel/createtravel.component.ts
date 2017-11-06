import { Component, OnInit  } from '@angular/core';
import { AuthAppService} from '../services/auth.service';
import { Travel } from '../model/travel';
import { Form} from '@angular/forms';


@Component({
  selector: 'app-createtravel',
  templateUrl: './createtravel.component.html',
  styleUrls: ['./createtravel.component.css']
})
export class CreatetravelComponent implements OnInit {

  private travel: Travel ;

  constructor(
    private AuthAppService: AuthAppService
  ) {




  }

  ngOnInit() {
    console.log(this.AuthAppService.currentToken);
    console.log('ok');
  }

  onSubmit(form: Form) {
    console.log(form);
  }

}
