import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { productData } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  cardData = new EventEmitter<productData[] | []>()
  constructor(private http: HttpClient) {

  }

  addProduct(data: productData) {
    return this.http.post(`http://localhost:3000/products`, data)
  }

  getProduct() {
    return this.http.get<productData[]>(`http://localhost:3000/products`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id: string) {
    return this.http.get<productData>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: productData) {
    return this.http.put<productData>(`http://localhost:3000/products/${product.id}`, product)
  }

  SearchProduct(query: string) {
    return this.http.get<productData[]>(`http://localhost:3000/products?${query}`)
  }

  localAddToCard(data: productData) {
    let cardData = []
    let localCard = localStorage.getItem('localCard')

    if (!localCard) {
      localStorage.setItem('localCard', JSON.stringify([data]))
    } else {
      cardData = JSON.parse(JSON.parse(localCard))
      cardData.push(data)
      localStorage.setItem('localCard', JSON.stringify(cardData))
    }

    this.cardData.emit(cardData)
  }

  
  removeToCart(product_id: number) {
    let cardData = localStorage.getItem('localCard')
    if (cardData) {
      let items: productData[] = JSON.parse(cardData)
      items = items.filter((d: productData) => product_id !== d.id)
      localStorage.setItem('localCard', JSON.stringify(cardData))
      this.cardData.emit(items)
    }
  }

}
