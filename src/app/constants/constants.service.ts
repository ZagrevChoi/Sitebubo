import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public colors = {
    red: '#fd4e43',
    yellow: '#fba602',
    green: '#0dce68'
  };
  public dangerStatus = {
    outline: '#fd4e43',
    inline: '#fd4e43'
  };
  public warningStatus = {
    outline: '#fba602',
    inline: '#fba602'
  };
  public safeStatus = {
    outline: '#0dce68',
    inline: '#0dce68'
  };
  public plans = {
    P2M: {
      label: 'Premium',
      price: '0'
    },
    P2A: {
      label: 'Premium',
      price: '39'
    },
    P3M: {
      label: 'Professional',
      price: '19'
    },
    P3A: {
      label: 'Professional',
      price: '99'
    },
    P4M: {
      label: 'Enterprise',
      price: '29'
    },
    P4A: {
      label: 'Enterprise',
      price: '199'
    }
  };

  constructor() { }
}
