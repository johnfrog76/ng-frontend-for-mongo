import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Product } from "../../interfaces/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  product: Product;
  name = "";
  price: number = null;
  onsale = false;
  isLoading = false;
  messageSuccess = "";

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProduct();
    this.isLoading = true;
  }

  private setValues(): void {
    let product = this.product;
    this.name = product.name;
    this.price = product.price;
    this.onsale = product.onsale;
    this.isLoading = false;
  }

  // on page load
  getProduct(): void {
    const prodId = this.route.snapshot.paramMap.get("name");
    this.productsService.getProductDetails(prodId).subscribe((product) => {
      this.product = product.product;
      this.setValues();
    });
  }

  onSubmit(evt: any): void {
    this.isLoading = true;
    this.product.name = this.name;
    this.product.price = this.price;
    this.product.onsale = this.onsale;
    this.productsService.updateProduct(this.product).subscribe((product) => {
      console.log("success");
      this.isLoading = false;
      this.messageSuccess = "Product updated!";
      setTimeout(() => {
        this.location.back();
      }, 1500);
    });
  }
}
