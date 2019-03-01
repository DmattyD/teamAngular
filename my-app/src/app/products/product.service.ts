import { Injectable } from '@angular/core'
import { Product } from './product'
import { HttpClient } from '@angular/common/http'



@Injectable()
export class ProductService {
  private productsUrl = 'localhost:300/products/'

  constructor (private http: HttpClient) {}

  getProducts(): Promise<void | Product[]>{
    return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response as Product[])
            .catch(this.handleError);
  }

  createProduct(newProduct: Product): Promise<void | Product> {
    return this.http.post(this.productsUrl, newProduct)
            .toPromise()
            .then(response => response as Product)
            .catch(this.handleError)
  }

  deleteProduct(delProductId: String): Promise<void | String> {
    return this.http.delete(this.productsUrl + '/' + delProductId)
            .toPromise()
            .then(response => response as String)
            .catch(this.handleError)
  }

  updateProduct(putProduct: Product): Promise<void | Product> {
    let putUrl = this.productsUrl + '/' + putProduct._id;
    return this.http.put(putUrl, putProduct)
            .toPromise()
            .then(response => response as Product)
            .catch(this.handleError)
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }

}