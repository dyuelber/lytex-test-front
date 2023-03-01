import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product = {} as Products;
  products!: Products[];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts() {
    this.productService.products().subscribe((products: Products[]) => {
      this.products = products;
    })
  }

  editProduct(product: Products) {
    this.productService.productById(product).subscribe((product: Products) => {
        this.product = product;
    })
  }
  
  createOrUpdate(product: Products) {
    if (product._id) {
      this.productService.update(product).subscribe(() => {
        this.product = {} as Products;
        this.getProducts()
        document.getElementById('closeModal')?.click()
      })
    } else {
      this.productService.create(product).subscribe(() => {
        this.product = {} as Products;
        this.getProducts()
        document.getElementById('closeModal')?.click()
      })
    }
  }

  deleteProduct(product: Products) {
    if (confirm('Deseja excluir o registro ?')) {
      this.productService.delete(product).subscribe(() => {
        this.getProducts()
      })
    }
  }

}
