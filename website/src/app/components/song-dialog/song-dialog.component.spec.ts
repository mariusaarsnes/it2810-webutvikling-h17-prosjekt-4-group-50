import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDialogComponent } from './song-dialog.component';

describe('SongDialogComponent', () => {
  let component: SongDialogComponent;
  let fixture: ComponentFixture<SongDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
