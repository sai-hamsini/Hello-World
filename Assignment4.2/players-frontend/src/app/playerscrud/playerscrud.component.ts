import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playerscrud',
  templateUrl: './playerscrud.component.html',
  styleUrl: './playerscrud.component.scss'
})
export class PlayerscrudComponent {

  PlayerArray : any[] = [];
  currentPlayerID = "";

  name: string ="";
  position: string ="";
  rushingyards: number | undefined;
  touchdowns: number|undefined;
  sacks: number|undefined;
  fieldgoalsmade: number|undefined;
  fieldgoalsmissed: number|undefined;
  catches: number|undefined;

  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {
    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.PlayerArray = resultData.data;
    });
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.position = data.position;
   this.rushingyards = data.rushingyards;
   this.touchdowns = data.touchdowns;
   this.sacks = data.sacks;
   this.fieldgoalsmade = data.fieldgoalsmade;
   this.fieldgoalsmissed = data.fieldgoalsmissed;
   this.catches = data.catches;
   this.currentPlayerID = data._id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "position" : this.position,
      "rushingyards" : this.rushingyards,
      "touchdowns": this.touchdowns,
      "sacks": this.sacks,
      "fieldgoalsmade": this.fieldgoalsmade,
      "fieldgoalsmissed": this.fieldgoalsmissed,
      "catches": this.catches,
    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentPlayerID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Player Updated Successfully!")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Player Deleted Successfully!")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentPlayerID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
register()
  {
    let bodyData = {
      "name" : this.name,
      "position" : this.position,
      "rushingyards" : this.rushingyards,
      "touchdowns": this.touchdowns,
      "sacks": this.sacks,
      "fieldgoalsmade": this.fieldgoalsmade,
      "fieldgoalsmissed": this.fieldgoalsmissed,
      "catches": this.catches, 
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Player Created Successfully")
        this.name = '';
        this.position = '';
        this.rushingyards;
        this.touchdowns;
        this.sacks;
        this.fieldgoalsmade;
        this.fieldgoalsmissed;
        this.catches;
        this.getAllStudent();
    });
  }

}
