import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  players:any;
  http:any;
  select:boolean;
  insert:boolean;
  update:boolean;
  delete:boolean;
  insertSuccess: boolean;
  deleteSuccess: boolean;
  updateSuccess: boolean;
  pidUpdate = new FormControl('');
  pidDelete = new FormControl('');
  pid = new FormControl('');
  name = new FormControl('');
  team = new FormControl('');
  wins = new FormControl('');
  kills = new FormControl('');
  deaths = new FormControl('');
  constructor(http: Http) {
    this.http = http;
   }

  ngOnInit() {
    this.Initial();
    this.reset();
  }
  Initial(){
    this.http.get("http://localhost:3000/api/select")
            .subscribe(data =>{
             this.players=JSON.parse(data._body).USER;
            },error=>{
                console.log(error);
            } );
  }
  reset(){
    this.select = false;
    this.insert = false;
    this.update = false;
    this.delete = false;
    this.insertSuccess = false;
    this.deleteSuccess = false;
    this.updateSuccess = false;
  }
  Select(){
    console.log("SELECT WORKS");
    this.reset();
    this.select = true;
  }
  Insert(){
    console.log("INSERT WORKS");
    this.reset();
    this.insert = true;
  }
  insertRecord(){
    console.log(this.name.value)
    this.http.post("http://localhost:3000/api/insert",
      {
        PID : this.pid.value,
        name : this.name.value,
        team : this.team.value,
        win : this.wins.value,
        kills : this.kills.value,
        deaths : this.deaths.value
      })
            .subscribe(data =>{
            },error=>{
                console.log(error);
            } );
    this.insertSuccess = true;
  }
  Update(){
    console.log("UPDATE WORKS");
    this.reset();
    this.update = true;
  }
  updateRecord(){
    console.log(this.pidUpdate.value);
    this.http.put("http://localhost:3000/api/update/"+this.pidUpdate.value)
    .subscribe(data =>{
    },error=>{
        console.log(error);
    } );
    this.updateSuccess = true;
  }
  Delete(){
    console.log("DELETE WORKS");
    this.reset();
    this.delete = true;
  }
  deleteRecord(){
    console.log(this.pidDelete.value);
    this.http.delete("http://localhost:3000/api/delete/"+this.pidDelete.value)
    .subscribe(data =>{
    },error=>{
        console.log(error);
    } );
    this.deleteSuccess = true;
  }
}
