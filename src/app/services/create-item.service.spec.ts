import { TestBed } from '@angular/core/testing';

import { CreateItemService } from './create-item.service';

describe('CreateItemServiceService', () => {
  let service: CreateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
