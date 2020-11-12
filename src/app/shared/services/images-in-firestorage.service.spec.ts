import { TestBed } from '@angular/core/testing';

import { ImagesInFirestorageService } from './images-in-firestorage.service';

describe('ImagesInFirestorageService', () => {
  let service: ImagesInFirestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesInFirestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
