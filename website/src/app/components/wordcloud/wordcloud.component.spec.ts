import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {WordcloudComponent} from './wordcloud.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AgWordCloudData, AgWordCloudModule} from 'angular4-word-cloud';
import {SearchService} from '../search-result/search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';
import {GenresResponse} from '../../interfaces/genres-response.interface';


class MockSearchService {
    public getFavoriteGenres(): Observable<GenresResponse[]> {
        return Observable.of([{
            _id: '1',
            count: 3
        }]);
    }
}

describe('WordcloudComponent', () => {
    let component: WordcloudComponent;
    let fixture: ComponentFixture<WordcloudComponent>;
    let mock: MockSearchService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                WordcloudComponent,
            ],
            providers: [
                SearchService,
                HttpClient,
                HttpHandler
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                AgWordCloudModule,
                HttpClientTestingModule
            ]
        }).overrideComponent(WordcloudComponent, {
            set: {
                providers: [
                    {provide: SearchService, useClass: MockSearchService}
                ]
            }
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(WordcloudComponent);
            component = fixture.componentInstance;
            mock = fixture.debugElement.injector.get(SearchService);
        });
    }));

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('Should resolve test data on init', fakeAsync(() => {
        const spy = spyOn(mock, 'getFavoriteGenres').and.returnValue(
            Observable.of([{
                _id: '1',
                count: 3
            }])
        );

        // First we check to se if the variables are correct before the component is initialized.
        expect(component.loaded).toBe(false);
        expect(component.wordData).toBeUndefined();
        component.ngOnInit();

        // After initialization the variables should have new values.
        expect(component.wordData.length).toBe(1);
        expect(component.loaded).toBe(true);
    }));

});
