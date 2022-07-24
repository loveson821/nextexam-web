import React from 'react';

import { TranslateService } from './translate';

export const services = {
  t: new TranslateService(), // should be first
};
type ContextServices = typeof services;

const servicesContext = React.createContext<ContextServices>(services);
export const StoresProvider = ({ children }: any) => (
  <servicesContext.Provider value={services}>{children}</servicesContext.Provider>
);

export const useServices = (): ContextServices => React.useContext(servicesContext);

export const initServices = async (en: string) => {
  for (const key in services) {
    if (Object.prototype.hasOwnProperty.call(services, key)) {
      const s = (services as Services)[key];

      if (s.init) {
        await s.init();
      }
    }
  }
};
