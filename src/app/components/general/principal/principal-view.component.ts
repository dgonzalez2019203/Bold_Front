import { Component, Inject,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestDataService } from 'src/app/services/restData/rest-data.service';
import { MatMenuListItem } from 'src/app/models/MatMenuListItem'
import { User } from 'src/app/models/User';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface Interface{
  username : string;
  firstName : string;
  lastName : string;
  address : string;
  ACTIONS;
}

export interface DialogData {
  detail: any;
}

@Component({
  selector: 'app-principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.css']
})

export class PrincipalViewComponent implements OnInit {
  public filtro;
  public users=[];  
  displayedColumns: string[] = ['USERNAME','FIRSTNAME','LASTNAME','ADDRESS','ACTIONS'];
  dataSource: MatTableDataSource<Interface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public search;

  //menu object creation
  public menuListItems : MatMenuListItem[];

  constructor(private toastr:ToastrService, private router:Router, private restDataService:RestDataService,private _bottomSheet: MatBottomSheet) { 
    this.getData();
    this.setOptionMenu();
  }

  setOptionMenu(){
    this.menuListItems = [
      {menuLinkText: 'Eliminar', 
      menuIcon: 'delete',
      isDisabled: false}
    ];
  }

  clickMenuItem(menuItem : MatMenuListItem, selected){        

    if(menuItem.menuLinkText == "Editar"){
      //this.edit(selected)

    }else if(menuItem.menuLinkText == "Eliminar"){
      this.delete(selected)
    }

  }  

    ngOnInit(): void {
  }

  
  getData(){
    this.restDataService.get().subscribe((res:any)=>{
      if(res.find){

        this.users = res.find;  
        this.dataSource = new MatTableDataSource(res.find)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
        this.toastr.success(res.message, "Información Cargada")      

      }else{
        this.toastr.error(res.message, "Algo malo Ha ocurrido...")
      }
    }, error=>{
      if(error.error){
        this.toastr.error(error.error.message,"Error")
      }else{
        this.toastr.error("No ha cargado correctamente la información, vuelve a intentarlo", "Error General")
            }
    })
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }


  delete(selected): void {
    const bottomSheetRef = this._bottomSheet.open(BottomDeleteUSER, {
      data: {detail: selected}
    });
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getData();
    });
  }


  add(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSaveUSER, {
      data: {detail: null}
    });
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getData();
    });
  }


  addPH(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomDeleteUSER, {
      data: {detail: null}
    });
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getData();
    });
  }
}


@Component({
  selector: 'delete-user',
  templateUrl: 'delete-user.html',
  styleUrls: ['./principal-view.component.css']
})
export class BottomDeleteUSER{

  public user;

  constructor(@Inject((MAT_BOTTOM_SHEET_DATA)) public data: DialogData, private restDataService:RestDataService,private toastr:ToastrService, 
  private _bottomSheetRef: MatBottomSheetRef<BottomDeleteUSER>){
    this.user=this.data.detail;
  }

  close(){
    this._bottomSheetRef.dismiss(this.user);
  }

  delete(){
    this.restDataService.delete(this.user._id).subscribe((res:any)=>{
      if(res.removed){

        this._bottomSheetRef.dismiss(res.removed);
        this.toastr.success(res.message, "Información Cargada")      
        
      }else{
        this.toastr.error(res.message,"Algo malo Ha ocurrido...")
      }
    }, error=>{
      if(error.error){
        this.toastr.error(error.error.message,"Error")
      }else{
        this.toastr.error("No ha cargado correctamente la información, vuelve a intentarlo", "Error General")
      }
    })
  }
}


@Component({
  selector: 'add-user',
  templateUrl: 'add-user.html',
})
export class BottomSaveUSER{
  public user;
  form : any;  

  //account
  public cuentas = [];
  public abbAccount = null;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private toastr:ToastrService, private _bottomSheetRef: MatBottomSheetRef<BottomSaveUSER>, 
  private restDataService:RestDataService) {
    this.user = new User('','','','','',[]);
  }

  close(){
    this._bottomSheetRef.dismiss(this.user);
  }
  
  save(){
    this.restDataService.save(this.user).subscribe((res:any)=>{
      if(res.saved){

        this.toastr.success(res.message,"Registro Agregado")
        this._bottomSheetRef.dismiss(res.saved);

      }else{
        this.toastr.error(res.message, "Algo malo Ha ocurrido...")
      }
    }, error=>{
      if(error.error){
        this.toastr.error(error.error.message,"Error")
      }else{
        this.toastr.error("No ha cargado correctamente la información, vuelve a intentarlo", "Error General")
      }
    })
  }
}