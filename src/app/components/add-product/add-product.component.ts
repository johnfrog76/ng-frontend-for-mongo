import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Product } from "../../interfaces/product";

import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  product: Product;
  name: string = "";
  price: number = null;
  onsale: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit() {}

  clearForm(): void {
    this.name = "";
    this.price = null;
    this.onsale = false;
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }

  addProduct(product: Product): void {
    this.productsService.addProduct(product).subscribe((product) => {
      this.product = product;
    });
    this.clearForm();
  }

  onSubmit(): void {
    const tempId = "0";
    this.product = {
      name: this.name,
      price: this.price,
      onsale: this.onsale,
    };
    this.addProduct(this.product);
  }
}
