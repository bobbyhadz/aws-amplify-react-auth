/* eslint-disable class-methods-use-this */
// jest.mock('@aws-amplify/auth');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
// eslint-disable-next-line
window.localStorage.__proto__ = localStorageMock;

window.scrollTo = jest.fn();

(window.IntersectionObserver as jest.Mock) = jest.fn(() => ({
  observe: jest.fn(),
}));

global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }

  readonly root: Element | null;

  readonly rootMargin: string;

  readonly thresholds: ReadonlyArray<number>;

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {
    return null;
  }
};

export {};
