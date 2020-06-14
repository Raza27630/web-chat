import { async, TestBed } from '@angular/core/testing';
import { UiElementsModule } from './ui-elements.module';

describe('UiElementsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiElementsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiElementsModule).toBeDefined();
  });
});
