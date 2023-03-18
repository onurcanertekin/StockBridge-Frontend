import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BottomNavbarComponent } from "./bottom-navbar/bottom-navbar.component";
import { LayoutsComponent } from "./layouts.component";
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";

@NgModule({
  declarations: [
    TopNavbarComponent,
    BottomNavbarComponent,
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutsComponent
  ]
})
export class LayoutsModule { }
