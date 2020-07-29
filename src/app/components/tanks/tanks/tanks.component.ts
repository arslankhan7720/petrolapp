import { MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tanks',
  templateUrl: './tanks.component.html',
  styleUrls: ['./tanks.component.css']
})
export class TanksComponent implements OnInit {
  List: any;
  displayedColumns2: string[] = ['id', 'title', 'quantity'];

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public datepipe: DatePipe) { }

  ngOnInit() {

    this.apiService.getTanks().subscribe((resp) => {
      console.log(' getTanks ', resp );
      this.List = resp.data;
    });

  }

}
