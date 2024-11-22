
class CacheItem {
  value: any;
  expiryTime: number;

  constructor(value: any, ttl: number) {
    this.value = value;
    this.expiryTime = Date.now() + ttl;
  }

  isExpired(): boolean {
    return Date.now() > this.expiryTime;
  }
}
/**
 * @param cacheManager.get(变量名称)获取临时变量
 * @param cacheManager.set(变量名称,变量值,临时储存时间(默认1分钟))储存临时变量 
 */
class CacheManager {
  private cache: Map<string, CacheItem>;
  private cleanupInterval: number;

  constructor(cleanupInterval: number = 60000) {
    this.cache = new Map();
    this.cleanupInterval = cleanupInterval;
    this.startCleanupTimer();
  }

  set(key: string, value: any, ttl: number): void {
    this.cache.set(key, new CacheItem(value, ttl));
  }

  get(key: string): any {
    const cacheItem = this.cache.get(key);
    if (cacheItem && !cacheItem.isExpired()) {
      return cacheItem.value;
    } else {
      this.cache.delete(key);
      return null;
    }
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  private startCleanupTimer(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [key, cacheItem] of this.cache.entries()) {
        if (cacheItem.isExpired()) {
          this.cache.delete(key);
        }
      }
    }, this.cleanupInterval);
  }
}

export const cacheManager = new CacheManager();
