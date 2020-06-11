import { TestBed } from '@angular/core/testing';

import { ChatIoService } from './chat-io.service';

describe('ChatIoService', () => {
  let service: ChatIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
