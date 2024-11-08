import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mypage',
  standalone: true,
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
  imports: [ButtonModule, CommonModule],
})
export class MypageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
