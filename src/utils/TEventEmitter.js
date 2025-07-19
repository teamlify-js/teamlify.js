import { Events } from "./Events.js";

class TEventEmitter {
    constructor() {
        this._events = {};
    }

    /**
     * Belirtilen bir olaya bir dinleyici (listener) fonksiyonu ekler.
     * @param {Events} eventName - Dinlenecek olayın adı.
     * @param {Function} listener - Olay tetiklendiğinde çalışacak fonksiyon.
     */
    on(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener bir fonksiyon olmalıdır.');
        }

        // Eğer bu olay daha önce hiç kaydedilmediyse, onun için boş bir dizi oluştur.
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }

        // Dinleyici fonksiyonu o olayın listesine ekle.
        this._events[eventName].push(listener);
    }

    /**
     * Bir olayı tetikler. Bu olay için kaydedilmiş tüm dinleyicileri
     * sağlanan Events sırayla çalıştırır.
     * @param {Events} eventName - Tetiklenecek olayın adı.
     * @param {...any} args - Dinleyici fonksiyonlara gönderilecek argümanlar.
     */
    emit(eventName, ...args) {
        // Eğer bu isimde bir olay kaydedilmemişse, devam etme.
        if (!this._events[eventName]) {
            return;
        }

        // Dizinin bir kopyası üzerinden döngü kurmak daha güvenlidir.
        // Çünkü bir dinleyici, döngü sırasında aynı olaydan başka bir dinleyiciyi kaldırabilir.
        const listeners = [...this._events[eventName]];
        listeners.forEach(listener => {
            try {
                listener(...args);
            } catch (e) {
                console.error(`'${eventName}' olayının bir dinleyicisinde hata oluştu:`, e);
            }
        });
    }

    /**
     * Belirtilen bir olaydan bir dinleyici fonksiyonunu kaldırır.
     * Fonksiyonun kaldırılabilmesi için `on` ile eklenen fonksiyonla aynı referansa sahip olması gerekir.
     * @param {Events} eventName - Olayın adı.
     * @param {Function} listenerToRemove - Kaldırılacak dinleyici fonksiyonu.
     */
    off(eventName, listenerToRemove) {
        if (!this._events[eventName]) {
            return;
        }

        // `filter` metodu ile kaldırılmak istenen fonksiyon dışındaki
        // tüm fonksiyonları içeren yeni bir dizi oluştur.
        this._events[eventName] = this._events[eventName].filter(
            listener => listener !== listenerToRemove
        );
    }

    /**
     * Bir olayı yalnızca bir kez dinler. Dinleyici, olay ilk kez tetiklendikten
     * sonra otomatik olarak kaldırılır.
     * @param {Events} eventName - Dinlenecek olayın adı.
     * @param {Function} listener - Bir defalığına çalışacak olan fonksiyon.
     */
    once(eventName, listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener bir fonksiyon olmalıdır.');
        }

        const onceWrapper = (...args) => {
            // Asıl listener'ı çağır.
            listener(...args);
            // Bu sarmalayıcı (wrapper) fonksiyonu dinleyiciler arasından kaldır.
            this.off(eventName, onceWrapper);
        };

        // `on` metoduna normal bir listener gibi sarmalayıcıyı ekle.
        this.on(eventName, onceWrapper);
    }

    /**
     * Belirli bir olaydaki tüm dinleyicileri veya tüm olaylardaki tüm dinleyicileri kaldırır.
     * @param {Events} [eventName] - Dinleyicileri temizlenecek olayın adı. Belirtilmezse tüm olaylar temizlenir.
     */
    removeAllListeners(eventName) {
        if (eventName) {
            // Sadece belirtilen olayın dinleyicilerini sil.
            if (this._events[eventName]) {
                delete this._events[eventName];
            }
        } else {
            // Tüm olayları ve dinleyicileri sil.
            this._events = {};
        }
    }
}

export { TEventEmitter };