import { ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {BreakpointObserver,Breakpoints,BreakpointState,MediaMatcher} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'BOLD GUATEMALA';
  mobileQuery: MediaQueryList;

  @ViewChild('snav') sidenav: MatSidenav;
  color: ThemePalette = 'primary';
  value = 50;
  bufferValue = 75;
  private _mobileQueryListener: () => void;
  navbarOpened= false;
  public mobile = true;
  public isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map((result: BreakpointState) => result.matches));
  
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  isExpanded2 = true;
  showSubmenu2: boolean = false;
  isShowing2 = false;
  showSubSubMenu2: boolean = false;

  constructor(public loader: LoaderService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router,  private breakpointObserver:BreakpointObserver,
    private toastr:ToastrService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
      
  }

  ngDoCheck(): void {

  }
}
