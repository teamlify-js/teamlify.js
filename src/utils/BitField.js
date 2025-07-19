class BitField {
  /**
   * @param {object} flags - Her bir bayrağı ve karşılık gelen ikili değerini içeren bir obje.
   * Örnek: { READ: 1 << 0, WRITE: 1 << 1, EXECUTE: 1 << 2 }
   */
  constructor(flags) {
    // Bayrakları ve bunların sayısal karşılıklarını depolarız.
    // Her bayrak adını büyük harfe çevirerek tutarız.
    this.flags = {};
    for (const key in flags) {
      this.flags[key.toUpperCase()] = flags[key];
    }

    // Tersine bir harita oluştururuz: sayısal değerden bayrak adına.
    this.invertedFlags = new Map();
    for (const key in this.flags) {
      this.invertedFlags.set(this.flags[key], key);
    }
  }

  /**
   * Verilen bayrak adlarını birleştirerek tek bir sayısal bit alanı değeri (encoded value) oluşturur.
   * @param {string[]} flagNames - Kodlanacak bayrak adlarının bir dizisi.
   * @returns {number} Kodlanmış bit alanı değeri.
   * @throws {Error} Geçersiz bir bayrak adı bulunursa hata fırlatır.
   */
  encode(flagNames) {
    let encodedValue = 0;
    for (const name of flagNames) {
      const flagValue = this.flags[name.toUpperCase()];
      if (typeof flagValue === 'undefined') {
        throw new Error(`Geçersiz bayrak adı: ${name}. Tanımlı bayraklardan biri olmalı.`);
      }
      encodedValue |= flagValue; // Bitwise OR işlemi ile bayrakları birleştiririz.
    }
    return encodedValue;
  }

  /**
   * Verilen sayısal bit alanı değerini çözerek hangi bayrakların etkin olduğunu bulur.
   * @param {number} encodedValue - Çözülecek sayısal bit alanı değeri.
   * @returns {string[]} Etkin olan bayrak adlarının bir dizisi.
   */
  decode(encodedValue) {
    const activeFlags = [];
    for (const flagName in this.flags) {
      const flagValue = this.flags[flagName];
      // Bitwise AND işlemi ile bayrağın etkin olup olmadığını kontrol ederiz.
      if ((encodedValue & flagValue) === flagValue) {
        activeFlags.push(flagName);
      }
    }
    return activeFlags;
  }

  /**
   * Belirli bir bayrağın verilen bit alanında etkin olup olmadığını kontrol eder.
   * @param {number} encodedValue - Kontrol edilecek bit alanı değeri.
   * @param {string} flagName - Kontrol edilecek bayrak adı.
   * @returns {boolean} Bayrak etkinse true, değilse false.
   * @throws {Error} Geçersiz bir bayrak adı bulunursa hata fırlatır.
   */
  has(encodedValue, flagName) {
    const flagValue = this.flags[flagName.toUpperCase()];
    if (typeof flagValue === 'undefined') {
      throw new Error(`Geçersiz bayrak adı: ${flagName}. Tanımlı bayraklardan biri olmalı.`);
    }
    return (encodedValue & flagValue) === flagValue;
  }

  /**
   * Tüm tanımlı bayrakların listesini döner.
   * @returns {string[]} Tüm tanımlı bayrak adlarının dizisi.
   */
  getAllFlags() {
    return Object.keys(this.flags);
  }

  /**
   * Sayısal bir bit değerine karşılık gelen bayrak adını döner.
   * @param {number} value - Bayrak değeri.
   * @returns {string|undefined} Bayrak adı veya bulunamazsa undefined.
   */
  getFlagName(value) {
    return this.invertedFlags.get(value);
  }
}

export { BitField };