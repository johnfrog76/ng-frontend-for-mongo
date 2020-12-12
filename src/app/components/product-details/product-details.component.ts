import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Product } from "../../interfaces/product";
import { DeleteMessage } from "../../interfaces/deleteMessage";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  deleteSuccess: string;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProduct();
    this.isLoading = true;
  }

  getProduct(): void {
    const prodId = this.route.snapshot.paramMap.get("name");
    this.productsService.getProductDetails(prodId).subscribe((product) => {
      this.product = product.product;
      this.isLoading = false;
    });
  }

  onDeleteProduct(): void {
    this.productsService.deleteProduct(this.product).subscribe((message) => {
      this.deleteSuccess = message.message;
      this.product = null;
      setTimeout(() => {
        this.location.back();
      }, 1000);
    });
  }
}
