import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTableFormComponent } from './material-table-form.component';

describe('MaterialTableFormComponent', () => {
  let component: MaterialTableFormComponent;
  let fixture: ComponentFixture<MaterialTableFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTableFormComponent]
    });
    fixture = TestBed.createComponent(MaterialTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
