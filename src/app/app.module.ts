import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CdTimerModule } from 'angular-cd-timer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InterceptorService } from './services/interceptor/interceptor.service';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

// MODULES
import { PrincipalViewComponent,BottomDeleteUSER,BottomSaveUSER } from './components/general/principal/principal-view.component';
import { FooterComponent } from './components/general/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalViewComponent,BottomDeleteUSER,BottomSaveUSER,
    FooterComponent
  ],
  imports: [
    
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    CdTimerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ToastrModule.forRoot(),
    MatCardModule,
    NgxChartsModule,
    MatBottomSheetModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatTabsModule,    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
