import { Component, OnInit } from '@angular/core'
import { Product } from '../product'
import { ProductService } from '../product.service'
import { ProductDetailsComponent } from './product-details.component'


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})


export class ProductListComponent implements OnInit {
  products: Product[]
  selectedProduct: Product

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService
    .getProducts()
    .then((products : Product[]) => {
      this.products = products.map((product) => {
        return product
      })
     })

   }

   private getIndexOfProduct = (productId: String) => {
     return this.products.findIndex((product) => {
       return product._id === productId
     })
   }

   selectProduct(product: Product){
     this.selectedProduct = product
   }

   createNewProduct() {
     var product: Product = {
       name: '',
       price: ''
     }

     this.selectProduct(product)
    }

    deleteProduct = (productId: String) => {
      var idx = this.getIndexOfProduct(productId)
      if (idx !== -1) {
        this.products.splice(idx, 1)
        this.selectProduct(null)
      }
      return this.products
    }

    addProduct = (product: Product) => {
      this.products.push(product)
      this.selectProduct(product)
      return this.products
    }

    updateProduct = (product: Product) => {
      var idx = this.getIndexOfProduct(product._id)
      if (idx !== -1) {
        this.products[idx] = product
        this.selectProduct(product)
      }
      return this.products
    }

  }