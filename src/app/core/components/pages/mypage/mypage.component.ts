import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-mypage',
  standalone: true,
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  imports: [ButtonModule],
})
export class MypageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
