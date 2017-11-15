import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WordcloudComponent} from './wordcloud.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonModule} from '@angular/common';
import {AgWordCloudData, AgWordCloudModule} from 'angular4-word-cloud';
import {SearchService} from '../search-result/search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('WordcloudComponent', () => {
    let component: WordcloudComponent;
    let fixture: ComponentFixture<WordcloudComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WordcloudComponent],
            providers: [
                SearchService,
                HttpClient,
                HttpHandler
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                AgWordCloudModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WordcloudComponent);
        component = fixture.componentInstance;
        component.wordData = Array<AgWordCloudData>();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
