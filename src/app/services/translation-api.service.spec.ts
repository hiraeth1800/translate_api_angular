import { TestBed } from '@angular/core/testing';

import { TranslationAPIService } from './translation-api.service';

describe('TranslationAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslationAPIService = TestBed.get(TranslationAPIService);
    expect(service).toBeTruthy();
  });
});
