import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([HttpClient], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
  it('should get a response for search request', async () => {
    inject([HttpClient], (service: ApiService) => {
      expect(service).toBeTruthy();
      service.search('t').then((res: any[]) => {
        expect(res.length).toBeGreaterThan(1);
      });
    });
  });
  it('should send a request to update', async () => {
    inject([HttpClient], (service: ApiService) => {
      expect(service).toBeTruthy();
      service.updateImages().then(() => {
        expect(service).toBeTruthy();
      });
    });
  });
});
