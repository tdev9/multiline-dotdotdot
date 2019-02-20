import { TestBed } from '@angular/core/testing';

import { MultilineDotdotdotService } from './multiline-dotdotdot.service';

describe('MultilineDotdotdotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultilineDotdotdotService = TestBed.get(MultilineDotdotdotService);
    expect(service).toBeTruthy();
  });
});
