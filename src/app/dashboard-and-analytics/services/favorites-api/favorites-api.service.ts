import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesApiService extends BaseService {

  private favoritesUrl = `${this.baseUrl}/favorites`;
  private productsUrl = `${this.baseUrl}/products`;

  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(http: HttpClient) {
    super(http);
  }

  getFavoritesList(): Observable<any> {
    return this.http.get(this.favoritesUrl, {headers: this.headers});
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.productsUrl}/${productId}`, {headers: this.headers});
  }

  addFavorite(productId: number): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let favoriteId = productId.toString();
    return this.http.post<any>(this.favoritesUrl, {
      favoriteId: favoriteId,
      productId: productId
    }, {headers: this.headers});
  }

  removeFavorite(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.favoritesUrl}/${productId}`, {headers: this.headers});
  }
}
