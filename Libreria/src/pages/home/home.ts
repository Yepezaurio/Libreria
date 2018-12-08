import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareService } from "../share/share";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 items=[];
 id:String;
 name:string;
  constructor(public navCtrl: NavController, public share: ShareService) {
    this.getAll();
  }
  getAll(){
    this.items= [];
    this.share.getAll().subscribe(data=>{
      for(var i=0; i<data.lenght; i++){
        this.items.push(data[i]);
      }
    })
  }
  Add(){
    if(this.id==null){
      this.share.Create(this.name).subscribe(data=>{
        this.name="";
        this.getAll();
      })
    }else{
      this.share.Update(this.id, this.name).subscribe(data=>{
        this.id=null;
        this.name="";
        this.getAll();
      })
    }
  }

  Edit(item){
    this.id=item.id;
    this.name=item.name;
  }
  Delete(item){
    this.share.Delete(item.id).subscribe(data=>{
      this.getAll();
    })
    
  }
}
