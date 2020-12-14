import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../interfaces/product";
import { Message } from "../interfaces/message";
import { ProductDetail } from "../interfaces/productDetail";
import { DeleteMessage } from "../interfaces/deleteMessage";
import { MessageService } from "../services/message.service";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private url = "http://localhost:5000/api/products";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap((_) => this.log({ type: "console", message: "fetched products" })),
      catchError(this.handleError<Product[]>("Get Products", []))
    );
  }

  deleteProduct(product: Product): Observable<DeleteMessage> {
    const url = `${this.url}/${product._id}`;
    return this.http.delete<DeleteMessage>(url, this.httpOptions).pipe(
      tap((_) => this.log({ type: "success", message: `deleted product` })),
      catchError(this.handleError<DeleteMessage>("Delete Product"))
    );
  }

  getProductDetails(id: string): Observable<ProductDetail> {
    const url = `${this.url}/${id}`;
    return this.http.get<ProductDetail>(url).pipe(
      tap((_) =>
        this.log({ type: "console", message: `fetched product id=${id}` })
      ),
      catchError(this.handleError<ProductDetail>(`Get Product id=${id}`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product, this.httpOptions).pipe(
      tap((newProduct: Product) =>
        this.log({
          type: "success",
          message: `added product w/ id=${newProduct._id}`,
        })
      ),
      catchError(this.handleError<Product>("Add Product"))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .patch(`${this.url}/${product._id}`, product, this.httpOptions)
      .pipe(
        tap((_) =>
          this.log({
            type: "success",
            message: `updated product id=${product._id}`,
          })
        ),
        catchError(this.handleError<any>("Update Product"))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.log({
        type: "error",
        message: `${operation} failed: ${error.message}`,
      });

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: Message) {
    this.messageService.add(message);
  }
}
