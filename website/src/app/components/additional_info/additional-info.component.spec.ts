import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdditionalInfoComponent} from './additional-info.component';
import {AdditionalInfoService} from './additional-info.service';

describe('AdditionalInfoComponent', () => {
    let component: AdditionalInfoComponent;
    let fixture: ComponentFixture<AdditionalInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdditionalInfoComponent],
            providers: [AdditionalInfoService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditionalInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
