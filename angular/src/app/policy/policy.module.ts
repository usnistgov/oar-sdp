import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PolicyComponent } from "./policy.component";
import { PanelModule } from "primeng/panel";
import { ImageModule } from "primeng/image";
import { ButtonModule } from "primeng/button";
import { BreadcrumbModule } from "primeng/breadcrumb";
@NgModule({
  imports: [CommonModule, PanelModule, ImageModule, ButtonModule, BreadcrumbModule],
  declarations: [PolicyComponent],
  exports: [PolicyComponent],
})
export class PolicyModule {}
