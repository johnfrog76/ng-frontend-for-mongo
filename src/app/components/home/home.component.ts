import { Component, OnInit } from "@angular/core";
import { Product } from "../../interfaces/product";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  products: Product[];
  isLoading = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }
}
